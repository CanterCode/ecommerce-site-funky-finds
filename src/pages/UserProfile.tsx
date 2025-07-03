import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  createdAt: { toDate: () => Date } | null;
}

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

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          fetchUser();
          fetchOrders();
        } else {
          setError("No user logged in.");
          setLoading(false);
          setOrdersLoading(false);
        }
      }, 500);
      return;
    }

    const fetchUser = async () => {
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

    const fetchOrders = async () => {
      try {
        const ordersCol = collection(db, "users", user.uid, "orders");
        const q = query(ordersCol, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersList: Order[] = [];
        querySnapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(ordersList);
      } catch {
        setError("Failed to fetch orders.");
      }
      setOrdersLoading(false);
    };

    fetchUser();
    fetchOrders();
  }, [user]);

  const handleDeleteProfile = async () => {
      if (!user) {
        setError("No user logged in.");
        return;
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      );

      if (!confirmDelete) return;

      try {
        await deleteDoc(doc(db, "users", user.uid));

        await user.delete();

        alert("Your profile has been deleted. Goodbye 👋");
        window.location.href = "/";
      } catch (err) {
        setError("Failed to delete profile. Please log in again and try.");
        console.error(err);
      }
    };

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

  if (loading) return <Spinner animation="border" className="m-5" />;

  return (
    <div className="container mt-5">
      <h1 className="display-4 fw-bold text-center funky-gradient-text mt-5 mb-5">
        Your Profile
      </h1>

      <Row className="gy-4 gx-5">
        {/* Left side: Your Info */}
        <Col xs={12} md={6} lg={5} className="mx-auto">
          <h3 className="fw-bold mb-4 text-center">Your Info</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="profileEmail">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                readOnly
                plaintext
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileFirstName">
              <Form.Label className="fw-bold">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileLastName">
              <Form.Label className="fw-bold">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="profileAddress">
              <Form.Label className="fw-bold">Address</Form.Label>
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

            <div className="d-flex justify-content-between gap-3 mt-4">
              <Button
                type="submit"
                className="w-100 rounded-pill btn-funky"
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: ".7rem 0",
                }}
              >
                Update Profile
              </Button>

              <Button
                variant="secondary"
                className="w-100 rounded-pill"
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: ".7rem 0",
                }}
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right side: Previous Orders */}
        <Col xs={12} md={6} lg={6} className="mx-auto">
          <h3 className="fw-bold mb-4 text-center">Previous Orders</h3>

          {ordersLoading ? (
            <Spinner animation="border" className="d-block mx-auto" />
          ) : orders.length === 0 ? (
            <p className="text-center fst-italic" style={{ marginTop: 100 }}>
              No orders yet! Go check out our funky finds and grab some swag 🛍️
            </p>
          ) : (
            <div style={{ maxHeight: 400, overflowY: "auto" }} className="px-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="mb-3 p-3 rounded border bg-white shadow-sm"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : "Unknown"}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                  <Link to={`/view-order/${order.id}`} className="btn btn-sm btn-outline-primary mt-2 rounded-pill fw-bold">
  View Order
</Link>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
