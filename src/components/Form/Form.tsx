import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces/car.interface";
import {useDispatch} from "react-redux";
import {addItem} from "../../store/slices/car.slice";
import {useAppSelector} from "../../hooks";

const Form = () => {
    const {items} = useAppSelector(state => state.car);

    const {handleSubmit, register, reset} = useForm<ICar>();
    const dispatch = useDispatch();

    const carId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const submit: SubmitHandler<ICar> = (car) => {
        dispatch(addItem({car}))
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'string'} {...register('someString')}/>
                <button>Save</button>
            </form>
        </div>
    );
};

export {Form};