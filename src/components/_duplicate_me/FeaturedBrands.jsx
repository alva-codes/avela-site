import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';

const ns = `featured-brands`;

const XXX = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return <div className={rootClassnames}>XXX</div>;
};

export default XXX;

export const query = graphql`
	fragment XXX on WpPage_Pagecomponents_PageComponents_XXX {
		fieldGroupName
		headline
		logos {
			optionalLink
			logoAsset {
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
	}
`;
