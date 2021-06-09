import * as React from 'react';
import Modal from './Modal';
import ModalStore from './store/ModalStore';
import modalMethod from './method/ModalMethod';
import { IModalProps } from './Modal.d';

class DragModal extends React.Component<IModalProps>{
    render() {
        return <Modal store={ModalStore} {...this.props} />
    }
}

export default modalMethod;

export { DragModal as Modal };

