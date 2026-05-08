import { describe, expect, it } from "vitest";
import {
  buildResendTestEmail,
  formatResendFrom,
  getResendConfigStatus,
  resolveEmailTestRecipient,
  sendResendEmail,
} from "@/lib/email";

describe("Resend email helper", () => {
  it("formats a plain sender email with the brand name", () => {
    expect(formatResendFrom("orders@privatelabtest.com")).toBe("Private Lab Test <orders@privatelabtest.com>");
    expect(formatResendFrom("Private Lab Test <care@privatelabtest.com>")).toBe(
      "Private Lab Test <care@privatelabtest.com>",
    );
  });

  it("reports config status without exposing the API key", () => {
    const status = getResendConfigStatus({
      RESEND_API_KEY: "re_secret",
      RESEND_FROM_EMAIL: "orders@privatelabtest.com",
    });

    expect(status.configured).toBe(true);
    expect(status.hasApiKey).toBe(true);
    expect(JSON.stringify(status)).not.toContain("re_secret");
  });

  it("uses Resend's sink recipient unless custom recipients are explicitly enabled", () => {
    expect(resolveEmailTestRecipient("person@example.com", {})).toBe("delivered@resend.dev");
    expect(resolveEmailTestRecipient("person@example.com", { EMAIL_TEST_ALLOW_CUSTOM_TO: "enabled" })).toBe("person@example.com");
  });

  it("builds a non-PHI test template", () => {
    const template = buildResendTestEmail("delivered@resend.dev");

    expect(template.subject).toBe("Private Lab Test email check");
    expect(template.text).toContain("No patient");
    expect(template.idempotencyKey).toContain("private-lab-test-resend-check");
  });

  it("sends through the Resend HTTP API", async () => {
    const calls: Array<{ url: string; init: RequestInit }> = [];
    const fetcher = async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init: init ?? {} });
      return new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const result = await sendResendEmail(
      {
        to: "delivered@resend.dev",
        subject: "Test",
        html: "<p>Test</p>",
        idempotencyKey: "test-key",
      },
      {
        RESEND_API_KEY: "re_secret",
        RESEND_FROM_EMAIL: "orders@privatelabtest.com",
      },
      fetcher as typeof fetch,
    );

    expect(result).toEqual({
      delivered: true,
      id: "email_123",
      destination: "resend",
      status: 200,
    });
    expect(calls[0].url).toBe("https://api.resend.com/emails");
    expect((calls[0].init.headers as Record<string, string>)["Idempotency-Key"]).toBe("test-key");
    expect(String(calls[0].init.body)).toContain("Private Lab Test <orders@privatelabtest.com>");
  });
});
