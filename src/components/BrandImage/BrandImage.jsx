/* eslint-disable object-curly-newline */
/* eslint-disable template-curly-spacing */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Parallax from '../generic/Parallax';
import RedCircle from '../../icons/RedCircle';

const ns = `brand-image`;

const BrandImage = props => {
	const { backgroundLayer, frontLayer, mobileBackgroundLayer,
		mobileFrontLayer, variant, isRed = true } = props;
	const isV2 = variant === 'v2';

	const rootClassnames = classNames({
		[`${ns}`]: true,
		[`${ns}--v2`]: isV2,
	});

	const [isMobile, setMobile] = useState(null);
	useEffect(() => {
		setMobile(window.innerWidth < 1024);
		window.addEventListener('resize', () => {
			setMobile(window.innerWidth < 1024);
		});
		return () => {
			window.removeEventListener('resize', () => {});
		};
	}, []);

	const imageBGL = getImage(backgroundLayer.localFile);
	const imageBGMobile = getImage(mobileBackgroundLayer.localFile);
	const frontL = getImage(frontLayer.localFile);
	const frontLMobile = getImage(mobileFrontLayer.localFile);
	return (
		<div className={rootClassnames}>
			<div
				className={`relative overflow-hidden`}
			>
				<div className={'circle'}>
					<RedCircle isMobile={isMobile} isRed={isRed} />
				</div>
				<GatsbyImage
					className={'img'}
					image={isMobile ? imageBGMobile : imageBGL}
					alt={isMobile ? mobileBackgroundLayer.altText : backgroundLayer.altText}
				/>
				<Parallax className={'img img--absolute'} speed={-1.5}>
					<GatsbyImage
						className={'img img--absolute'}
						image={isMobile ? frontLMobile : frontL}
						alt={isMobile ? mobileFrontLayer.altText : frontLayer.altText}
					/>
				</Parallax>
			</div>
		</div>
	);
};

export default BrandImage;

export const query = graphql`
	fragment BrandImage on WpPage_Pagecomponents_PageComponents_BrandImage {
		fieldGroupName
		variant
		anchor
		backgroundLayer {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 3000
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		mobileBackgroundLayer {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 1500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		frontLayer {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 3000
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		mobileFrontLayer {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 1500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	}
`;
