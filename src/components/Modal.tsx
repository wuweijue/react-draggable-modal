import * as React from 'react';
import classNames from 'classnames';
import Button from './Button';
import * as $ from 'jquery';
import { IModalProps } from './Modal.d';

import './modal.less';

class Modal extends React.Component<IModalProps, any> {

    constructor(props) {
        super(props);
        this.init();
        console.log(this.props.store)
    }

    init() {
        const props = this.props;
        let width = 400, height = 180;
        const { clientWidth, clientHeight } = document.body;
        
        //将宽高由百分比或者带px单位的string转换为number
        if (props.width && typeof props.width === 'number') {
            if (props.width > clientWidth) {
                //宽度限制为屏幕最大宽度
                width = clientWidth;
            } else {
                width = props.width;
            }

        } else if (props.width && typeof props.width === 'string' && props.width.includes('px')) {
            if (parseInt(props.width) > clientWidth) {
                width = clientWidth;
            } else {
                //去除string末尾的px
                width = parseInt(props.width);
            }
        } else if (props.width && typeof props.width === 'string' && props.width.includes('%')) {
            if (parseInt(props.width) > 100) {
                width = clientWidth;
            } else {
                width = clientWidth * parseInt(props.width) / 100;
            }

        } 

        if (props.height && typeof props.height === 'number') {
            if (props.width > clientHeight) {
                height = clientHeight;
            } else {
                height = props.height;
            }
        } else if (props.height && typeof props.height === 'string' && props.height.includes('px')) {
            if (parseInt(props.height) > clientHeight) {
                height = clientHeight;
            } else {
                //去除string末尾的px
                height = parseInt(props.height);
            }

        } else if (props.height && typeof props.height === 'string' && props.height.includes('%')) {
            if (parseInt(props.height) > 100) {
                height = clientHeight;
            } else {
                height = clientHeight * parseInt(props.height) / 100;
            }
        }

        //设置最小初始宽高
        if (height < 120) {
            height = 120;
        }
        if (width < 200) {
            width = 200;
        }

        const that = this;
        const store = this.props.store;

        let zIndex = store.registerModal(that);

        let { mask = true, visible, draggable, title } = props;

        mask && $("#modal-root").addClass('modal-mask-in');

        this.state = {
            visible: visible || false,
            width: width,
            height: height,
            toRight: 0, // 向右的偏移量
            toBottom: 0, // 向下的偏移量
            isExtend: false,
            draggable: draggable || true,//是否可拖拽
            modalId: zIndex, // 初始值，用于定位
            zIndex: zIndex, // 控制层级    
            marginTop: 0 - 0.5 * height, //让表单初始时保持居中
            marginLeft: 0 - 0.5 * width, //让表单初始时保持居中
            historyWidth: width,
            historyHeight: height,
            title: title,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible !== '' && visible !== null) {
            this.setState({ visible });
            if (visible === false) {
                this.afterClose();
            }
        }
    }

    componentWillUnmount() {
        this.afterClose();
        this.props.store.unRegisterModal(this.state.modalId);
    }

    afterClose() {
        if (this.props.afterClose) {
            this.props.afterClose();
        }
    }

    close = () => {
        this.setState({
            visible: false,
        }, () => {
            this.afterClose();
        })
    }

    onOk() {
        if (this.props.onOk) {
            this.props.onOk();
        } else {
            this.close();
        }
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel()
        } else {
            this.close();
        }
    }

    dragMove = (e) => {

        //当鼠标按下时触发
        e.stopPropagation();
        let pointLeft = e.clientX; //获取此时鼠标距离屏幕左侧的距离
        let pointTop = e.clientY; //获取此时鼠标距离屏幕顶部的距离

        //此刻的右和下方向的偏移量
        let right = this.state.toRight;
        let bottom = this.state.toBottom;

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            //避免拖动过程中文本被选中
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();

            let toRight = event.clientX - pointLeft + right;
            let toBottom = event.clientY - pointTop + bottom;

            this.setState({
                toRight: toRight,
                toBottom: toBottom,
            })
        }

        document.onmouseup = () => {
            //鼠标松开后清除移动事件
            document.onmousemove = null;
        }
    }

    dragScaleX(e) {

        //当鼠标按下时触发
        e.stopPropagation();

        let { width, toRight: right, } = this.state;
        let pointLeft = e.clientX //获取此时鼠标距离屏幕左侧的距离
        let left = this.modal.offsetLeft + right; //弹框到左边的距离
        let pointDirection; //点击的是弹框左侧 或是 右侧

        if (pointLeft - left <= 20 && pointLeft >= left) {
            pointDirection = 'left';
        } else if (this.state.width + left - pointLeft <= 20) {
            pointDirection = 'right';
        } else {
            return false;
        }

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toRight, newWidth;
            if (pointDirection === 'left') {
                toRight = event.clientX - pointLeft + right;
                newWidth = width + pointLeft - event.clientX;
                newWidth = newWidth < 200 ? 200 : newWidth;
            } else {
                toRight = right;
                newWidth = width + event.clientX - pointLeft;
                newWidth = newWidth < 200 ? 200 : newWidth;
            }

            this.setState({
                toRight,
                width: newWidth,
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }

    modal;//dom

    dragScaleY(e) {

        //当鼠标按下时触发
        e.stopPropagation();
        
        let { height, toBottom: bottom, } = this.state;
        let pointTop = e.clientY //获取此时鼠标距离屏幕顶部的距离
        let top = this.modal.offsetTop + bottom; //弹框到顶部的距离
        let pointDirection; //点击的是弹框上侧 或是 下侧

        if (pointTop - top <= 20 && pointTop >= top) {
            pointDirection = 'top';
        } else if (height + top - pointTop <= 20) {
            pointDirection = 'bottom';
        } else {
            return false;
        }

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toBottom, newHeight;
            if (pointDirection === 'top') {
                toBottom = event.clientY - pointTop + bottom;
                newHeight = height + pointTop - event.clientY;
                newHeight = newHeight < 120 ? 120 : newHeight;
            } else {
                toBottom = bottom;
                newHeight = height + event.clientY - pointTop;
                newHeight = newHeight < 120 ? 120 : newHeight;
            }

            this.setState({
                toBottom,
                height: newHeight,
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }

    /* 全屏/还原 */
    handleExtend() {
        let { clientWidth:width, clientHeight:height } = document.body;
        let marginTop, marginLeft;
        let { draggable, historyWidth, historyHeight } = this.state;
        if (!this.state.isExtend) {
            marginTop = 0;
            marginLeft = 0;
            //若当前不是全屏状态则全屏后禁止拖拽
            draggable = false;
        } else {
            //从全屏状态恢复为原来的状态
            draggable = this.props.draggable;
            width = historyWidth;
            height = historyHeight;
            marginTop = 0 - historyHeight / 2;
            marginLeft = 0 - historyWidth / 2;
        }
        this.setState({
            width,
            height,
            historyWidth: this.state.width,
            historyHeight: this.state.height,
            toRight: 0,
            toBottom: 0,
            draggable,
            marginTop,
            marginLeft,
            isExtend: !this.state.isExtend,
        })
    }

    //聚焦
    handleFocus = () => {
        const store = this.props.store;
        const maxZIndex = store.maxZIndex;
        let modalList = store.modalList;
        if (modalList.length > 1 && this.state.zIndex < maxZIndex) {
            let newZIdx = store.promoteZIndex(this.state.modalId);
            this.setState({
                zIndex: newZIdx,
            })
        }
    }

    footerRender = () => {
        const { footer, okText, cancelText } = this.props;
        const { draggable=true } = this.state;

        if (Object.prototype.toString.call(footer) === '[object Object]' && (footer as JSX.Element).type) {
            /* 如果是一个react组件 */
            return <div className='modal-footer-wrapper'
                onMouseDown={(e) => {
                    /* 触发高度缩放事件 */
                    draggable && this.dragScaleY(e)
                }}
            >
                {footer}
            </div>
        }

        if (footer === null) {
            return <div className='modal-footer-null'></div>
        }

        return (
            <div
                className='modal-footer'
                onMouseDown={(e) => {
                    /* 触发高度缩放事件 */
                    draggable && this.dragScaleY(e)
                }}>

                <div className='modal-footer-btnList'>

                    <Button className='modal-footer-btn cancel-btn' onClick={
                        () => this.onCancel()
                    }>
                        {cancelText || '取消'}
                    </Button>

                    <Button btnType='primary' className='modal-footer-btn ok-btn' onClick={
                        () => this.onOk()
                    }>
                        {okText || '确认'}
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        const { className: propsClassName, title, closable = true, bodyStyle } = this.props;
        let { isExtend, draggable, modalId, toRight, toBottom } = this.state;
        const className = classNames('modal', 'modal-animation-in', { 'modal-extendStatus': isExtend, [propsClassName]: propsClassName })
        let transformProps = {}
        if (toRight || toBottom) {
            transformProps = {
                transform: 'translate(' + toRight + 'px,' + toBottom + 'px)'
            }
        }

        return (
            <div
                ref={(modal) => this.modal = modal}
                id={'modal-' + modalId}
                className={className}
                onClick={() => { this.handleFocus() }}
                style={{
                    ...bodyStyle,
                    display: this.state.visible ? 'flex' : 'none',
                    width: this.state.width + 'px',
                    height: this.state.height + 'px',
                    zIndex: this.state.zIndex,
                    marginTop: this.state.marginTop,
                    marginLeft: this.state.marginLeft,
                    ...transformProps
                }}>

                <div className='modal-header'
                    /* 弹窗拖动事件 */
                    onMouseDown={(e) => {
                        draggable && this.dragMove(e)
                    }}
                >
                    <div className='modal-header-drag'
                        onMouseDown={(e) => {
                            draggable && this.dragScaleY(e)
                        }}
                    >
                        
                    </div>
                    <div className='modal-title'>
                        {title}
                    </div>

                    {/* 右上角功能图标 */}
                    <div className='modal-header-btnList'>
                        {/* 全屏 */}
                        <div
                            className='modal-header-btn btn-extend'
                            onClick={
                                () => this.handleExtend()
                            }
                        >
                            <i className='icon icon-extend' />
                        </div>

                        {closable && <div
                            className='modal-header-btn btn-close'
                            onClick={
                                () => this.onCancel()
                            }>
                            <i className='icon icon-close' />
                        </div>}
                    </div>
                </div>

                <div
                    className='modal-body scroll'
                    onMouseDown={(e) => {
                        {/* 纵向拉伸事件 */ }
                        draggable && this.dragScaleX(e);
                    }}
                >
                    {/* 内容 */}
                    <div className='modal-content'>
                        {this.props.children}
                    </div>
                </div>

                {   /* footer部分 */
                    this.footerRender()
                }
            </div>
        )
    }
}

export default Modal;