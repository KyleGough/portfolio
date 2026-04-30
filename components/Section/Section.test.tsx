import { render, screen } from "@testing-library/react";
import React from "react";

import { Section } from "./Section";

describe("Section component", () => {
  it("renders children in a container", () => {
    render(<Section>Test</Section>);
    const section = screen.getByText("Test");
    expect(section).toBeVisible();
    expect(section).toHaveClass("container", "text-primary", "py-8");
  });

  it("omits top padding override class when overrideTopPadding is set", () => {
    render(
      <Section id="test" overrideTopPadding>
        Test
      </Section>,
    );

    const block = screen.getByText("Test");
    expect(block).not.toHaveClass("first:pt-24");
  });
});
