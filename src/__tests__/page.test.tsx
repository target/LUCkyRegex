import {
  afterAll,
  beforeAll,
  expect,
  afterEach,
  it,
  vi,
  describe,
} from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/page";

describe("app", () => {
  beforeAll(() => {
    // Mocking out .net code
    vi.stubGlobal("luckyRegexReady", true);
    vi.stubGlobal(
      "testRegex",
      vi.fn((regex, string) => new RegExp(regex).test(string)),
    );
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render", async () => {
    const container = render(<App />);

    expect(
      container.getByRole("heading", {
        level: 2,
        name: /Lucene regular expression tester/i,
      }),
    ).toBeDefined();

    expect(
      container.getByRole("textbox", { name: /Your regular expression/ }),
    ).toBeDefined();
    expect(
      container.getByRole("textbox", { name: /Your test string/ }),
    ).toBeDefined();
  });

  it('should display "match found" when there is a match', async () => {
    const container = render(<App />);
    const regularExpressionInput = container.getByRole("textbox", {
      name: /Your regular expression/,
    });
    const testTextTextArea = container.getByRole("textbox", {
      name: /Your test string/,
    });

    const user = userEvent.setup();

    await user.type(regularExpressionInput, "/.*test.*/");
    await user.type(testTextTextArea, "test");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const status = await container.findByRole("status");
    expect(status.textContent).toContain("Match found");
  });

  it('should display "match not found" when there is not a match', async () => {
    const container = render(<App />);
    const regularExpressionInput = container.getByRole("textbox", {
      name: /Your regular expression/,
    });
    const testTextTextArea = container.getByRole("textbox", {
      name: /Your test string/,
    });

    const user = userEvent.setup();

    await user.type(regularExpressionInput, "/.*test.*/");
    await user.type(testTextTextArea, "asdf");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const status = await container.findByRole("status");
    expect(status.textContent).toContain("No match found");
  });
});
