jest.mock('../firebase/FirebaseConfig', () => ({
  auth: {
    signOut: jest.fn().mockResolvedValue(undefined),
    currentUser: { uid: 'test-uid' }
  },
  db: {}
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationBar from "../components/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cartReducer from "../redux/cartSlice";


const renderWithStore = (preloadedState: any) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    </Provider>
  );
};

describe("NavigationBar Component", () => {
  test("renders Login button when user is not logged in", () => {
    renderWithStore({
      auth: { isLoggedIn: false },
      cart: { items: [] },
    });

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("renders Profile and Logout buttons when user is logged in", () => {
    renderWithStore({
      auth: { isLoggedIn: true },
      cart: { items: [] },
    });

    expect(screen.getByRole("button", { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });
});