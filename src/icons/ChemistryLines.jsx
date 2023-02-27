import React from 'react';

const ChemistryLines = props => {
	return (
		<svg
			viewBox={'0 0 450 205'}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={'M1 203.652L125 104.717'}
				stroke={'#444444'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
			/>
			<path
				d={'M258.736 203.652L379.924 107.283'}
				stroke={'#444444'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
			/>
			<path
				d={'M126 104.717L258 203.717'}
				stroke={'#444444'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
			/>
			<path
				d={'M381.363 107.528L448.002 153.332'}
				stroke={'#444444'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
			/>
			<path
				d={'M125.777 104.064V1'}
				stroke={'#444444'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
			/>
		</svg>
	);
};

export default ChemistryLines;
