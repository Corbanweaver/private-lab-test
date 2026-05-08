import { NextResponse } from "next/server";
import { getJunctionRequisitionPdf, isJunctionConfigured, JunctionProviderError } from "@/lib/providers/junction";

export async function GET(request: Request) {
  if (!isJunctionConfigured()) {
    return NextResponse.json({ error: "Junction is not configured." }, { status: 503 });
  }

  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await getJunctionRequisitionPdf(orderId);
  } catch (error) {
    if (
      error instanceof JunctionProviderError &&
      (error.status === 404 || /sample id|requisition|not ready|not found/i.test(error.body))
    ) {
      return NextResponse.json(
        {
          orderId,
          status: "requisition_pending",
          message: "The lab order was submitted, but the requisition PDF is not ready yet.",
        },
        { status: 202 },
      );
    }

    return NextResponse.json(
      {
        orderId,
        status: "provider_error",
        message: error instanceof Error ? error.message : "Could not retrieve requisition.",
      },
      { status: 502 },
    );
  }

  const pdf = await response.arrayBuffer();
  return new Response(pdf, {
    headers: {
      "content-type": "application/pdf",
      "cache-control": "private, no-store",
    },
  });
}
