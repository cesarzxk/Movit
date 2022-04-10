import { render, screen } from "@testing-library/react";
import Profile from "../../components/Profile";
import React from "react";

import { ChallengeContext } from "../../contexts/ChallengeContext";
import { GlobalContext } from "../../contexts/GlobalContext";

describe("Profile", () => {
  it("If Profile informations has displayed correctly ", () => {
    render(
      <GlobalContext.Provider
        value={
          {
            nameProfiler: "TesteName",
          } as any
        }
      >
        <ChallengeContext.Provider
          value={
            {
              level: 2,
            } as any
          }
        >
          <Profile />
        </ChallengeContext.Provider>
      </GlobalContext.Provider>
    );

    expect(screen.getByText(/TesteName/i)).toBeInTheDocument();
    expect(screen.getByText(/Level 2/i)).toBeInTheDocument();
  });
});
