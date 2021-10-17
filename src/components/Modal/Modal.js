import React, { Component } from 'react';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import './modal.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBAckdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBAckdropClick}>
        <div className="Modal__content">
          {this.props.children}

          <button type="button" onClick={this.props.onClose}>
            Close
          </button>
        </div>
      </div>,
      modalRoot,
    );
  }
}
