import { render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import { fireEvent } from "@testing-library/dom";

import { GlobalContext, GlobalProvider } from "../../contexts/GlobalContext";
import { mocked } from "jest-mock";
import { set } from "js-cookie";

jest.mock("js-cookie");

describe("GlobalContext", () => {
  it("If setNameProfiler function have been called correctly", () => {
    function FakeComponent() {
      const { nameProfiler, setNameProfiler } = useContext(GlobalContext);
      return (
        <div>
          <button onClick={() => setNameProfiler("TestName")}>
            setNameProfilerTeste
          </button>
          <div>{nameProfiler}</div>
        </div>
      );
    }
    render(
      <GlobalProvider>
        <FakeComponent />
      </GlobalProvider>
    );

    fireEvent.click(screen.getByText("setNameProfilerTeste"));
    expect(screen.getByText(/TestName/i)).toBeInTheDocument();
  });

  it("If changelight function have been called with true passed.", () => {
    const CookieSetmoked = mocked(set);

    let setMocked = "";

    CookieSetmoked.mockImplementation(
      (value1: string, value2: string) => (setMocked = value2)
    );

    function FakeComponent() {
      const { changelight, lightState } = useContext(GlobalContext);
      return (
        <div>
          <button onClick={() => changelight(true)}>changelightTeste</button>
        </div>
      );
    }
    render(
      <GlobalProvider>
        <FakeComponent />
      </GlobalProvider>
    );
    fireEvent.click(screen.getByText("changelightTeste"));

    expect(setMocked).toEqual("true");
  });

  it("If changelight function have been called with false passed.", () => {
    const CookieSetmoked = mocked(set);

    let setMocked = "";

    CookieSetmoked.mockImplementation(
      (value1: string, value2: string) => (setMocked = value2)
    );

    function FakeComponent() {
      const { changelight, lightState } = useContext(GlobalContext);
      return (
        <div>
          <button onClick={() => changelight(false)}>changelightTeste</button>
        </div>
      );
    }
    render(
      <GlobalProvider>
        <FakeComponent />
      </GlobalProvider>
    );
    fireEvent.click(screen.getByText("changelightTeste"));

    expect(setMocked).toEqual("false");
  });
});
