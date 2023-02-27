import React, { forwardRef } from 'react';
import classNames from 'classnames';

const ns = `select`;

const Select = forwardRef(({
	className,
	required = false,
	disabled,
	onChange,
	options,
	selectValue,
}, ref) => {
	const rootClassnames = classNames(className, {
		[`${ ns }`]: true,
	});

	return (
		<div className={rootClassnames}>
			<select
				onChange={onChange}
				required={required}
				value={selectValue}
				ref={ref}
				disabled={disabled}
			>
				{options.map(({ label, value }) => {
					return (
						<option
							value={value}
							key={value}
						>
							{label}
						</option>
					);
				})}
			</select>
			<svg width={'18'} height={'10'} viewBox={'0 0 18 10'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
				<path d={'M1 1L9 9L17 1'} stroke={'#003C77'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
			</svg>
		</div>
	);
});

export default Select;
