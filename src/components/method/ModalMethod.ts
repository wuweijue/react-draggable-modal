import * as ReactDOM from 'react-dom';
import ModalStore from '../store/ModalStore';
import IModalMethod, { IModal } from './ModalMethod.d';

class ModalMethod implements IModalMethod {

    config

    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件
     * @returns modalId 返回一个modal的number类型的id值，用于关闭弹窗
     */
    public showModal(modal: JSX.Element, option = {
        containerNode: document.body
    }): IModal {

        let modalId = ModalStore.maxZIndex + 1;

        let { containerNode: curContainerNode } = option

        let containerNode = curContainerNode || this.config.containerNode;

        let modalRoot = document.querySelector('#modal-root');
        //若不存在根节点，则创建一个#modal-root用于承载弹窗
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', 'modal-root');
            containerNode.appendChild(modalRoot);
        }

        //由于ReactDOM.render方法会清空内部元素，所以需要一个中间层wrapper用于渲染
        let modalWrapper = document.createElement('div');
        modalWrapper.setAttribute('id', `modal-wrapper-${modalId}`),
            modalWrapper.setAttribute('class', 'modal-wrapper'),
            modalRoot.appendChild(modalWrapper)

        //利用ReactDOM渲染modal
        const reactElement = (ReactDOM.render(modal, document.getElementById('modal-wrapper-' + modalId)) as any);

        return {
            DOM: document.getElementById('modal-' + modalId),
            modalId,
            close: () => this.hideModal(modalId),
            reactElement
        };
    }

    /**
     * @description 关闭某个指定的弹窗
     * @param modalId 需要关闭的弹窗的id值
     */
    public hideModal(modalId: number): void {
        let modalWrapperDOM = document.querySelector('#modal-wrapper-' + modalId)
        if (modalWrapperDOM) {
            let modalDOM = document.querySelector('#modal-' + modalId);
            let modalClassName = modalDOM.className;
            let modalRootDOM = document.querySelector('#modal-root');
            if (!modalClassName.includes('modal-animation-out')) {
                modalDOM.className += ' modal-animation-out'
            }

            //设置定时器延时卸载组件是为了展示关闭弹窗的动画效果
            setTimeout(() => {
                //手动卸载react组件，目的是触发内部组件componentWillUnmount生命周期函数
                ReactDOM.unmountComponentAtNode(document.getElementById("modal-wrapper-" + modalId));
                modalRootDOM.removeChild(modalWrapperDOM);
                //若#modal-root内弹窗均已关闭，则移除该元素
                if (!document.querySelectorAll('.modal-wrapper').length) {
                    modalRootDOM.parentNode.removeChild(modalRootDOM)
                }
            }, 300);
        } else {
            console.warn('不存在modalId为' + modalId + '的弹窗')
        }
    }

    /**
     * @description 强制关闭所有弹窗和根节点
     */
    public hideAllModal(): void {
        let modalRootDOM = document.querySelector('#modal-root');
        modalRootDOM.parentNode.removeChild(modalRootDOM);
    }

    /**
     * @description 设置配置项
     */
    public setConfig(config): void {
        this.config = { ...this.config, config }
    }

}

export default (window as any).modal = new ModalMethod();