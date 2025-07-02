import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { Form, Button, Alert } from "react-bootstrap";

const UserProfile = () => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          fetchUser();
        } else {
          setError("No user logged in.");
          setLoading(false);
        }
      }, 500);
      return;
    }

    const fetchUser = async () => {
      if (!user) {
        setError("No user logged in.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as typeof userData);
        }
      } catch {
        setError("Failed to fetch user data.");
      }
      setLoading(false);
    };
    fetchUser();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!user) {
      setError("No user logged in.");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, userData);
      setSuccess(true);
    } catch {
      setError("Failed to update user info.");
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <Form onSubmit={handleSubmit} className="mt-5 mx-auto" style={{ maxWidth: "800px", width: "100%" }}>
      <h2 className="display-5 fw-bold text-center mt-5 pb-3 mb-4 funky-gradient-text">Your Profile</h2>

      <Form.Group className="mb-3" controlId="profileEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={userData.email}
          readOnly
          plaintext
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="profileFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="profileLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="profileAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Profile updated successfully!</Alert>
      )}

      <Button
        type="submit"
        className="w-100 rounded-pill btn-funky"
        style={{ fontWeight: 700, fontSize: "1.2rem", padding: ".8rem 0" }}
      >
        Update Profile
      </Button>
    </Form>
  );
};

export default UserProfile;
