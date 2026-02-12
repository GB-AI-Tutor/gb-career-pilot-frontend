import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // use jest instead if using jest
import { TestButton } from "./TestButton";

describe("TestButton", () => {
    it("renders the button with the correct label", () => {
        render(<TestButton label="Click Me" onClick={() => {}} />);
        
        const button = screen.getByText("Click Me");
        expect(button).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = vi.fn();

        render(<TestButton label="Click Me" onClick={handleClick} />);
        
        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
