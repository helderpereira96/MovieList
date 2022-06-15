import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalPopUp = (props) => {
  const movie = props.movie;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {movie.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "459px", float: "left" }}>
          <h4>{movie.tagline}</h4>
          <p>{movie.overview}</p>
        </div>
        <div style={{ float: "left", width: "250px" }}>
          <img
            style={{ width: "100%" }}
            src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
            alt=""
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopUp;
