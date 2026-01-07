import { afterAll, beforeAll, expect, it, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/page";

describe("app", () => {
  beforeAll(() => {
    // Mocking out .net code
    vi.stubGlobal("luckyRegexReady", true);
    vi.stubGlobal(
      "testRegex",
      vi.fn((regex, string) => new RegExp(regex).test(string))
    );
    render(<App />);
  });
  afterAll(() => {
    vi.unstubAllGlobals();
  });
  it("should render", () => {
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Lucene regular expression tester/i,
      })
    ).toBeDefined();
    expect(screen.getByTestId("regex-input")).toBeDefined();
    expect(screen.getByTestId("sample-string-input")).toBeDefined();
  });
  it('should display "match found" when there is a match', async () => {
    const user = userEvent.setup();
    const regexInput = screen.getByTestId("regex-input");
    const sampleStringInput = screen.getByTestId("sample-string-input");
    if (!regexInput || !sampleStringInput) {
      throw new Error("Input elements do not exist");
    }
    await user.type(regexInput, "/.*test.*/");
    await user.type(sampleStringInput, "test");
    await expect(screen.findByText("Match Found")).to.exist;
  });
  it('should display "match not found" when there is not a match', async () => {
    const user = userEvent.setup();
    const regexInput = screen.getByTestId("regex-input");
    const sampleStringInput = screen.getByTestId("sample-string-input");
    if (!regexInput || !sampleStringInput) {
      throw new Error("Input elements do not exist");
    }
    await user.type(regexInput, "/.*test.*/");
    await user.type(sampleStringInput, "asdf");
    await expect(screen.findByText("Match Not Found")).to.exist;
  });
});
