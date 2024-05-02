import React, { useState } from "react";

const Modal = (props) => {
  const [modalTriggered, setModalTriggered] = useState(false);

  const handleModalTrigger = () => setModalTriggered(!modalTriggered);

  return (
    <React.Fragment>
      <button
        onClick={handleModalTrigger}
        aria-expanded={!modalTriggered ? true : false}
        className="btn btn-primary"
      >
        Trigger modal
      </button>

      <div>
        <div className={`modal ${modalTriggered ? "show" : "hide"}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
