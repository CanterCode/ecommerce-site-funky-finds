import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation for password strength
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        email,
        firstName,
        lastName,
        address,
        createAt: new Date().toISOString()
      });

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Form
      onSubmit={handleRegister}
      className="mt-5 mx-auto"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <h1 className="display-5 fw-bold text-center mt-5 pb-3 mb-4 funky-gradient-text">
        Create your Funky Finds Account!
      </h1>

      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="registerPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        type="submit"
        className="w-100 rounded-pill btn-funky"
        style={{ fontWeight: 700, fontSize: "1.2rem", padding: ".8rem 0" }}
      >
        Register
      </Button>
    </Form>
  );
};

export default Register;
