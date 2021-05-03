class ModalStore{
    modalList = [];

    maxZIndex = 1000;

    registerModal(zIdx){
        this.maxZIndex = zIdx;
        this.modalList.push(zIdx);
    }

    unRegisterModal(zIdx){
        for(let i=0;i<this.modalList.length-1;i++){
            if(this.modalList[i] == zIdx){
                this.modalList.splice(i,1)
            }
        }
    }

    promoteZIndex(){
        return ++this.maxZIndex;
    }
}

export default new ModalStore();