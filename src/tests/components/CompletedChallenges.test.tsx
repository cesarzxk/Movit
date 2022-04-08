import { render, screen } from "@testing-library/react";
import CompletedChallenges from "../../components/CompletedChallenges";
import React from "react";

import { ChallengeContext } from "../../contexts/ChallengeContext";

describe("CompletedChallenges", () => {
  it("If don't have a challenge, informations has screen correctly ", () => {
    render(
      <ChallengeContext.Provider
        value={
          {
            challengesCompleted: 101,
          } as any
        }
      >
        <CompletedChallenges />
      </ChallengeContext.Provider>
    );
    expect(screen.getByText(/101/i)).toBeInTheDocument();
    expect(screen.getByText(/Desafios Completos/i)).toBeInTheDocument();
  });
});
