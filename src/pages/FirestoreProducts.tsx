import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const FirestoreProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const fetchedProducts: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      fetchedProducts.push({ id: doc.id, ...data } as Product);
    });
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
      });
      setSuccess("Product added successfully!");
      setNewProduct({ name: "", price: "", description: "" });
      fetchProducts();
    } catch {
      setError("Failed to add product.");
    }
  };

  const handleUpdateProduct = async (id: string, updated: Partial<Product>) => {
    try {
      await updateDoc(doc(db, "products", id), updated);
      setSuccess("Product updated!");
      fetchProducts();
    } catch {
      setError("Update failed.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setSuccess("Product deleted.");
      fetchProducts();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <Container fluid className="mt-5">
      <h1 className="text-center funky-gradient-text mb-4 mt-5">Firestore Products</h1>

      <Form onSubmit={handleAddProduct} className="mb-5 mx-5">
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
          </Col>
          <Col md={1}>
            <Button type="submit" className="w-100 btn-funky">
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <h4 className="mb-3 mx-5">Current Products:</h4>
      {products.map((prod) => (
        <Form
          key={prod.id}
          className="p-3 border rounded mb-3 bg-light mx-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProduct(prod.id, prod);
          }}
        >
          <Row className="align-items-center g-3">
            <Col md={3}>
              <Form.Control
                type="text"
                defaultValue={prod.name}
                onChange={(e) => (prod.name = e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="number"
                step="0.01"
                defaultValue={prod.price}
                onChange={(e) => (prod.price = parseFloat(e.target.value))}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                defaultValue={prod.description}
                onChange={(e) => (prod.description = e.target.value)}
              />
            </Col>
            <Col md={3}>
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  variant="outline-success"
                  className="rounded-pill px-3"
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger"
                  className="rounded-pill px-3"
                  onClick={() => handleDeleteProduct(prod.id)}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      ))}
    </Container>
  );
};

export default FirestoreProducts;