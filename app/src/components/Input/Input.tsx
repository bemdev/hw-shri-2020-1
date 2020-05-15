import React, { useRef } from 'react';
import cn from '../../libs/names';

import './input.css';

export interface InputProps {
    addons?: boolean;
    width?: 'full';
    required?: boolean;
    has?(ref: RefObject<HTMLInputElement>): void;
    value: string;
    placeholder: string;
    label?: string;
    name?: string;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({
    addons,
    width,
    required,
    has,
    value,
    placeholder,
    label,
    name,
    onChange,
}) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null);

    return (
        <div
            className={cn('input')({
                addons: addons,
                width: width,
                required: required,
            })}>
            {addons ? (
                <>
                    <div className={cn('input', 'addon')()}>Synchronize</div>
                    <input
                        ref={inputRef}
                        onChange={onChange}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        className={cn('input', 'control')({
                            width: width,
                            required: required,
                        })}
                    />
                    <div className={cn('input', 'addon')()}>minutes</div>
                </>
            ) : (
                <>
                    <div className={cn('input', 'label')()}>{label}</div>
                    <input
                        onChange={onChange}
                        ref={inputRef}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        className={cn('input', 'control')({
                            width: width,
                            required: required,
                        })}
                    />
                </>
            )}
            {has && value !== '' ? (
                <div
                    onClick={() => {
                        has(inputRef);
                    }}
                    className={cn('input', 'close')()}
                />
            ) : null}
        </div>
    );
};

export default Input;
