import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserDirectory } from "@/pages/UserDirectory";

const mockUsers = [
  {
    id: 1,
    name: "Ada Lovelace",
    username: "ada",
    email: "ada@example.com",
    phone: "555-0100",
    website: "ada.dev",
    company: { name: "Analytical Engines" },
  },
];

describe("UserDirectory", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading skeleton, then the fetched user, then hides the skeleton", async () => {
    render(
      <MemoryRouter>
        <UserDirectory />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Loading users")).toBeInTheDocument();

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();

    expect(screen.queryByLabelText("Loading users")).not.toBeInTheDocument();
  });
});
