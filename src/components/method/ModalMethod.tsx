import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ModalStore from '../store/ModalStore';
import IModalMethod, { IModal, IOpenOptions, IOptions } from './ModalMethod.d';
import Modal from '../Modal';

class ModalMethod implements IModalMethod {

    private options: IOptions = {
        containerNode: document.getElementById('root')
    }

    private createModal(modal, options) {

        const modalId = ModalStore.maxZIndex + 1; //保证生成的modal初始时在最上层
        const containerNode = options.containerNode || this.options.containerNode;

        let modalRoot = document.querySelector('#modal-root');
        //若不存在#modal-root根节点，则创建一个用于承载modal
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', 'modal-root');
            containerNode.appendChild(modalRoot);
        }

        //由于ReactDOM.render方法会清空内部元素，所以需要一个中间层wrapper用于渲染
        const modalWrapper = document.createElement('div');
        modalWrapper.setAttribute('id', `modal-wrapper-${modalId}`);
        modalWrapper.setAttribute('class', 'modal-wrapper');
        modalRoot.appendChild(modalWrapper);

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
        * @description 在页面中展示一个弹窗
        * @param options
        * @returns IModal {
        *   DOM,
        *   modalId, 
        *   close, 关闭modal的方法
        *   reactElement modal组件
        * }
        */
    public open(options:IOpenOptions): IModal {
        let modalId = ModalStore.maxZIndex + 1;
        const modal = <Modal visible={true} store={ModalStore} 
            onOk={()=>{
                this.hideModal(modalId)
            }} 
            onCancel={()=>{
                this.hideModal(modalId)
            }} 
            {...options}
        > 
            { options && options.children }
        </Modal>
        return this.createModal(modal, options || {})
    }

    /**
        * @description 在页面中展示一个弹窗
        * @param modal 弹窗组件
        * @returns IModal {
        *   DOM,
        *   modalId, 
        *   close, 关闭modal的方法
        *   reactElement modal组件
        * }
        */
    public showModal(modal: JSX.Element, options = {
        containerNode: document.body
    }): IModal {
        return this.createModal(modal, options)
    }

    /**
        * @description 关闭某个指定的弹窗
        * @param modalId 需要关闭的弹窗的id值
        */
    public hideModal(modalId: number): void {

        const modalWrapperDOM = document.querySelector('#modal-wrapper-' + modalId)
        if (modalWrapperDOM) {
            const modalDOM = document.querySelector('#modal-' + modalId);
            const modalClassName = modalDOM.className;
            const modalRootDOM = document.querySelector('#modal-root');
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
            console.warn('不存在modalId为' + modalId + '的modal')
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
        * @description 设置默认的配置项
        */
    public setOption(options:IOptions): void {
        this.options = { ...this.options, ...options }
    }

}

export default (window as any).modal = new ModalMethod();