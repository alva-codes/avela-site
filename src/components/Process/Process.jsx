import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import uniqueId from 'uniqid';
import { GatsbyImage } from 'gatsby-plugin-image';
import HorizontalScroll from '../generic/horizontalScroll/HorizontalScroll';

const ns = `process`;

const Process = props => {
	const {
		label,
		headline,
		slides,
		finalHeadline,
		finalValue,
		finalCopy,
		finalImage,
	} = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const sliderHeadline = (
		<>
			<h2 className={`${ ns }__headline typo-horizontal-slider-heading z-10 pr-30 tranition duration-1000 ease-out-expo`}>
				{headline}
			</h2>
			{slides.map((slide, index) => {
				if (index >= slides.length - 1) return null;
				return (<span key={uniqueId('span hidden')} className={'hidden'} />);
			})}
		</>
	);

	const endSlide = (
		<div className={`${ ns }__final absolute z-20 py-80 md:py-200`}>
			{finalImage
			&& (
				<GatsbyImage
					className={'absolute inset-0'}
					image={finalImage.localFile.childImageSharp.gatsbyImageData}
					alt={finalImage.altText}
				/>
			)}
			<div className={`${ ns }__final__content container relative transition duration-1000 opacity-100 transform-gpu`}>
				{finalHeadline && (
					<h3 className={`${ ns }__headline typo-horizontal-slider-heading lg:text-60 text-center mx-auto w-240 md:w-auto md:px-30 mt-0 mb-80 lg:px-120 lg:mt-0 `}>
						{finalHeadline}
					</h3>
				)}
				{finalValue && (
					<span className={'typo-horizontal-slider-number block text-center'} dangerouslySetInnerHTML={{__html: finalValue}} />
				)}
				{finalCopy && (
					<p className={`${ ns }__final__copy typo-subhead-02 w-500 max-w-full mx-auto text-center`} dangerouslySetInnerHTML={{__html: finalCopy}} />
				)}
			</div>
		</div>
	);

	return (
		<div className={`${ rootClassnames } pt-220 -mt-300 lg:-mt-400 overflow-hidden`}>
			<div className={'container px-0 lg:grid grid-cols-12'}>
				<HorizontalScroll
					title={label}
					fixedContent={[sliderHeadline, endSlide]}
					className={'col-span-10 col-start-2 py-80 md:py-200'}
					extendScroll={() => { return window.innerHeight * 2; }}
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
					{slides.map((slide, index) => {
						return (
							<div key={uniqueId(slide.headline)} className={'container relative lg:px-75 '}>
								<div className={`py-40 pr-30 mt-140 ${ index < slides.length - 1 ? 'border-r border-faintRed' : '' } lg:py-50 lg:pr-80`}>
									<GatsbyImage
										className={`${ ns }__icon mb-30 w-50 h-50`}
										objectFit={'contain'}
										objectPosition={'top left'}
										image={slide.icon.localFile.childImageSharp.gatsbyImageData}
										alt={slide.icon.altText}
									/>
									{slide.headline && <h3 className={'typo-medium-body-semibold '}>{slide.headline}</h3>}
									{slide.copy && <p className={'typo-medium-body-light'}>{slide.copy}</p>}
								</div>
							</div>
						);
					})}
					{finalCopy
				&& (
					<div key={'finalCopy'} className={'container relative lg:px-75 flex justify-center items-center'} />
				)}
				</HorizontalScroll>
			</div>
		</div>
	);
};

export default Process;

export const query = graphql`
	fragment Process on WpPage_Pagecomponents_PageComponents_Process {
		fieldGroupName
		anchor
		finalCopy
		finalImage {
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
		finalHeadline
		finalValue
		headline
		label
		slides {
			copy
			headline
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
	}
`;
