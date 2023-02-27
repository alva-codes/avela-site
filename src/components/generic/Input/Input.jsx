import React from 'react';
import classNames from 'classnames';

const ns = `input`;

const Input = ({
	className,
	type = 'text',
	placeholder,
	name,
	id,
	required = false,
	onChange,
	error,
	value,
}) => {
	const rootClassnames = classNames({
		[`${ ns } ${ ns }--${ type }`]: true,
		'typo-formfield': true,
		error,
	});

	const handleChange = e => {
		if (e.target.value) {
			e.target.classList.add('has-text');
		} else {
			e.target.classList.remove('has-text');
		}
		onChange(e);
	};

	return (
		<div className={className}>
			<input
				className={rootClassnames}
				onChange={e => { handleChange(e); }}
				placeholder={placeholder}
				type={type}
				name={name}
				id={id}
				required={required}
				value={value}
				data-error={error}
			/>
			{error && (
				<span className={'typo-small-body-light block px-40 mt-5 text-primaryRed opacity-80'}>
					{error}
				</span>
			)}
		</div>
	);
};

export default Input;
