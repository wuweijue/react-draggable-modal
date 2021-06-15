import * as React from 'react';
import IModalStore from './store/ModalStore.d';

export interface IModalProps {

    store?: IModalStore

    visible?: boolean

    draggable?: boolean

    closable?: boolean

    mask?: boolean

    bodyStyle?: any 

    className?: string

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean

    afterClose?(): void

    onOk?(): void

    onCancel?(): void

}

export default class Modal extends React.Component<IModalProps>{
    render(): JSX.Element;
}