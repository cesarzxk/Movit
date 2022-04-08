import { render, screen } from "@testing-library/react";
import { ActiveLink } from "../../components/Routes";
import { mocked } from "jest-mock";
import { fireEvent } from "@testing-library/dom";

import React from "react";
import { useRouter } from "next/router";

jest.mock("next/router");

describe("Routes", () => {
  it("If Routes ActiveLink has called correctly ", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValue({
      push: pushMocked,
    } as any);

    render(<ActiveLink href="/">ActiveLinkTest</ActiveLink>);

    fireEvent.click(screen.getByText("ActiveLinkTest"));

    expect(pushMocked).toHaveBeenCalled();
  });
});
