import React, { useEffect, createRef } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GatsbyImage } from 'gatsby-plugin-image';

gsap.registerPlugin(ScrollTrigger);

const ns = `hero-grid`;

const HeroGrid = props => {
	const {
		headline,
		subline,
		images,
		subsubline,
	} = props;

	const chunkArray = (arr, size) => {
		return Array
			.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
				return arr.slice(i * size, i * size + size);
			});
	};
	const chunkedImages = chunkArray(images, 4);

	useEffect(() => {

	}, []);

	const lineRefs = [createRef(), createRef(), createRef(), createRef(), createRef()];

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: lineRefs[0].current.parentElement,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			},
		})
			.fromTo(
				lineRefs[0].current,
				{ x: '20vh' },
				{ x: '-20vh' },

				0
			)
			.fromTo(
				lineRefs[1].current,
				{ x: '-20vh' },
				{ x: '20vh' },

				0
			)
			.fromTo(
				lineRefs[2].current,
				{ x: '20vh' },
				{ x: '-20vh' },

				0
			)
			.fromTo(
				lineRefs[3].current,
				{ x: '-20vh' },
				{ x: '20vh' },

				0
			)
			.fromTo(
				lineRefs[4].current,
				{ x: '20vh' },
				{ x: '-20vh' },

				0
			);
	}, [lineRefs]);

	const rootClassnames = classNames({
		[`${ ns } `]: true,
	});

	return (
		<div className={`${ rootClassnames } relative -mt-120`}>
			<div className={`${ ns }__background`}>
				{[...chunkedImages, chunkedImages[0]].map((chunk, index) => {
					return (
						<div key={uniqueId('chunked image')} ref={lineRefs[index]} className={`grid gap-50 lg:gap-80 grid-cols-8 opacity-70`}>
							{[...chunk, ...chunk].map(img => {
								return (
									<GatsbyImage
										key={uniqueId(img.image.altText)}
										image={img.image.localFile.childImageSharp.gatsbyImageData}
										alt={img.image.altText}
									/>
								);
							})}
						</div>
					);
				})}
			</div>

			<div className={`${ ns }__content absolute w-full top-1/3`}>
				<div className={'container text-center '}>
					<h1 className={'typo-h1 font-light'}>{headline}</h1>
					{ subline
						&& <p className={'typo-subhead-03 font-light mx-auto'}>{subline}</p>}
					{subsubline && <p className={'subsubline'}>{subsubline}</p>}
				</div>

			</div>

		</div>
	);
};

HeroGrid.defaultProps = {};

export const query = graphql`
	fragment HeroGrid on WpPage_Pagecomponents_PageComponents_HeroGrid {
		fieldGroupName
		anchor
		headline
		subline
		subsubline
		images {
			image {
				altText
				sourceUrl
				localFile {
					childImageSharp {
						gatsbyImageData(
							width: 1000
							placeholder: BLURRED
							formats: [AUTO, WEBP, AVIF]
						)
					}
				}
			}
		}
	}
`;

export default HeroGrid;
