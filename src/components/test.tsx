import * as React from 'react';

import ModalMethods from './ModalMethod';
import { Modal } from './index'

class Button extends React.Component {


    componentDidMount(){
        
    }
    
    render(){
        return <button onClick={ ()=>{
           
                let modal = ModalMethods.showModal(<Modal
                    title='测试弹窗'
                    onOk={()=>{
                        modal.close();
                    }} 
                    onCancel={()=>{
                        modal.close()
                        let modal2 = ModalMethods.showModal(<Modal
                            onOk={()=>modal2.close()} 
                            onCancel={()=>{
                                console.log(modal2.modalId)
                                modal2.close()
                            }} 
                            visible={true}

                            >
                
                            </Modal>)
                    }} 
                    visible={true}
                        
                    >
        
                    </Modal>)
        }
           
        }>fff</button>
    }
}

export default Button;