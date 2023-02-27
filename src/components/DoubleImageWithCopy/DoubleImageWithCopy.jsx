import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ns = `double-image-with-copy`;

const DoubleImageWithCopy = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const {
		copyLeft,
		copyRight,
		headlineLeft,
		headlineRight,
		imageLeft,
		imageRight,
		imageLeftMobile,
		imageRightMobile,
	} = props;

	const imageSourceLeft = getImage(imageLeft.localFile);
	const imageSourceRight = getImage(imageRight.localFile);
	const imageSourceLeftMobile = imageLeftMobile ? getImage(imageLeftMobile.localFile) : undefined;
	const imageSourceRightMobile = imageRightMobile ? getImage(imageRightMobile.localFile) : undefined;

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

	return (
		<div className={rootClassnames}>
			<div className={'container pb-120 md:pb-300'}>
				<div className={'grid grid-cols-9 md:grid-cols-12 gap-y-80 md:gap-y-0 gap-x-15 md:gap-x-30'}>
					<div className={'col-span-9 md:col-span-5 md:col-start-2'}>
						{headlineLeft && (
							<h3 className={'typo-subhead-02 text-black pb-30 md:pb-45'}>
								{headlineLeft}
							</h3>
						)}
						{(isMobile && imageSourceLeftMobile) ? (
							<GatsbyImage
								className={'image'}
								image={imageSourceLeftMobile}
								alt={imageLeftMobile.altText}
							/>
						) : (
							<GatsbyImage
								className={'image'}
								image={imageSourceLeft}
								alt={imageLeft.altText}
							/>
						)}
						{copyLeft && (
							<div
								className={'text-black typo-medium-body-light pt-40 md:pt-65'}
								dangerouslySetInnerHTML={{ __html: copyLeft }}
							/>
						)}
					</div>
					<div className={'col-span-9 md:col-span-5'}>
						{headlineRight && (
							<h3 className={'typo-subhead-02 text-black pb-30 md:pb-45'}>
								{headlineRight}
							</h3>
						)}
						{(isMobile && imageSourceRightMobile) ? (
							<GatsbyImage
								objectFit={'contain'}
								className={'image'}
								image={imageSourceRightMobile}
								alt={imageRightMobile.altText}
							/>
						) : (
							<GatsbyImage
								objectFit={'contain'}
								className={'image'}
								image={imageSourceRight}
								alt={imageRight.altText}
							/>
						)}
						{copyRight && (
							<div
								className={'text-black typo-medium-body-light pt-40 md:pt-65'}
								dangerouslySetInnerHTML={{ __html: copyRight }}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoubleImageWithCopy;

export const query = graphql`
	fragment DoubleImageWithCopy on WpPage_Pagecomponents_PageComponents_DoubleImageWithCopy {
		copyLeft
		copyRight
		anchor
		headlineLeft
		fieldGroupName
		headlineRight
		imageLeft {
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
		imageLeftMobile {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 768
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		imageRightMobile {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 768
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		imageRight {
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
