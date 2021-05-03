import * as React from 'react';

import ModalMethods from './ModalMethod';
import { Modal } from './index'

class Button extends React.Component {


    componentDidMount(){
        
    }
    render(){
        return <button onClick={ ()=>{
            [0,1].forEach(item=>{
                let modal = ModalMethods.showModal(<Modal
                    onOk={()=>modal.close()} 
                    onCancel={()=>modal.close()} 
                    visible={true}
                        footer={<div></div>}
                    >
        
                    </Modal>)
            })
            


        }
           
        }>fff</button>
    }
}

export default Button;