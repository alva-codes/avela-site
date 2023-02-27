import React from 'react';
import classNames from 'classnames';
import { Link as GatsbyLink } from 'gatsby';

import SafeAnchor from '../SafeAnchor';

import { isExternalUrl } from '../../../utils';

const ns = `default-link`;

const Link = React.forwardRef(
	(
		{
			className,
			disabled,
			variant,
			to,
			href,
			sameTab,
			...props
		},
		ref
	) => {
		const rootClassnames = classNames({
			[`${ ns }`]: true,
			[`${ ns }--${ variant }`]: variant,
			[className]: className,
		});

		if (isExternalUrl(href || to)) {
			return (
				<SafeAnchor
					{...props} // eslint-disable-line
					disabled={disabled}
					href={href || to}
					ref={ref}
					target={sameTab ? '_self' : '_blank'}
					className={classNames(rootClassnames)}
				/>
			);
		}

		if (disabled) {
			props.tabIndex = -1; // eslint-disable-line
			props['aria-disabled'] = true; // eslint-disable-line
		}

		return (
			<GatsbyLink
				{...props} // eslint-disable-line
				disabled={disabled}
				to={to || href || '/'}
				ref={ref}
				className={rootClassnames}
			/>
		);
	}
);

Link.defaultProps = {
	disabled: false,
	sameTab: false,
};

export default Link;
