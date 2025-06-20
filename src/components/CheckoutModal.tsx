import { Modal, Button } from "react-bootstrap";

type Props = {
  show: boolean;
  onClose: () => void;
};

const CheckoutModal = ({ show, onClose }: Props) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thank You!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your purchase has been completed successfully.</p>
        <p>We appreciate your business.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;