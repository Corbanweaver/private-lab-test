import { describe, expect, it } from "vitest";
import {
  buildWaitlistNotificationEmail,
  getWaitlistNotifyRecipient,
  validateWaitlistLead,
} from "@/lib/waitlist";

describe("waitlist lead capture", () => {
  it("normalizes safe launch-interest fields", () => {
    const result = validateWaitlistLead({
      email: "  PERSON@EXAMPLE.COM ",
      firstName: "  Jane   ",
      zip: "80202-1234",
      state: "co",
      panelId: "complete-wellness",
      interest: "Complete Wellness",
      source: "homepage",
    });

    expect(result).toEqual({
      ok: true,
      lead: {
        email: "person@example.com",
        firstName: "Jane",
        zip: "80202",
        state: "CO",
        panelId: "complete-wellness",
        interest: "Complete Wellness",
        source: "homepage",
      },
    });
  });

  it("rejects invalid email addresses", () => {
    expect(validateWaitlistLead({ email: "not-an-email" })).toEqual({
      ok: false,
      error: "Enter a valid email address.",
    });
  });

  it("requires a valid notification recipient", () => {
    expect(getWaitlistNotifyRecipient({ WAITLIST_NOTIFY_TO: "founder@privatelabtest.com" })).toBe(
      "founder@privatelabtest.com",
    );
    expect(getWaitlistNotifyRecipient({ WAITLIST_NOTIFY_TO: "nope" })).toBeUndefined();
  });

  it("builds an internal notification without medical intake fields", () => {
    const email = buildWaitlistNotificationEmail(
      {
        email: "person@example.com",
        firstName: "Jane",
        zip: "80202",
        state: "CO",
        panelId: "complete-wellness",
        interest: "Complete Wellness",
        source: "homepage",
      },
      "founder@privatelabtest.com",
    );

    expect(email.to).toBe("founder@privatelabtest.com");
    expect(email.subject).toContain("waitlist signup");
    expect(email.text).toContain("person@example.com");
    expect(email.text).not.toMatch(/dob|symptom|diagnosis|result/i);
  });
});
