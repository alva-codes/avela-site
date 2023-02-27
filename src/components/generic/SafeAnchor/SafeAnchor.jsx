import React from 'react';

function isTrivialHref(href) {
	return !href || href.trim() === '#';
}

const SafeAnchor = React.forwardRef(
	(
		{
			as: Component = 'a',
			disabled,
			onKeyDown,
			...props
		},
		ref
	) => {
		const handleClick = event => {
			const { href, onClick } = props;

			if (disabled || isTrivialHref(href)) {
				event.preventDefault();
			}

			if (disabled) {
				event.stopPropagation();
				return;
			}

			if (onClick) {
				onClick(event);
			}
		};

		if (isTrivialHref(props.href)) {
			props.role = props.role || 'button'; // eslint-disable-line
			// we want to make sure there is a href attribute on the node
			// otherwise, the cursor incorrectly styled (except with role='button')
			props.href = props.href || '#'; // eslint-disable-line
		}

		if (disabled) {
			props.tabIndex = -1; // eslint-disable-line
			props['aria-disabled'] = true; // eslint-disable-line
		}

		return (
			<Component
				ref={ref}
				{...props} // eslint-disable-line
				rel={'noreferrer'}
				onClick={handleClick}
			/>
		);
	}
);

export default SafeAnchor;
