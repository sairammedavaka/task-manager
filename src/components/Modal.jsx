import "./Modal.css";

function Modal({ message, handleModalDialog }) {
  // HANDLER FOR CLOSE BUTTON
  function handleCloseBtn() {
    handleModalDialog(false, "");
  }

  // JSX COMPONENT OF MODAL
  return (
    <section id="modal">
      <div id="modal-dialog">
        <p>{message}</p>
        <button onClick={handleCloseBtn}>Close</button>
      </div>
    </section>
  );
}

export default Modal;
