import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useUser } from "../context/UserContext";
//import { useHome } from "../hooks/api";
import { Navigate } from "react-router-dom";

function NewPost() {
  const [user] = useUser();
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null); // Para almacenar la imagen seleccionada
  const [error, setError] = useState("");

  const handleNewPost = async (e) => {
    e.preventDefault();

    if (!photo || !description) return setError("Faltan campos");
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    const res = await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: { Authorization: user },
      body: formData,
    });

    if (res) {
      setShow(false);
      setDescription("");
      setPhoto(null);
      setError("");
    }
    return <Navigate to={"/"}></Navigate>;
  };

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setPhoto(null);
    setError("");
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir una nueva publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewPost}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe una descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Seleccionar foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*" // Acepta solo archivos de imagen
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          {error && <p className="error">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary" onClick={handleNewPost}>
            Subir foto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewPost;
