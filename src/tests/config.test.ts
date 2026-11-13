import { afterEach, describe, expect, it, vi } from "vitest";

async function configuration(email: string, endpoint: string) {
  vi.resetModules();
  vi.stubEnv("VITE_CONTACT_EMAIL", email);
  vi.stubEnv("VITE_CONTACT_ENDPOINT", endpoint);
  return import("../lib/config");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("owner-supplied contact configuration", () => {
  it("uses the owner's email address when none is configured", async () => {
    const { contact } = await configuration("", "");
    expect(contact.email).toBe("titraoui.habibe@gmail.com");
    expect(contact.endpoint).toBeNull();
  });

  it("supports an owner email override", async () => {
    const { contact, contactMailto } = await configuration("contact@training.example", "");
    expect(contact.email).toBe("contact@training.example");
    expect(contact.endpoint).toBeNull();
    expect(contactMailto("Website message", "Hello H2D.dev")).toBe(
      "mailto:contact@training.example?subject=Website+message&body=Hello+H2D.dev",
    );
  });

  it("uses a configured endpoint for form submission", async () => {
    const { contact } = await configuration("", "/test-demo");
    expect(contact.email).toBe("titraoui.habibe@gmail.com");
    expect(contact.endpoint).toBe("/test-demo");
  });
});
