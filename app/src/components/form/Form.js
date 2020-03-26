import React from 'react';
import cn from '../../libs/names/index.js';

import Button from '../AppButton/AppButton.js';

import './form.css';

import './_border/form_border_all.css';
import './_view/form_view_default.css';
import './__control/form__control.css';

import './__item/form__item.css';

import './__item/_border/form__item_border_bottom.css';
import './__item/_distribute/form__item_distribute_between.css';

import './__item/_indent-b/form__item_indent-b_s.css';
import './__item/_indent-b/form__item_indent-b_m.css';
import './__item/_indent-b/form__item_indent-b_l.css';
import './__item/_indent-b/form__item_indent-b_xl.css';
import './__item/_indent-b/form__item_indent-b_xxl.css';
import './__item/_indent-b/form__item_indent-b_xxxl.css';
import './__item/_indent-b/form__item_indent-b_xxxxl.css';

import Input from '../input/Input.js';

const Form = ({ items }) => {
    return (
        <form className={cn('form')()}>
            <Input placeholder='bemdev/aef' label='GitHub repository' width='full' required={true}/>
            <Input value='yarn start' label='Build command' width='full' has={'close'}/>
            <Input value='main' label='Main branch' width='full' has={'close'}/>
            <Input value={10} with={'add-ons'}/>
            <Button size='xl' view='active' text='Save settings' />
            <Button size='xl' text='Cancel settings' />
        </form>
    )
};

export default Form;
