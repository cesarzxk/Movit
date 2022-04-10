import { render } from "@testing-library/react";
import React from "react";
import { fireEvent, screen } from "@testing-library/dom";
import Login, { getServerSideProps } from "../../pages/login";
import { mocked } from "jest-mock";

import { GlobalContext } from "../../contexts/GlobalContext";
import { useRouter } from "next/router";
jest.mock("next/router");

describe("Login", () => {
  it("If login page have been displayed correctly.", () => {
    render(
      <GlobalContext.Provider
        value={
          {
            changelight: jest.fn(),
            setNameProfiler: jest.fn(),
          } as any
        }
      >
        <Login darkMod="false" />
      </GlobalContext.Provider>
    );

    expect(screen.getByTestId("LightModeButtom")).toBeInTheDocument();
    expect(screen.getByTestId("activeLink")).toBeInTheDocument();
  });

  it("If login page have been displayed correctly with darkmode.", () => {
    let lightMode;
    render(
      <GlobalContext.Provider
        value={
          {
            changelight: (mode) => {
              lightMode = mode;
            },
            setNameProfiler: jest.fn(),
          } as any
        }
      >
        <Login darkMod="true" />
      </GlobalContext.Provider>
    );

    expect(lightMode).toEqual(true);
  });

  it("If Input filled and submited", () => {
    let userName = "";
    const useRouterMocked = mocked(useRouter);

    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValue({
      push: pushMocked,
    } as any);

    render(
      <GlobalContext.Provider
        value={
          {
            changelight: jest.fn(),
            setNameProfiler: (name) => (userName = name),
          } as any
        }
      >
        <Login darkMod="true" />
      </GlobalContext.Provider>
    );

    fireEvent.change(screen.getByTestId("inputUsername"), {
      target: { value: "cesarzxk" },
    });

    expect(userName).toEqual("cesarzxk");
    fireEvent.click(screen.getByTestId("mainButtonLogin"));
    expect(pushMocked).toBeCalled();
  });

  it("If getServerSideProps have been called.", async () => {
    const req = {
      cookies: {
        darkMod: "true",
      },
    };

    const ServerSideProps = await getServerSideProps({
      req: req,
    } as any);

    expect(ServerSideProps).toEqual({ props: { darkMod: "true" } });
  });
});
