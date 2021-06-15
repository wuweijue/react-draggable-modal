import IModalStore from './ModalStore.d';

class ModalStore implements IModalStore{

    constructor(){
        document.addEventListener('keydown',(event)=>{
            event.preventDefault();
            let focusId = this.modalList.length && this.modalList[this.modalList.length-1].modalId;
            let reactElement = this.findReactElement(focusId) 
            if(!reactElement) return false;      
            if(event.keyCode == 13 || event.key == 'Enter'){ //回车
                reactElement.props.onOk && reactElement.props.onOk();
            }
          
            if(event.keyCode == 27 || event.key == 'Escape'){ //esc
                reactElement.props.onCancel && reactElement.props.onCancel();
            }
        })
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

    registerModal(reactElement,mask,visible){
        let modalId = ++this.maxZIndex;
        this.modalList.push({
            modalId,
            reactElement,
            visible,
            mask
        });
        return modalId;
    }

    changeModalVisible(modalId,visible){
        this.getModalById(modalId,(item,i)=>{
            item.visible = visible;
        })
    } 

    unRegisterModal(modalId){
        this.getModalById(modalId,(item,i)=>{
            this.modalList.splice(i,1)
        })
    }

    getIsAllModalHide(){
        let res = true;
        for(let i=0;i<this.modalList.length;i++){
            if(this.modalList[i].visible && this.modalList[i].mask){
                res = false;
                break;
            }
        }
        return res;
    }

    private getModalById(modalId,cb){
        for(let i=0;i<this.modalList.length;i++){
            if(this.modalList[i].modalId == modalId){
                cb(this.modalList[i],i);
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