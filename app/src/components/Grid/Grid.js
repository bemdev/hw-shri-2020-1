import * as React from 'react';

import './Grid.css';
import './__fraction/grid__fraction.css';

const Grid = ({ cols, children }) => {
    return (
        <div className={`Grid grid_m-columns_${cols}`}>
            { children }
        </div>
    )
};

export default Grid;

