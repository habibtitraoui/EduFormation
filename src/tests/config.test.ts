import { afterEach, describe, expect, it, vi } from "vitest";

async function configuration(email: string, endpoint: string) {
  vi.resetModules();
  vi.stubEnv("VITE_APP_URL", "https://training.example/");
  vi.stubEnv("VITE_CONTACT_EMAIL", email);
  vi.stubEnv("VITE_CONTACT_ENDPOINT", endpoint);
  return import("../lib/config");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("owner-supplied contact configuration", () => {
  it("does not publish the example address as a real contact", async () => {
    const { contact, appRoutes } = await configuration("contact@example.com", "");
    expect(contact.canRequestDemo).toBe(false);
    expect(contact.email).toBeNull();
    expect(appRoutes).toEqual({
      login: "https://training.example/login",
      categories: "https://training.example/categories",
      liveEvents: "https://training.example/live-events",
    });
  });

  it("falls back to mailto when only a real address is supplied", async () => {
    const { contact, demoMailto } = await configuration("contact@training.example", "");
    expect(contact.hasMailto).toBe(true);
    expect(contact.hasForm).toBe(false);
    expect(demoMailto("Demo request", "Hello")).toContain("mailto:contact@training.example?subject=Demo+request");
  });

  it("enables a form only when an endpoint exists, even without an email", async () => {
    const { contact } = await configuration("", "/test-demo");
    expect(contact.hasForm).toBe(true);
    expect(contact.hasMailto).toBe(false);
    expect(contact.email).toBeNull();
  });
});
