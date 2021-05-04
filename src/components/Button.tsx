import * as React from 'react';
import classNames from 'classnames';
import './button.less';

declare type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';

interface IExtendButtonProps{
    btnType?: ButtonType
}

type IButtonProps = IExtendButtonProps & React.ButtonHTMLAttributes<HTMLElement>;

class Button extends React.Component<IButtonProps> {
    render(){
        const { disabled=false, onClick, className='', children, btnType, ...otherProps } = this.props;
        return <button
            className={classNames('modal-button',className,btnType)}
            onClick={onClick} 
            disabled={disabled}
            {...otherProps}
        >
            <span>{ children }</span>
        </button>
    }
}

export default Button;