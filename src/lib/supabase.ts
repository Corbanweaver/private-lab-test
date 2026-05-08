import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export function hasSupabaseServiceConfig() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Missing public Supabase configuration.");
  }

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
}

export async function createSupabaseServerClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot mutate cookies; route handlers can.
        }
      },
    },
  });
}

export function createSupabaseServiceClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing server-only Supabase service configuration.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
