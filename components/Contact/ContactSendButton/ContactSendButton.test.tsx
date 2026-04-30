import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { EmailStatus } from "../Contact.types";
import { ContactSendButton } from "./ContactSendButton";

describe("ContactSendButton component", () => {
  it("renders send label in idle state", () => {
    const onClick = jest.fn();
    render(<ContactSendButton onClick={onClick} status={EmailStatus.IDLE} />);

    expect(screen.getByText("Send Message")).toBeVisible();
  });

  it("invokes onClick when pressed in idle state", () => {
    const onClick = jest.fn();
    render(<ContactSendButton onClick={onClick} status={EmailStatus.IDLE} />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("displays correct text on fail status", () => {
    const onClick = jest.fn();
    render(<ContactSendButton onClick={onClick} status={EmailStatus.FAIL} />);

    expect(screen.getByText("Message Failed")).toBeVisible();
  });

  it("displays correct text on sent status", () => {
    const onClick = jest.fn();
    render(<ContactSendButton onClick={onClick} status={EmailStatus.SENT} />);

    expect(screen.getByText("Message Sent")).toBeVisible();
  });
});
