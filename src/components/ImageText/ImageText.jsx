/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable template-curly-spacing */
import React from 'react';
import classNames from 'classnames';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { graphql } from 'gatsby';

const ns = `image-text`;

const ImageText = props => {
	const { items } = props;

	const rootClassnames = classNames({
		[`${ns}`]: true,
	});

	const switchSlides = switchSld => {
		const sliderOrder = {
			defaultOne: {
				image: 'md:col-start-7 md:col-span-6',
				customText: 'md:row-start-1  md:col-start-2 md:col-span-4',
			},
			variation: {
				image: 'md:col-start-1 md:col-span-6',
				customText: 'md:col-start-8 md:col-span-4',
			},
		};
		return switchSld ? sliderOrder.variation : sliderOrder.defaultOne;
	};

	return (
		<div className={rootClassnames}>
			<div className={'container pb-240 md:pb-300'}>
				{items &&
					items.map((element, index) => {
						const { switchSides, headline, copy, image } = element;
						const isLast = index + 1 === items.length;
						return (
							<div
								key={+index}
								className={`grid grid-cols-9 items-center md:grid-cols-12 gap-x-15 md:gap-x-30 ${
									isLast ? '' : 'pb-100 md:pb-30'
								}`}
							>
								<GatsbyImage
									className={`mb-50 md:mb-0 col-start-1 col-span-9 ${
										switchSlides(switchSides).image
									} image`}
									image={getImage(image.localFile)}
									alt={image.altText}
								/>
								<div
									className={`col-start-1 col-span-9 ${
										switchSlides(switchSides).customText
									}`}
								>
									<h2 className={'typo-subhead-02 text-black mb-25'}>
										{headline}
									</h2>
									<p className={'typo-medium-body-light text-black'}>{copy}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ImageText;

export const query = graphql`
	fragment ImageText on WpPage_Pagecomponents_PageComponents_ImageText {
		fieldGroupName
		anchor
		items {
			copy
			headline
			switchSides
			image {
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
