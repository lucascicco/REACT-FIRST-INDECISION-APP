import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => (
      <Modal
      isOpen={!!props.selectedOption} //Quando tem string retorna TRUE, quando tem UNDEFINED retorna FALSE.
      onRequestClose={props.HandleClearSelectedOption}
      contentLabel="Selected Option"
      closeTimeoutMS={200}
      className="modal"
      >
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal_body">{props.selectedOption}</p>}
        <button className="button" onClick={props.HandleClearSelectedOption}>Okay</button>
    </Modal>
);


export default OptionModal;
