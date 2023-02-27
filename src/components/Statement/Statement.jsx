import React from 'react';
import classNames from 'classnames';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

import RenderStaticHTML from '../generic/RenderStaticHTML';

const ns = `statement`;

const Statement = props => {
	const { copy, icon } = props;
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div className={rootClassnames}>
			<div className={'container pt-145 md:pt-290 md:pb-220 pb-155'}>
				<div className={'flex flex-col items-center'}>
					<Icon icon={icon} />
					<RenderStaticHTML
						className={`custom-statement`}
						html={copy}
					/>

				</div>
			</div>
		</div>
	);
};

export default Statement;

const Icon = ({ icon }) => {
	return icon && (
		<div className={'w-150 h-150 mb-50'}>
			<GatsbyImage
				image={getImage(icon.localFile)}
				alt={icon.altText}
			/>
		</div>
	);
};

export const query = graphql`
	fragment Statement on WpPage_Pagecomponents_PageComponents_Statement {
		copy
		fieldGroupName
		anchor
		icon {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 1280
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	}
`;
