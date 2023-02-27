import React from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import HorizontalScroll from '../generic/horizontalScroll/HorizontalScroll';
import Fade from '../generic/Fade';

const ns = `claim-with-slider`;

const ClaimWithSlider = props => {
	const {
		copy,
		introductionLabel,
		slides,
		finalCopy,
	} = props;
	const rootClassnames = classNames({
		[`${ ns }`]: true,
		'bg-white text-black': true,
	});

	const titles = slides.filter(e => { return e.fact !== undefined; }).map(slide => {
		return (
			<p key={uniqueId(slide.fact)} className={` ${ ns }__fact typo-horizontal-slider-paragraph absolute z-10  pr-30 opacity-0 translate-y-10 tranition duration-1000 ease-out-expo`}>
				{slide.fact}
			</p>
		);
	});

	const endSlide = finalCopy && <p className={`${ ns }__final absolute w-full inset-0 opacity-0 flex items-center justify-center`}>{finalCopy}</p>;

	return (
		<div className={`${ rootClassnames } pb-120 lg:pb-190`}>
			<div className={'container lg:grid grid-cols-12'}>
				{ copy && <p className={'typo-medium-body-light text-center py-140 lg:pt-230 lg:col-span-6 lg:col-start-4'}><Fade>{copy}</Fade></p> }
			</div>

			<HorizontalScroll
				title={introductionLabel}
				fixedContent={[...titles, endSlide]}
				extendScroll={() => { return window.innerHeight; }}
				slidePositions={slides.reduce((prev, current, index) => {
					const newPrev = prev;
					const step = 1 / (slides.length + 2);
					const position = step * index;
					if (slides.length - 1 === index) {
						newPrev[index + 1] = step * (index + 1);
					}
					return {...newPrev, [index]: position};
				}, {})}
			>
				{slides.map(slide => {
					if (!slide.image) return null;
					return (
						<div key={uniqueId(slide.fact)} className={'container relative lg:px-75'}>
							<GatsbyImage
								image={slide.image.localFile.childImageSharp.gatsbyImageData}
								alt={slide.image.altText}
							/>
						</div>
					);
				})}
				{finalCopy
				&& (
					<div className={'container relative lg:px-75 flex justify-center items-center'} />
				)}

			</HorizontalScroll>
		</div>
	);
};

export default ClaimWithSlider;

export const query = graphql`
	fragment ClaimWithSlider on WpPage_Pagecomponents_PageComponents_ClaimWithSlider {
		copy
		fieldGroupName
		anchor
		finalCopy
		introductionLabel
		slides {
			fact
			image {
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
	}
`;
