import React from 'react';
import cn from '../../libs/names';

import './input.css';
import './_required/input_required.css';

import './_size/input_size_s.css';
import './_size/input_size_m.css';
import './_size/input_size_l.css';
import './_size/input_size_xl.css';
import './_size/input_size_xxl.css';

const Input = (props) => {
    return (
        <div className={cn('input')({
                with: props.with,
                width: props.width,
                required: props.required,
                has: props.has
            })
        }>
            {
                props.with === 'add-ons' ?
                    (
                        <>
                            <div className={cn('input', 'addon')()}>Synchronize</div>
                            <input
                                value={props.value}
                                placeholder={props.placeholder}
                                className={cn('input', 'control')({
                                    width: props.width,
                                    required: props.required
                                })}
                            />
                            <div className={cn('input', 'addon')()}>minutes</div>
                        </>
                    )
                :
                    (
                        <>
                            <div className={cn('input', 'label')()}>{props.label}</div>
                            <input
                                value={props.value}
                                placeholder={props.placeholder}
                                className={cn('input', 'control')({
                                    width: props.width,
                                    required: props.required
                                })}
                            />
                        </>
                    )
            }
            {
                props.has === 'close' ? <div className={cn('input', 'close')()}></div> : null
            }
        </div>
    );
};

export default Input;
