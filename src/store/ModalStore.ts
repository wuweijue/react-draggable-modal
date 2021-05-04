import * as $ from 'jquery';
import IModalStore from  './ModalStore.d'

class ModalStore implements IModalStore{

    constructor(){
        $(document).keydown((event)=>{
            let focusId = this.modalList.length && this.modalList[this.modalList.length-1].modalId;
            console.log('focusId: ' + focusId)
            let reactElement = this.findReactElement(focusId) 
            if(!reactElement) return false;      
            console.log(this.modalList)
            if(event.keyCode == 13){ //回车
                reactElement.props.onOk && reactElement.props.onOk();
            }
          
            if(event.keyCode == 27){ //esc
                reactElement.props.onCancel && reactElement.props.onCancel();
            }
        });
    }

    modalList = [];

    maxZIndex = 1000;

    findReactElement(modalId){
        let reactElement;
        this.modalList.forEach(item=>{
            if(item.modalId = modalId){
                reactElement = item.reactElement;
            }
        })

        return reactElement;
    }

    registerModal(reactElement){
        let modalId = ++this.maxZIndex;
        this.modalList.push({
            modalId,
            reactElement
        });
        return modalId;
    }

    unRegisterModal(modalId){
        console.log(this.modalList)
        for(let i=0;i<this.modalList.length;i++){
            let curModalId = this.modalList[i].modalId;
            if(this.modalList[i].modalId == modalId){
                this.modalList.splice(i,1)
                break;
            }
        }
    }

    promoteZIndex(modalId){
        for(let i=0;i<this.modalList.length;i++){
            if(this.modalList[i].modalId == modalId){
                let modal = this.modalList[i];
                this.modalList.splice(i,1)
                this.modalList.push(modal)
                break;
            }
        }
        return ++this.maxZIndex;
    }
}

export default new ModalStore();