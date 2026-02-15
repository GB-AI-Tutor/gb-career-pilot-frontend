import { render, screen, fireEvent } from "@testing-library/react";
import { TestButton } from "./TestButton";

describe("TestButton", () => {
  it("renders with correct label", () => {
    render(<TestButton label="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<TestButton label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
