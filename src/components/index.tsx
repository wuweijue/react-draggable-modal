import * as React from 'react';
import Modal from './Modal';
import ModalStore from '../store/ModalStore';
import ModalMethods from './ModalMethod';

class DragModal extends React.Component<any>{
    render(){
        return <Modal store={ModalStore} {...this.props}/>      
    }
}

export default ModalMethods;

export { DragModal as Modal };

