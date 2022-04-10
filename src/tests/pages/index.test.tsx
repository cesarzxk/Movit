import { render } from "@testing-library/react";
import React from "react";

import App from "../../pages/";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";

jest.mock("next/router");

describe("App", () => {
  it("If router push router have been called correctly.", () => {
    const useRouterMocked = mocked(useRouter);
    let routerPush;

    const pushMocked = jest.fn().mockImplementation((router) => {
      routerPush = router;
    });

    useRouterMocked.mockImplementation(
      jest.fn().mockImplementation(() => {
        return {
          push: pushMocked,
        };
      })
    );

    render(<App />);

    expect(routerPush).toEqual("./login");
  });
});
