<h1><center>react-draggable-modal</center></h1>
<h2><center>一个基于 react 的模态框库，搭配 typescript 食用更佳！</center></h2>
<h2><center>A modal Library Based on react, better with typescript!</center></h2>
<br>

[源码地址 Source address](https://github.com/wuweijue/react-draggable-modal)
<br>

[Demo地址 Demo address](https://static-1acd801a-1752-4c44-b015-68e7a62c6e6b.bspapp.com/)
<br>

<p>邮箱 Email：awuweijue@163.com</P>
欢迎交流与提交bug Welcome to communicate and submit bug
<br>
<br>
<P>用途：当你在一个页面中需要展示一些额外的内容或交互，但又不想通过切换路由或者影响原页面来实现，尝试使用这个模态框</P>
<P>Purpose: when you need to show some extra content or interaction in a page, but you don't want to switch routes or affect the original page, try to use this modal</P>
<br>
<P>基础功能：在原页面上层展示一个可操作的弹出窗口，与antd等一般ui类库中的modal基本一致</P>
<P>Basic usage: display an operable pop-up window on the upper layer of the original page, which is basically consistent with the modal in general UI class libraries such as antd</P>
<br>
<P>进阶功能：支持拖拽移动，八向宽高拉伸，全屏展示，键盘事件，多层弹窗和聚焦（类似于操作系统的窗口，多个窗口同时存在时，可以通过点击让下面的窗口出现在最上层，并进行操作）</P>
<P>Advanced functions: support drag and drop movement, eight direction wide and high stretch, full screen display, keyboard events, multi-layer pop-up and focus (similar to windows of the operating system, when multiple windows exist at the same time, you can click to make the following windows appear on the top and operate)</P>
<br>
<P>另外：模态框拥有入场和出场等一系列动画，使画面过渡更加柔顺；包大小只有40k+，几乎没有额外的依赖，十分精简</P>
<P>In addition: the modal has a series of animations, such as entrance and exit, to make the transition more flexible; The packet size is only 40K +. There is almost no extra dependency and it is very compact</P>
<br>
<P>
使用指南(Usage)：（以下示例非完整代码，仅作参考 The following example is incomplete code for reference only）</P>
<P>（0）下载组件 install：</P>

``` nodejs
    npm i react-draggable-modal

    yarn add react-draggable-modal
```

<P>（1）作为组件内嵌使用 Embedded as a component：</P>

``` typescript

    import { Modal } from 'react-draggable-modal';

    import 'react-draggable-modal/lib/modal.css'; 

	class Business extends React.Components {

		state = {
			modalVisible: false
		}

		render(){
			return <div>
				<Modal 
					onOk={()=>this.save()}
					onCancel={()=>this.quit()}
					visible={this.state.modalVisible}
				>
					当前表单内容有所变化，请问是否需要保存？
				<Modal/>

				<button onClick={()=>this.setState({
					modalVisible: true
				})}>退出</button>
			</div>
		}
	}
```

<P>（2）通过modal的api使用 Using the API of modal：</P>

``` typescript

    import modalMethod,{ Modal } from 'react-draggable-modal';

    import 'react-draggable-modal/lib/modal.css'; 

	class Business extends React.Components {

		quit(modalInstance){
			/*
                ...此处执行quit事件,执行完毕后关闭弹窗 
                Execute the quit event here and close the modal 
                after execution Choose one of the three closing 
                methods
            */
                          
            /*方法一：通过创建modal弹窗返回的实例的close方法*/ 
			modalInstance.close();

			/*方法二：通过modal的hideModal方法，参数为modalId*/
			modalMethod.hideModal(modalInstance.modalId); 

			/*方法三：通过modal的hideAllModal方法强制关闭所有弹窗*/
			modalMethod.hideAllModal(); 
		}

		querySave(){
			/* 
                此处展示弹窗并返回一个弹窗实例，用于关闭弹窗
                或是获取Modal的dom（详情请见api说明）
                The modal is shown here, and an instance of modal
                is returned, which is used to close the modal 
                or obtain the dom of modal (see the API 
                description for details)
            */
			let modal = modalMethod.showModal(<Modal
				onOk={()=>this.save(modal)}
				onCancel={()=>this.quit(modal)}
				visible={true} //当使用接口调用时这是必须的
			>
				当前表单内容有所变化，请问是否需要保存？
			<Modal/>)
		}

		render(){
			return <div>		
				<button onClick={()=>this.querySave()}>退出</button>
			</div>
		}
	}
```
<h3>API说明:</h3>
<p>
（1）：modalMethod (当modalMethod第一次被引用时会被挂载到window上，可以通过window.modal使用或查看api)

``` typescript
    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件 config 配置项
     *      config = {
     *          containerNode: HTMLElement 渲染的根节点的容器,默认是body
     *      }
     * @returns modalInstance: {  
            DOM: HTMLElement modal的dom
            modalId: number 弹窗ID
            close(): void 关闭当前弹窗的方法
        }
     */

    public showModal(modal: JSX.Element, config?): modalInstance

    /**
     * @description 关闭某个指定的弹窗
     * @param modalId 需要关闭的弹窗的id值
     */
    public hideModal(modalId: number): void 

    /**
     * @description 强制关闭所有弹窗以及它们的根节点 force destroy all modal
     */
    public hideAllModal(): void

    /**
    * @description 设置配置项 setting
    * @params IConfig {
            containerNode: HTMLElement 渲染的根节点的容器,默认是body
        }
    */
    public setConfig(config: IConfig): void
```
</p>


<p>
（2）：Modal.props (模态框组件的可传参数 Transmissible parameters of modal components)

``` typescript

    /**
     * @description modal是否可见
     * @defaultValue false
     */
    visible: boolean 

    /**
     * @description modal头部是否可见
     * @defaultValue true
     */
    header: boolean

    /**
     * @description modal标题
     */
    title: string | JSX.Element

    /**
     * @description 确认按钮的回调事件
     */
    onOk(): void

    /**
     * @description 取消按钮的回调事件
     */
    onCancel(): void

    /**
     * @description 确认按钮的文字
     */
    okText: string | JSX.Element

    /**
     * @description 取消按钮的文字
     */
    cancelText: string | JSX.Element

    /**
     * @description 弹窗主体的行内样式
     */
    bodyStyle: CSSStyleDeclaration 

    /**
     * @description 弹窗主体额外的类名
     */
    className: string | JSX.Element
 
    /**
     * @description 是否出现底层阴影
     * @defaultValue true
     */
    mask: boolean

    /**
     * @description 弹窗是否可拖动
     * @defaultValue true
     */
    draggable: boolean

    /**
     * @description 是否支持键盘 esc 关闭和 回车键 确认
     * @defaultValue true
     */
    keyboard: boolean

    /**
     * @description modal层级，多层弹窗或method调用时不建议使用 Not recommended!
     */
    zIndex: number
 
    /**
     * @description 弹窗关闭的回调 Callback of modal close
     */
    afterClose(): void
    
    /**
     * @description 弹窗初始宽度 default width
     * @defaultValue 400
     */
    width: number | % | number + px

    /**
     * @description 弹窗初始高度 default height
     * @defaultValue 180
     */
    height: number | % | number + px

    

```
</p>

