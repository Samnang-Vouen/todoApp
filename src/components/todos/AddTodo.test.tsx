import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTodo } from "@/components/todos/AddTodo";

describe("AddTodo", () => {
  it("renders a labeled input", () => {
    render(<AddTodo onAdd={vi.fn()} />);
    expect(screen.getByLabelText("New todo")).toBeInTheDocument();
  });

  it("submits trimmed text via the onAdd callback and clears the input", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);

    await user.type(screen.getByLabelText("New todo"), "  Buy milk  ");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(screen.getByLabelText("New todo")).toHaveValue("");
  });

  it("shows a validation error on empty submit, then clears it once fixed", async () => {
    const user = userEvent.setup();
    render(<AddTodo onAdd={vi.fn()} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a todo");

    await user.type(screen.getByLabelText("New todo"), "Walk the dog");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
