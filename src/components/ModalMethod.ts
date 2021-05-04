import * as ReactDOM from 'react-dom'; 
import * as $ from 'jquery';
import ModalStore from '../store/ModalStore';
import IModalMethod,{IModal} from './ModalMethod.d';

class ModalMethod implements IModalMethod{

    config

    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件
     * @returns modalIndex 返回一个modal的number类型的id值，用于关闭弹窗
     */
    public showModal(modal: JSX.Element, option={
        containerNode: document.body
    }): IModal {

        let modalId = ModalStore.maxZIndex + 1;

        let { containerNode: curContainerNode } = option

        let containerNode = curContainerNode || this.config.containerNode;

        //若不存在根节点，则创建一个#modal-root用于承载弹窗
        if (!$('#modal-root').length) {
            $(containerNode).append("<div id='modal-root'/>");
        }

        //由于ReactDOM.render方法会清空内部元素，所以需要一个中间层wrapper用于渲染
        $('#modal-root').append(`<div id='modal-wrapper-${modalId}' class='modal-wrapper'/>`);

        //利用ReactDOM渲染modal
        const reactElement = (ReactDOM.render(modal, document.getElementById('modal-wrapper-' + modalId)) as any);

        return {
            DOM: document.getElementById('modal-'+modalId),
            modalId,
            close: ()=>this.hideModal(modalId),
            reactElement
        };
    }

    /**
     * @description 关闭某个指定的弹窗
     * @param modalIndex 需要关闭的弹窗的id值
     */
    public hideModal(modalIndex:number):void {
        if ($('#modal-wrapper-' + modalIndex).length) {
            
            $("#modal-"+modalIndex).addClass('modal-animation-out');
            
            //设置定时器延时卸载组件是为了展示关闭弹窗的动画效果
            setTimeout(() => {
                //手动卸载react组件，目的是触发内部组件componentWillUnmount生命周期函数
                ReactDOM.unmountComponentAtNode(document.getElementById("modal-wrapper-" + modalIndex))
                $('#modal-wrapper-' + modalIndex).remove();

                //若#modal-root内弹窗均已关闭，则移除该元素
                if (!$('.modal-wrapper').length) {
                    $("#modal-root").addClass('modal-mask-out');
                    setTimeout(() => {
                        $('#modal-root').remove();
                    }, 500);
                }
            }, 300);           
        }
    }

    /**
     * @description 强制关闭所有弹窗和根节点
     */
    public hideAllModal(): void {
        $('#modal-root').remove();
    }

    /**
     * @description 设置配置项
     */
    public setConfig(config): void {
        this.config = {...this.config,config}
    }

}

export default (window as any).modal = new ModalMethod();