/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import classNames from 'classnames';

import Link from '../Link';

const ns = `rte`;

/*
* parses & renders html string into dom nodes
* (WYSIWYG field type from Wordpress)
*/

const RenderStaticHTML = ({ html, className }) => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[className]: className,
	});

	if (!html) return null;

	const options = {
		replace: node => {
			const {
				name,
				children,
				attribs,
			} = node;

			// render Link component for a tags

			if (name === 'a') {
				/* eslint-disable */
				return (
					<Link {...attribs}>
						{domToReact(children, options)}
					</Link>
				);
				/* eslint-enable */
			}

			return false;
		},
	};

	const elements = parse(html, options);

	return (
		<div className={rootClassnames}>
			{elements}
		</div>
	);
};

export default RenderStaticHTML;
