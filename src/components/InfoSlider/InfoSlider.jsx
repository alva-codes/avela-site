import React from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import HorizontalScroll from '../generic/horizontalScroll/HorizontalScroll';
import Fade from '../generic/Fade';

const ns = `info-slider`;

const InfoSlider = props => {
	const {
		headline,
		copy,
		slides,
		finalSlide,
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

	const endSlide = finalSlide && (
		<div className={`${ ns }__final absolute w-full inset-0 opacity-0 flex items-center justify-center`}>
			<div className={'text-center max-w-full'}>
				{finalSlide.imageLabel && (
					<h3 className={`${ ns }__image-label`}>
						{finalSlide.imageLabel}
					</h3>
				)}
				{finalSlide?.image && (
					<GatsbyImage
						className={`${ ns }__icon mt-10 mb-20 lg:mt-20 lg:mb-30 w-auto h-50 lg:h-100 max-w-full`}
						objectFit={'contain'}
						objectPosition={'center'}
						image={getImage(finalSlide.image.localFile)}
						alt={finalSlide.image.altText}
					/>
				)}
				<p
					className={'w-[46rem] max-w-full mx-auto typo-medium-body-regular-03'}
					dangerouslySetInnerHTML={{__html: finalSlide.copy}}
				/>
			</div>
		</div>
	);

	return (
		<div className={`${ rootClassnames } pt-60 pb-120 lg:py-190`}>
			<div className={'container lg:grid grid-cols-12'}>
				{ copy && <p className={'typo-medium-body-light text-center py-140 lg:pt-230 lg:col-span-6 lg:col-start-4'}><Fade>{copy}</Fade></p> }
				<div className={'col-span-10 col-start-2'}>
					<HorizontalScroll
						className={'pt-10'}
						title={headline}
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
							return (
								<div key={uniqueId(slide.fact)} className={'relative mr-80 lg:py-60 lg:ml-120'}>
									<h3 className={'typo-subhead-04 mb-20'}>{slide.headline}</h3>
									<p
										className={'typo-medium-body-regular-03'}
										dangerouslySetInnerHTML={{__html: slide.copy}}
									/>
								</div>
							);
						})}
						{finalSlide && (
							<div key={uniqueId('finalSlide')} className={'container relative flex justify-center items-center'} />
						)}
					</HorizontalScroll>

				</div>
			</div>
		</div>
	);
};

export default InfoSlider;

export const query = graphql`
	fragment InfoSlider on WpPage_Pagecomponents_PageComponents_InfoSlider {
		fieldGroupName
		headline
		slides {
			copy
			headline
		}
		finalSlide {
			imageLabel
			copy
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
