import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/Store";
import { clearUser } from "../redux/authSlice";
import { auth } from "../firebase/FirebaseConfig";
import "../css/navbar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(clearUser());
    alert("See you later!");
    navigate("/");
  };

  return (
    <NavbarBs fixed="top" expand="md" className="bg-white shadow-sm px-4">
      <Container
        fluid
        className="d-flex align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center">
          <NavbarBs.Brand as={Link} to="/">
            Home Page
          </NavbarBs.Brand>

          <NavbarBs.Toggle aria-controls="navbar-nav" className="ms-2" />
        </div>

        <NavbarBs.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/products" as={NavLink}>
              View Products
            </Nav.Link>
            <Nav.Item>
              <a
                href="https://github.com/CanterCode/ecommerce-site-funky-finds"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-muted d-flex align-items-center"
              >
                <i className="bi bi-github me-1"></i>GitHub Repo
              </a>
            </Nav.Item>
          </Nav>
        </NavbarBs.Collapse>

        {isLoggedIn && (
          <Button
            variant="outline-secondary"
            className="rounded-pill btn-funky-outline me-2"
            onClick={() => navigate("/firestore-products")}
          >
            Firestore Products
          </Button>
        )}

        <div className="d-flex align-items-center gap-2 navbar-buttons">
          {isLoggedIn && (
            <Button
              variant="outline-danger"
              className="rounded-pill px-4 btn-funky-outline"
              onClick={handleLogout}
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                padding: "0.5rem 1.2rem",
              }}
            >
              Log Out
            </Button>
          )}
          {isLoggedIn ? (
            <Button
              variant="outline-secondary"
              className="rounded-pill btn-funky-outline"
              onClick={() => navigate("/user-profile")}
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                padding: "0.5rem 1.2rem",
              }}
            >
              Profile
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              className="rounded-pill btn-funky-outline"
              onClick={() => navigate("/login")}
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                padding: "0.5rem 1.2rem",
              }}
            >
              Login
            </Button>
          )}

          <Button
            onClick={() => navigate("/cart")}
            variant="outline-primary"
            className="rounded-circle navbar-cart-btn"
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center navbar-cart-badge"
              style={{
                color: "white",
                width: "1.2rem",
                height: "1.2rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
                fontWeight: 700,
                fontSize: "0.8rem",
              }}
            >
              {totalQuantity}
            </div>
          </Button>
        </div>
      </Container>
    </NavbarBs>
  );
};

export default NavigationBar;
