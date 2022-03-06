import React, {FC,} from 'react';
import {useAppSelector} from "../../hooks";
import {Car} from "../Car/Car";

const Cars: FC = () => {
    const {items} = useAppSelector(state => state.car);

    // const genId = (car)  => {
    //     return car.length > 0 ? Math.max(...car.map(item => item.id)) + 1 : 1;
    // }
    return (
        <div>
            {items.map(car => <Car key={car.id}  car={car}/>)}
        </div>
    );
};

export {Cars};