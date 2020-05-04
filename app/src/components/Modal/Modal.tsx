import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import cn from '../../libs/names/index';

import './modal.css';

export interface ModalProps {
    active: boolean;
    content: string;
    closeModal(): void;
}

const Modal: React.FC<ModalProps> = ({ active, content, closeModal }) => {
    const blockName = cn('modal')({ active: active });

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if ((e.target as Element).classList[0] === 'modal') {
            closeModal();
        }
    };

    return (
        <div onClick={handleClick} className={`${blockName}`}>
            <div className={cn('modal', 'content')()}>{content}</div>
        </div>
    );
};

const mapStateToProps = (state: any = []) => {
    return {
        content: state.modal.content,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        closeModal: () =>
            dispatch({
                type: 'MODAL_TOGGLE',
                payload: {
                    active: false,
                    content: null,
                },
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
