import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user-info");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="display-5 fw-bold text-center mt-5 mb-4 funky-gradient-text">
        Welcome Back!
      </h1>

      <Form onSubmit={handleLogin} className="mx-auto" style={{ width: "100%" }}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button
          type="submit"
          className="w-100 rounded-pill btn-funky"
          style={{ fontWeight: 700, fontSize: "1.2rem", padding: ".8rem 0" }}
        >
          Log In
        </Button>

        <div className="text-center mt-4">
          <p className="mb-1">Don't have an account?</p>
          <Link
            to="/register"
            className="btn btn-outline-secondary rounded-pill px-4 py-2"
            style={{ fontWeight: 600 }}
          >
            Create an account here
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;