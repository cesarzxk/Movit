import { render, screen } from "@testing-library/react";
import { ExperienceBar } from "../../components/ExperienceBar";
import React from "react";

import { ChallengeContext } from "../../contexts/ChallengeContext";

describe("ExperienceBar", () => {
  it("If countdown isn't active, informations has displayed correctly ", () => {
    render(
      <ChallengeContext.Provider
        value={
          {
            currentExperience: 2,
            experienceToNextLevel: 10,
          } as any
        }
      >
        <ExperienceBar />
      </ChallengeContext.Provider>
    );

    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
