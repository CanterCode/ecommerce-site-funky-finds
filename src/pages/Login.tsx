import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      dispatch(setUser({
        uid: user.uid,
        email: user.email ?? userData.email ?? "",
        firstName: userData.firstName ?? "",
        lastName: userData.lastName ?? "",
        address: userData.address ?? ""
      }));
      dispatch(setUser({
        uid: user.uid,
        email: user.email ?? userData.email ?? "",
        firstName: userData.firstName ?? "",
        lastName: userData.lastName ?? "",
        address: userData.address ?? ""
      }));
    }

    navigate("/user-profile");
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "An unknown error occurred.");
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