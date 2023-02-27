import React from 'react';

const X = props => {
	return (
		<svg
			viewBox={`0 0 12 12`}
			width={15}
			height={15}
			fill={`none`}
			xmlns={`http://www.w3.org/2000/svg`}
			{...props}
		>
			<path
				fillRule={`evenodd`}
				clipRule={`evenodd`}
				d={`M.72 10.22a.75.75 0 001.06 1.061l3.16-3.16a1.5 1.5 0 012.121 0l3.16 3.16a.75.75 0 101.06-1.061l-3.16-3.16a1.5 1.5 0 010-2.12l3.16-3.16A.75.75 0 1010.22.718l-3.16 3.16a1.5 1.5 0 01-2.12 0L1.78.719A.75.75 0 00.72 1.78l3.159 3.16a1.5 1.5 0 010 2.12L.72 10.22z`}
				fill={`currentColor`}
			/>
		</svg>
	);
};

export default X;
