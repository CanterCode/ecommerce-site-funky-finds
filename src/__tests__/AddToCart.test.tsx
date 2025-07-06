import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "../redux/cartSlice";
import type { Product } from "../reactQuery/ProductInterface";

const fakeProduct: Product = {
  id: 123,
  title: "Funky Test Product",
  price: 19.99,
  description: "This is a test product.",
  category: "test",
  image: "https://via.placeholder.com/150",
  rating: { rate: 4.2, count: 10 },
};

describe("ProductCard + cartSlice integration", () => {
  const renderWithStore = () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    render(
      <Provider store={store}>
        <ProductCard product={fakeProduct} />
      </Provider>
    );
    return store;
  };

  test("adds item to cart, renders UI, increments, decrements, and removes correctly", async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    // 1) Add to Cart
    await user.click(screen.getByRole("button", { name: /\+ Add to Cart/i }));

    // 2) Quantity “1” is shown in the big span
    const qtySpan = screen.getByText("1", { selector: "span.fs-2" });
    expect(qtySpan).toBeInTheDocument();

    // 3) The text “in cart” is shown
    expect(screen.getByText(/in cart/i)).toBeInTheDocument();

    // 4) Increment to 2
    await user.click(screen.getByRole("button", { name: "+" }));

    // 5) Quantity “2” in the span
    expect(screen.getByText("2", { selector: "span.fs-2" })).toBeInTheDocument();
    expect(screen.getByText(/in cart/i)).toBeInTheDocument();

    // 6) Decrement back to 1
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText("1", { selector: "span.fs-2" })).toBeInTheDocument();
    expect(screen.getByText(/in cart/i)).toBeInTheDocument();

    // 7) Decrement again to remove
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByRole("button", { name: /\+ Add to Cart/i })).toBeInTheDocument();

    // 8) Add again and test Remove
    await user.click(screen.getByRole("button", { name: /\+ Add to Cart/i }));
    await user.click(screen.getByRole("button", { name: /Remove/i }));
    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByRole("button", { name: /\+ Add to Cart/i })).toBeInTheDocument();
  });
});