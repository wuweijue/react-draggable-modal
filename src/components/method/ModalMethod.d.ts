export default class IModalMethod {

    config: IConfig

    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件
     * @returns modalId 返回一个modal的string类型的id值，用于关闭弹窗
     */
    public showModal(modal: JSX.Element, config?:IConfig): IModal

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
    public setConfig(config: IConfig): void

}

interface IConfig {
    /**
     * 父节点容器
     */
    containerNode: HTMLElement 
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