import { createSupabaseServiceClient, hasSupabaseServiceConfig } from "@/lib/supabase";
import type { LabOrderQuote, LabPatientIntake, ProviderOrder } from "@/lib/types";

export type CheckoutIntentRecord = {
  id: string;
  status: string;
  panel_id: string;
  test_ids: string[];
  state: string;
  zip: string;
  collection_type: "walk_in" | "mobile" | "kit";
  quote_id: string;
  route_id: string | null;
  location_id: string | null;
  partner_id: string | null;
  amount_cents: number;
  currency: string;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  provider_order_id: string | null;
  provider_name: string | null;
  provider_response: ProviderOrder | null;
  patient_intake: LabPatientIntake;
  error_message: string | null;
};

type CreateCheckoutIntentInput = {
  quote: LabOrderQuote;
  patient: LabPatientIntake;
};

function getServiceClient() {
  if (!hasSupabaseServiceConfig()) return null;
  return createSupabaseServiceClient();
}

export async function createCheckoutIntent({ quote, patient }: CreateCheckoutIntentInput) {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("checkout_intents")
    .insert({
      panel_id: quote.panelId,
      test_ids: quote.testIds,
      state: quote.state,
      zip: quote.zip,
      collection_type: quote.collectionType,
      quote_id: quote.id,
      route_id: quote.routeId ?? null,
      location_id: quote.selectedLocation?.id ?? null,
      partner_id: quote.partnerId ?? null,
      amount_cents: quote.total * 100,
      currency: "usd",
      patient_intake: patient,
    })
    .select("id")
    .single();

  if (error) throw new Error(`Could not create checkout intent: ${error.message}`);
  return data?.id as string | null;
}

export async function attachStripeSessionToCheckoutIntent(input: {
  checkoutIntentId: string;
  stripeSessionId: string;
  paymentIntentId?: string | null;
}) {
  const supabase = getServiceClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("checkout_intents")
    .update({
      status: "stripe_session_created",
      stripe_checkout_session_id: input.stripeSessionId,
      stripe_payment_intent_id: input.paymentIntentId ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.checkoutIntentId);

  if (error) throw new Error(`Could not attach Stripe session: ${error.message}`);
}

export async function findCheckoutIntentByStripeSession(stripeSessionId: string) {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("checkout_intents")
    .select("*")
    .eq("stripe_checkout_session_id", stripeSessionId)
    .maybeSingle();

  if (error) throw new Error(`Could not load checkout intent: ${error.message}`);
  return data as CheckoutIntentRecord | null;
}

export async function markCheckoutIntentPaid(input: { checkoutIntentId: string; paymentIntentId?: string | null }) {
  const supabase = getServiceClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("checkout_intents")
    .update({
      status: "paid",
      stripe_payment_intent_id: input.paymentIntentId ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.checkoutIntentId);

  if (error) throw new Error(`Could not mark checkout intent paid: ${error.message}`);
}

export async function markCheckoutIntentSubmitted(input: { checkoutIntentId: string; order: ProviderOrder }) {
  const supabase = getServiceClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("checkout_intents")
    .update({
      status: input.order.status,
      provider_order_id: input.order.id,
      provider_name: input.order.provider,
      provider_response: input.order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.checkoutIntentId);

  if (error) throw new Error(`Could not store provider order: ${error.message}`);
}

export async function markCheckoutIntentProviderError(input: { checkoutIntentId: string; errorMessage: string }) {
  const supabase = getServiceClient();
  if (!supabase) return;

  await supabase
    .from("checkout_intents")
    .update({
      status: "provider_error",
      error_message: input.errorMessage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.checkoutIntentId);
}
