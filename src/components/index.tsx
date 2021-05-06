import * as React from 'react';
import Modal from './Modal';
import ModalStore from '../store/ModalStore';
import ModalMethods from './ModalMethod';
import { IModalProps } from './Modal.d';
class DragModal extends React.Component<IModalProps>{
    render(){
        return <Modal store={ModalStore} {...this.props}/>      
    }
}

export default ModalMethods;

export { DragModal as Modal };

