import { render } from "@testing-library/react";

import Pagination from "./Pagination";

import userEvent from "@testing-library/user-event";

const onPageChangeCallback = vi.fn();

describe(`Paginations`, () => {
  // Reset the function before each test, because is a global function
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalPages={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    // Shows all the calls of the function, to debug if is repeating
    console.log(onPageChangeCallback.mock.calls);

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalPages={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextButton = wrapper.getByRole("button", { name: "Próxima página" });

    const user = userEvent.setup();
    await user.click(nextButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalPages={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousButton = wrapper.getByRole("button", {
      name: "Página anterior",
    });

    const user = userEvent.setup();
    await user.click(previousButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalPages={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousButton = wrapper.getByRole("button", {
      name: "Página anterior",
    });

    const user = userEvent.setup();
    await user.click(previousButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalPages={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextButton = wrapper.getByRole("button", { name: "Última página" });

    const user = userEvent.setup();
    await user.click(nextButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
