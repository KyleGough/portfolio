import { render, screen } from "@testing-library/react";
import React from "react";

import { FooterLink } from "./FooterLink";

describe("FooterLink component", () => {
  it("renders", () => {
    render(<FooterLink href="/">Homepage</FooterLink>);
    expect(screen.getByText("Homepage")).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
