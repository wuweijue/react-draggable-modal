export default class IModalStore {

    modalList:number[]

    maxZIndex:number

    registerModal(zIdx:number):void

    unRegisterModal(zIdx:number):void

    promoteZIndex():void

}