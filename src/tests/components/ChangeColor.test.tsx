import { act, render, screen } from "@testing-library/react";
import { Changecolor } from "../../components/ChangeColor";
import React from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { fireEvent } from "@testing-library/dom";

describe("ChangeCollor", () => {
  it("If dark mode has been enabled on Moon click", () => {
    let lightStatemocked = false;

    render(
      <GlobalContext.Provider
        value={
          {
            changelight: () => {
              lightStatemocked = true;
            },
            lightState: lightStatemocked,
          } as any
        }
      >
        <Changecolor />
      </GlobalContext.Provider>
    );

    fireEvent.click(screen.getByTestId("LightModeButtom"));

    expect(lightStatemocked).toEqual(true);
  });

  it("If dark mode has been disabled on Sun click", () => {
    let lightStatemocked = true;

    render(
      <GlobalContext.Provider
        value={
          {
            changelight: () => {
              lightStatemocked = false;
            },
            lightState: lightStatemocked,
          } as any
        }
      >
        <Changecolor />
      </GlobalContext.Provider>
    );

    fireEvent.click(screen.getByTestId("LightModeButtom"));

    expect(lightStatemocked).toEqual(false);
  });
});
