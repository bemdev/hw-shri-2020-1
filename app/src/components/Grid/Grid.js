import * as React from 'react';

import './grid.css';
import './__fraction/grid__fraction.css';

const Grid = ({ cols, children }) => {
	return (
		<div className={`Grid grid_m-columns_${cols}`}>
			<div className='grid__fraction grid__fraction_position_center'>
				{children}
			</div>
		</div>
	);
};

export default Grid;
