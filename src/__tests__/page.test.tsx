import { afterAll, beforeAll, expect, it, vi, describe } from "vitest";
import {render, RenderResult} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/page";

describe("app", () => {
  let container : RenderResult
  beforeAll(() => {
    // Mocking out .net code
    vi.stubGlobal("luckyRegexReady", true);
    vi.stubGlobal(
      "testRegex",
      vi.fn((regex, string) => new RegExp(regex).test(string))
    );
    container = render(<App />);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("should render", () => {
    expect(
      container.getByRole("heading", {
        level: 2,
        name: /Lucene regular expression tester/i,
      })
    ).toBeDefined();
    expect(container.getByTestId("regex-input")).toBeDefined();
    expect(container.getByTestId("sample-string-input")).toBeDefined();
  });

  it('should display "match found" when there is a match', async () => {
    const regexInput = container.getByTestId("regex-input");
    const sampleStringInput = container.getByTestId("sample-string-input");
    if (!regexInput || !sampleStringInput) {
      throw new Error("Input elements do not exist");
    }
    await userEvent.type(regexInput, "/.*test.*/");
    await userEvent.type(sampleStringInput, "test");

    expect(container.findByText("Match Found")).toBeDefined();
  });

  it('should display "match not found" when there is not a match', async () => {
    const regexInput = container.getByTestId("regex-input");
    const sampleStringInput = container.getByTestId("sample-string-input");
    if (!regexInput || !sampleStringInput) {
      throw new Error("Input elements do not exist");
    }
    await userEvent.type(regexInput, "/.*test.*/");
    await userEvent.type(sampleStringInput, "asdf");

    expect(container.findByText("Match Not Found")).toBeDefined();
  });
});
