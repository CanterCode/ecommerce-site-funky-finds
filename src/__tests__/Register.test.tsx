jest.mock("../firebase/FirebaseConfig", () => ({
  auth: {
    signOut: jest.fn().mockResolvedValue(undefined),
    currentUser: { uid: "test-uid" },
  },
  db: {},
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../pages/Register";
import { BrowserRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { auth } from "../firebase/FirebaseConfig";

describe("Register Component", () => {
  beforeEach(() => {
    (createUserWithEmailAndPassword as jest.Mock).mockClear();
    (setDoc as jest.Mock).mockClear();
  });

  test("renders all input fields and the Register button", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("shows validation error when password is too short", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Josh" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Canterbury" },
    });

    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Funky St" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(
      await screen.findByText(/Password should be at least 6 characters\./i)
    ).toBeInTheDocument();

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test("calls Firebase and redirects on valid submission", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "abc123" },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Josh" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Canterbury" },
    });

    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Funky St" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "securePassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "securePassword"
      );
    });

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalled();
    });
  });
});