export default class IModalMethod {

    options: IOptions

    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件  
     * @param options IOptions对象
     * @returns IModal对象
     */
    public showModal(modal: JSX.Element, options?:IOptions): IModal

    /**
     * @description 在页面中展示一个弹窗
     * @param options IOpenOptions对象
     * @returns IModal对象
     */
    public open(options:IOpenOptions): IModal

    /**
     * @description 关闭某个指定的弹窗
     * @param modalId 需要关闭的弹窗的id值
     */
    public hideModal(modalId: number): void

    /**
    * @description 强制关闭所有弹窗和根节点
    */
    public hideAllModal(): void

    /**
    * @description 强制关闭所有弹窗和根节点
    */
    public setOption(options: IOptions): void

}

export interface IOptions {
    /**
     * 父节点容器
     */
    containerNode: HTMLElement 
}

export interface IOpenOptions extends IOptions{

    children?: JSX.Element | string

    draggable?: boolean

    closable?: boolean

    mask?: boolean

    bodyStyle?: any 

    className?: string

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean

    afterClose?(): void

    onOk?(): void

    onCancel?(): void
}

export interface IModal{

    /**
     * modal本体的dom
     */
    DOM: HTMLElement

    /**
     * modal的id值
     */
    modalId: number

    /**
     * 关闭当前节点的方法
     */
    close(): void

    /**
     * 弹窗react元素
     */
    reactElement: JSX.Element
}