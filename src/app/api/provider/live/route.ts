import { NextResponse } from "next/server";
import {
  isJunctionConfigured,
  isJunctionSandbox,
  isLiveProviderWriteAllowed,
  getJunctionCatalogPreview,
  getJunctionMappingCandidates,
  junctionTestMapHelp,
} from "@/lib/providers/junction";
import { getProviderAdapter } from "@/lib/provider";
import type { CollectionType, LabPatientIntake } from "@/lib/types";

function getCollectionType(value: unknown): CollectionType {
  return value === "mobile" || value === "kit" ? value : "walk_in";
}

function canUseCatalogDebug() {
  return process.env.VERCEL_ENV !== "production" || process.env.LAB_PROVIDER_CATALOG_DEBUG === "enabled";
}

export async function GET() {
  const provider = getProviderAdapter();

  if (!isJunctionConfigured()) {
    return NextResponse.json({
      provider: provider.id,
      liveConfigured: false,
      sandbox: isJunctionSandbox(),
      orderWritesAllowed: isLiveProviderWriteAllowed(),
      nextSetup:
        "Add JUNCTION_API_KEY, LAB_PROVIDER=junction, JUNCTION_LAB_TEST_MAP, and SUPABASE_SERVICE_ROLE_KEY to test live provider connectivity.",
      labTestMapExample: `{ "complete-wellness": ["<junction lab_test_id>"], ${junctionTestMapHelp} }`,
    });
  }

  try {
    const sync = await provider.syncCatalog();
    return NextResponse.json({
      provider: provider.id,
      liveConfigured: provider.id === "junction-live",
      sandbox: isJunctionSandbox(),
      orderWritesAllowed: isLiveProviderWriteAllowed(),
      catalog: sync,
    });
  } catch (error) {
    return NextResponse.json(
      {
        provider: provider.id,
        liveConfigured: provider.id === "junction-live",
        error: error instanceof Error ? error.message : "Unknown provider health error.",
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: "locations" | "quote" | "catalog" | "mapping" | "sandbox_order";
    zip?: string;
    state?: string;
    panelId?: string;
    testIds?: string[];
    collectionType?: CollectionType;
    patient?: LabPatientIntake;
  };
  const provider = getProviderAdapter();

  if (body.action === "locations") {
    return NextResponse.json(await provider.getLabLocations({ zip: body.zip ?? "80202" }));
  }

  if (body.action === "quote") {
    return NextResponse.json(
      await provider.quoteOrder({
        panelId: body.panelId ?? "complete-wellness",
        testIds: body.testIds,
        state: body.state ?? "CO",
        zip: body.zip ?? "80202",
        collectionType: getCollectionType(body.collectionType),
      }),
    );
  }

  if (body.action === "catalog") {
    if (!isJunctionConfigured()) {
      return NextResponse.json({ error: "Junction is not configured." }, { status: 503 });
    }
    if (!canUseCatalogDebug()) {
      return NextResponse.json({ error: "Catalog debug is disabled in production." }, { status: 403 });
    }

    return NextResponse.json({ tests: await getJunctionCatalogPreview() });
  }

  if (body.action === "mapping") {
    if (!isJunctionConfigured()) {
      return NextResponse.json({ error: "Junction is not configured." }, { status: 503 });
    }
    if (!canUseCatalogDebug()) {
      return NextResponse.json({ error: "Mapping debug is disabled in production." }, { status: 403 });
    }

    return NextResponse.json(await getJunctionMappingCandidates());
  }

  if (body.action === "sandbox_order") {
    if (!isJunctionSandbox()) {
      return NextResponse.json({ error: "Sandbox order action is disabled outside the Junction sandbox." }, { status: 403 });
    }

    if (process.env.VERCEL_ENV === "production" && process.env.LAB_PROVIDER_SANDBOX_TESTS !== "enabled") {
      return NextResponse.json({ error: "Sandbox order action is disabled in production." }, { status: 403 });
    }

    return NextResponse.json(
      await provider.createOrder({
        userId: `sandbox-provider-check-${Date.now()}`,
        panelId: body.panelId ?? "complete-wellness",
        testIds: body.testIds,
        state: body.state ?? "CO",
        zip: body.zip ?? "80202",
        total: 1,
        collectionType: getCollectionType(body.collectionType),
        patient: body.patient,
      }),
    );
  }

  return NextResponse.json({ error: "Unsupported live provider action." }, { status: 400 });
}
