import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Parallax from '../generic/Parallax';

const ns = `image-hero`;

const ImageHero = props => {
	const {
		headline,
		primaryImage,
		leftImage,
		rightImage,
	} = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div className={`${ rootClassnames } container mb-140 mt-170 md:mt-150`}>
			<div className={`-mx-10 md:mx-0 relative md:grid grid-cols-12 gap-30 items-center`}>
				{leftImage && (
					<Parallax
						className={`opacity-40 hidden md:block col-span-3`}
						speed={-1.5}
						disableMobile
					>
						<GatsbyImage
							image={leftImage.localFile.childImageSharp.gatsbyImageData}
							alt={leftImage.altText}
						/>
					</Parallax>
				)}
				{primaryImage && (
					<Parallax
						className={`opacity-70 col-span-4 col-start-5 md:-mx-20 lg:-mx-30`}
						speed={-0.75}
						disableMobile
					>
						<GatsbyImage
							image={primaryImage.localFile.childImageSharp.gatsbyImageData}
							alt={primaryImage.altText}
							objectFit={'cover'}
						/>
					</Parallax>

				)}

				{rightImage && (
					<Parallax
						className={`opacity-40 hidden md:block col-span-3 col-start-10`}
						speed={-1.5}
						disableMobile
					>
						<GatsbyImage
							image={rightImage.localFile.childImageSharp.gatsbyImageData}
							alt={rightImage.altText}
						/>
					</Parallax>
				)}
				<h1 className={`absolute typo-h1 text-white text-center text-40 md:text-60 lg:text-80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full`} dangerouslySetInnerHTML={{ __html: headline }} />
			</div>
		</div>
	);
};

export default ImageHero;

export const query = graphql`
	fragment ImageHero on WpPage_Pagecomponents_PageComponents_ImageHero {
		fieldGroupName
		headline
		anchor
		leftImage {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 2500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		primaryImage {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 2500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		rightImage {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 2500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	}
`;
