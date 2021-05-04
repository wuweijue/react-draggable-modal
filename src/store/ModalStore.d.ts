export default class IModalStore {

    modalList: modal[]

    maxZIndex:number

    registerModal(reactElement):void

    unRegisterModal(modalId: number):void

    promoteZIndex(modalId: number):void

    findReactElement(modalId: number): JSX.Element

}

interface modal {
    modalId: number,
    reactElement: JSX.Element
}