import React, {FC} from 'react';
import {Cars, Form} from "./components";

const App: FC = () => {
    return (
        <div>
            <Form/>
            <hr/>
            <Cars/>
        </div>
    );
};

export default App;