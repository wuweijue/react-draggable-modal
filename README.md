<h1><center>react-draggable-modal</center></h1>
<h2><center>一个基于react，支持typescript的模态框库</center></h2>
<h3>

![中文](https://raw.githubusercontent.com/wuweijue/img/master/中文.png) Chinese Introduction：
</h3>

<br>
<P>

![用途](https://raw.githubusercontent.com/wuweijue/img/master/用途.png) 
用途：当你在一个页面需要展示一些额外的内容或交互，但又不想通过切换路由或者影响原页面来实现，尝试使用这个模态框</P>
<br>
<P>

![基础](https://raw.githubusercontent.com/wuweijue/img/master/基础.png)
基础功能：在原页面上层展示一个可操作的弹出窗口，与antd等一般ui类库中的modal基本一致</P>
<br>
<P>

![进阶](https://raw.githubusercontent.com/wuweijue/img/master/进阶.png)
进阶功能：支持拖拽移动，宽高拉伸，全屏展示，多层弹窗和聚焦（类似于操作系统的窗口，多个窗口同时存在时，可以通过点击让下面的窗口出现在最上层）</P>
<br>
<P>

![特性](https://raw.githubusercontent.com/wuweijue/img/master/配置.png)
特性：模态框拥有入场和出场的动画，让画面过渡更加柔顺</P>
<br>
<P>

![使用指南](https://raw.githubusercontent.com/wuweijue/img/master/使用指南.png)
使用指南：（以下示例并非完整代码，仅作参考）</P>
<P>（0）下载组件：</P>

``` nodejs
    npm install react-draggable-modal

    yarn add react-draggable-modal
```

<P>（1）作为组件内嵌使用：</P>

``` typescript

	import { Modal } from 'react-draggable-modal';

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

<P>（2）通过modal的api调用：</P>

``` typescript

	import modal,{ Modal } from 'react-draggable-modal';

	class Business extends React.Components {

		quit(modalInstance){
			//...此处执行quit事件

            //执行完毕关闭弹窗
			modalInstance.close() //方法一：通过创建modal弹窗返回的实例的close方法 
            modal.hideModal(modalInstance.modalId) //方法二：通过modal的hideModal方法，参数为modalId
            modal.hideAllModal() //方法三：通过modal的hideAllModal方法强制关闭所有弹窗
		}

		querySave(){
			// 此处展示弹窗并返回一个id值，用于关闭弹窗或是获取Modal的dom
			let modalInstance = modal.showModal(<Modal
				onOk={()=>this.save(modalInstance)}
				onCancel={()=>this.quit(modalInstance)}
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
<h3>API:</h3>
<p>
（1）：modal.method (当modal第一次被引用时会被挂载到window上，可以通过window.modal使用或查看api)

``` typescript
    /**
     * @description 在页面中展示一个弹窗
     * @param modal 弹窗组件
     * @returns IModal = {  
            DOM: HTMLElement 
            modalId: number
            close(): void
        }
     */

    public showModal(modal: JSX.Element): number

    /**
     * @description 关闭某个指定的弹窗
     * @param modalIndex 需要关闭的弹窗的id值
     */
    public hideModal(modalIndex: number): void 

    /**
     * @description 强制关闭所有弹窗和根节点
     */
    public hideAllModal(): void

    /**
    * @description 强制关闭所有弹窗和根节点
    * @params IConfig {
            containerNode: HTMLElement 渲染的根节点的容器,默认是body
        }
    */
    public setConfig(config: IConfig): void
```
</p>


<p>
（2）：Modal.props (模态框组件的可传参数)

``` typescript

    /**
     * @description 弹窗是否可见
     * @defaultValue false
     */
    visible: boolean 

    /**
     * @description 弹窗头部是否可见
     * @defaultValue true
     */
    header: boolean

    /**
     * @description 弹窗层级，多层弹窗或method调用时不建议使用
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
     * @description 弹窗层级，多层弹窗或method调用时不建议使用
     */
    zIndex: number
 
    /**
     * @description 弹窗关闭的回调
     */
    afterClose(): void
    
    /**
     * @description 弹窗初始宽度
     * @defaultValue 400
     */
    width: number | % | number + px

    /**
     * @description 弹窗初始高度
     * @defaultValue 180
     */
    height: number | % | number + px

    

```
</p>

