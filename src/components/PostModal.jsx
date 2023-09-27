import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { formatDate } from "../hooks/formatDate";

const PostModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <Modal dialogClassName="custom-modal" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Aquí muestra los detalles de la publicación */}
        <h4>{post.username}</h4>
        <img
          src={`http://localhost:4000/${post.photo}`}
          alt={`Imagen de ${post.username}`}
        />
        <p>
          <strong>{post.username}:</strong> {post.description}
        </p>

        <p>
          {" "}
          {post.numLikes <= 1
            ? `${
                post.likedUsernames === null ? "nadie" : post.likedUsernames
              } le ha dado me gusta`
            : `${post.likedUsernames}  han dado me gusta`}
        </p>
        <p>{formatDate(post.createdAt)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
