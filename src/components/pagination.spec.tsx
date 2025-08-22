import { render } from "@testing-library/react";

import Pagination from "./Pagination";

import userEvent from "@testing-library/user-event";

const onPageChangeCallback = vi.fn();

describe(`Paginations`, () => {
  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalPages={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

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
});
