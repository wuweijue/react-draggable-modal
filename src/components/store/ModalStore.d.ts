export default class IModalStore {

    modalList: modal[]

    maxZIndex:number

    registerModal(reactElement,mask,visible):void

    unRegisterModal(modalId: number):void

    promoteZIndex(modalId: number):void

    findReactElement(modalId: number): JSX.Element

    changeModalVisible(modalId: number, visible: boolean): void

    getIsAllModalHide(): boolean

}

interface modal {
    modalId: number,
    reactElement: JSX.Element
}