/**
 * Greet should render the text hello and if a name is passed into the component
 * It should render hello followed by the name
 */
import { render, screen } from "@testing-library/react";
import { Greet } from "./greet";

test("Greet reders correctly", () => {
  render(<Greet />);
  const testElement = screen.getByText(/hello/i);
  expect(testElement).toBeInTheDocument();
});

test("Greet renders with a name", () => {
  render(<Greet name="Vishwas" />);
  const testElement = screen.getByText(/hello vishwas/i);
  expect(testElement).toBeInTheDocument();
});
