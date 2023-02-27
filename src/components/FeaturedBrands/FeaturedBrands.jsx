import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import { graphql } from 'gatsby';

import Link from '../generic/Link';

const ns = `featured-brands`;

const FeaturedBrands = props => {
	const { headline, logos: [logo1, logo2] } = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const imageLogoImage1 = logo1 ? getImage(logo1.logoAsset.localFile) : null;
	const imageLogoImage2 = logo2 ? getImage(logo2.logoAsset.localFile) : null;

	return (
		<div className={rootClassnames}>
			<div className={'container pb-275 md:pb-200'}>
				<div className={'grid grid-cols-9 items-center md:grid-cols-12 gap-x-15 md:gap-x-30'}>
					<div className={'md:col-start-2 col-start-1 col-span-4'}>
						<h2 className={'typo-subhead-02 text-black'}>
							{headline}
						</h2>
					</div>
					{imageLogoImage1 && (
						<LinkAndLogoWrapper optionalLink={logo1.optionalLink} className={'wrapper-image-1 self-end md:self-center md:col-start-7 md:col-span-2 col-start-5 col-span-5'}>
							<GatsbyImage
								image={imageLogoImage1}
								alt={logo1.logoAsset.altText}
							/>
						</LinkAndLogoWrapper>
					)}
					{imageLogoImage2 && (
						<LinkAndLogoWrapper optionalLink={logo2.optionalLink} className={'wrapper-image-2 md:self-center md:col-start-10 col-start-5 md:col-span-2 col-span-5 mt-30 md:mt-0'}>
							<GatsbyImage
								image={imageLogoImage2}
								alt={logo2.logoAsset.altText}
							/>
						</LinkAndLogoWrapper>
					)}
				</div>
			</div>

		</div>
	);
};

const LinkAndLogoWrapper = ({optionalLink, className, children}) => {
	if (!optionalLink) {
		return (
			<div className={className}>
				{children}
			</div>
		);
	}

	return (
		<Link className={className} href={optionalLink}>
			{children}
		</Link>
	);
};

export default FeaturedBrands;

export const query = graphql`
	fragment FeaturedBrands on WpPage_Pagecomponents_PageComponents_FeaturedBrands {
		fieldGroupName
		headline
		anchor
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
