import React, {FC} from 'react';
import {ICar} from "../../interfaces/car.interface";
import {useDispatch} from "react-redux";
import {changeStatus, delItem} from "../../store/slices/car.slice";

const Car:FC<{car:ICar}> = ({car}) => {
    const {someString, id, status} = car;
    const dispatch = useDispatch();
    console.log(car)

    return (
        <div>
            <input type="checkbox" onChange={() => dispatch(changeStatus({car}))}/>
            <span className={status ? 'checked' : ''}>{someString}</span>
            <button onClick={() => dispatch(delItem({id}))}>Delete</button>
        </div>
    );
};

export {Car};