import { Modal, Button } from "react-bootstrap";
import "../css/cart.css";

type Props = {
  show: boolean;
  onClose: () => void;
};

const CheckoutModal = ({ show, onClose }: Props) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="funky-modal"
    >
      <Modal.Header closeButton className="funky-modal-header">
        <Modal.Title>
          🎉 Thank You for Your Purchase!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center fs-5">
        <p>Your purchase has been completed successfully.</p>
        <p>We appreciate your business.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button className="btn-funky px-4" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;