import { render, screen } from "@testing-library/react";
import React from "react";

import { Footer } from "./Footer";

describe("Footer component", () => {
  it("shows a copyright colophon with the author name and year", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Kyle Gough");
  });
});
