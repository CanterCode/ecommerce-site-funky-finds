import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/FirebaseConfig";
import { Spinner, Card, Container, Alert } from "react-bootstrap";

interface OrderItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: { toDate: () => Date } | null;
}

const ViewOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setError("You must be logged in to view an order.");
          setLoading(false);
          return;
        }

        const orderRef = doc(db, "users", userId, "orders", orderId!);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() } as Order);
        } else {
          setError("Order not found.");
        }
      } catch {
        setError("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!order) return null;

  return (
    <Container className="mt-5">
      <h1 className="display-5 funky-gradient-text text-center mt-5 mb-4">
        Order Details
      </h1>
      <p className="text-center fw-bold mb-4">Order ID: {order.id}</p>

      <div className="d-flex flex-column gap-4">
        {order.items.map((item, index) => (
          <Card key={index} className="d-flex flex-row align-items-center shadow-sm p-3">
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                marginRight: "1.5rem",
              }}
            />
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1">{item.title}</h5>
            </div>
            <div className="text-end">
              <p className="mb-1 fw-semibold">Qty: {item.quantity}</p>
              <p className="mb-0 fw-semibold">${item.price.toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-5">
        <h4 className="fw-bold">Total: ${order.total.toFixed(2)}</h4>
        <Link
          to="/user-profile"
          className="btn btn-outline-secondary rounded-pill mt-3 mb-5 px-4"
        >
          Back to Profile
        </Link>
      </div>
    </Container>
  );
};

export default ViewOrder;