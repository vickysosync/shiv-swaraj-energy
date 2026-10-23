import { describe, expect, it } from "vitest";
import { login, logout, isAuthed, validateEnquiry, DEMO_CREDENTIALS } from "@/lib/store";

const ok = { name: "Asha", company: "", phone: "9876543210", email: "a@b.com", service: "Gas Supply", industry: "", requirements: "Need gas", method: "Email" };

describe("consultation form rules", () => {
  it("accepts a complete enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("requires name", () => expect(validateEnquiry({ ...ok, name: " " }).name).toBeTruthy());
  it("rejects a 9-digit phone", () => expect(validateEnquiry({ ...ok, phone: "987654321" }).phone).toBeTruthy());
  it("rejects invalid email", () => expect(validateEnquiry({ ...ok, email: "abc@" }).email).toBeTruthy());
  it("requires a service", () => expect(validateEnquiry({ ...ok, service: "" }).service).toBeTruthy());
});

describe("demo admin login", () => {
  it("rejects wrong password", () => { expect(login(DEMO_CREDENTIALS.email, "nope")).toBe(false); expect(isAuthed()).toBe(false); });
  it("accepts demo credentials and logs out", () => {
    expect(login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)).toBe(true);
    expect(isAuthed()).toBe(true);
    logout();
    expect(isAuthed()).toBe(false);
  });
});
