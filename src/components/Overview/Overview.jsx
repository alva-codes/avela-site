import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { InView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../utils/hooks';
import AvelaLayer from '../../icons/AvelaLayer';
import RenderStaticHTML from '../generic/RenderStaticHTML';
import AvelaLayer2 from '../../icons/AvelaLayer2';
import Fade from '../generic/Fade';
import FullArrow from '../../icons/FullArrow';

gsap.registerPlugin(ScrollTrigger);

const ns = `overview`;

const Overview = props => {
	const {
		headline, copy, items, middleSection,
	} = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const logoRef = useRef();
	const movingWords = useRef();
	const isMobile = useIsMobile(true, 'lg');
	const isMobileSmall = useIsMobile(true, 'lgX');
	useEffect(() => {
		const moveLogo = () => {
			let transform = (
				logoRef?.current
					? (logoRef.current.getBoundingClientRect().top - window.innerHeight) * (500 / window.innerWidth)
					: 0);
			transform = Math.round(transform);
			if (logoRef?.current?.children) {
				if (!isMobileSmall) transform = 0;
				logoRef.current.style = `${ transform }px`;
				logoRef.current.children[0].style.transform = `translateX(${ transform }px) translateZ(0)`;
				logoRef.current.children[1].style.transform = `translateX(${ transform }px) translateZ(0)`;
			}
		};

		window.addEventListener(
			'scroll',
			moveLogo,
			{ passive: true }
		);
		return () => {
			window.removeEventListener('scroll', moveLogo);
		};
	}, [isMobileSmall]);

	// change marquee speed through this var below:
	const pxPerSecond = 100;
	const pxPerSecondMobile = 50;

	useEffect(() => {
		if (!movingWords.current) return;
		const animated = movingWords.current;
		gsap.to(animated, {
			x: `-=${ animated.clientWidth }`,
			repeat: -1,
			ease: 'none',
			delay: 0,
			repeatDelay: 0,
			animationDelay: 0,
			transitionDelay: 0,
			invalidateOnRefresh: true,
			duration: () => {
				return isMobile
					? animated.clientWidth / pxPerSecondMobile
					: animated.clientWidth / pxPerSecond;
			},
			modifiers: {
				x: gsap.utils.unitize(x => {
					const mod = (animated.clientWidth / 3) + 2;
					const modulated = parseInt(parseFloat(x) % mod, 10);
					// Log wrapped numbers for debugging:
					// if (modulated > -2) console.log(modulated);
					// if (modulated < (mod * -1) + 2) console.log(modulated);
					const offset = isMobile
						? 0
						: window.innerWidth / 2;
					return modulated - offset;
				}),
			},
		});
	}, [movingWords, isMobile]);

	return (
		<div className={rootClassnames}>
			<div className={'container pt-160 lg:pt-205'}>
				<div
					className={
						'grid grid-cols-9 lg:grid-cols-12 gap-x-15 lg:gap-x-30 relative'
					}
				>
					<div className={'col-span-full lg:col-start-2 lg:col-span-5 z-20'}>
						<Fade threshold={0.3}>
							<RenderStaticHTML
								className={'overview-headline mb-60 col-span-full'}
								html={headline}
							/>
						</Fade>
						<Fade threshold={0.5} delay={500}>
							<p
								className={
									'typo-medium-body-light mb-40 lg:mb-100 col-span-full'
								}
							>
								{copy}
							</p>
						</Fade>
					</div>
				</div>
			</div>

			{middleSection && (
				<div className={'container relative top-0 pb-350'}>
					<FullArrow
						customID={'overview-middle'}
						className={
							'absolute w-full lg:w-7/12 h-auto -translate-x-1/2 lg:-translate-x-210'
						}
					/>
					<div className={'lg:grid grid-cols-12 gap-x-30 relative'}>
						<div className={'col-span-6 col-start-7 pt-1'}>
							<Fade threshold={0.3}>
								<h2 className={`${ ns }__middle__headline mt-180 mb-40 lg:mt-80`} dangerouslySetInnerHTML={{__html: middleSection.headline}} />
							</Fade>
							<Fade threshold={0.8} delay={500}>
								<RenderStaticHTML
									className={'typo-medium-body-light mb-60 lg:mb-100'}
									html={middleSection.copy}
								/>
							</Fade>
							{middleSection.movingWords?.length && (
								<div className={'whitespace-nowrap mb-60 lg:mb-80'}>
									<div
										className={`${ ns }__middle__moving-words inline-block translate-x-[-50vw]`}
										ref={movingWords}
									>
										{[
											...middleSection.movingWords,
											...middleSection.movingWords,
											...middleSection.movingWords,
										].map(({ word }) => {
											return (
												<span key={uniqueId('avela')}>
													{/* eslint-disable-next-line no-irregular-whitespace */}
													{`${ word } `}
												</span>
											);
										})}
									</div>
								</div>
							)}
							<Fade threshold={0.3} delay={200}>
								<RenderStaticHTML
									className={'typo-medium-body-light'}
									html={middleSection.finalCopy}
								/>
							</Fade>
						</div>
					</div>
				</div>
			)}

			<div ref={logoRef} className={'avela-logo col-span-full'}>
				<AvelaLayer />
				<AvelaLayer2 />
			</div>
			{/* Close the grid and container */}
			<InView triggerOnce threshold={0.7}>
				{({ inView, ref }) => {
					return (
						<div
							className={
								'grid grid-cols-9 lg:grid-cols-12 gap-x-15 lg:gap-x-30'
							}
							ref={ref}
						>
							<div
								className={`card-overview-wrapper ${
									inView && 'active-card'
								} col-span-full lg:pt-275 pt-275 px-30 md:px-0`}
							>
								<div
									className={
										'grid grid-cols-9 lg:grid-cols-12 gap-x-15 lg:gap-x-30'
									}
								>
									<div
										className={
											'col-start-3 col-span-6 lg:col-start-2 lg:col-span-7  items-wrapper'
										}
									>
										{items.map((item, index) => {
											return (
												<CardItem key={uniqueId('card item')} item={item} />
											);
										})}
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</InView>
		</div>
	);
};

export default Overview;

const CardItem = ({
	item: {
		icon: { localFile, altText },
		headline,
		copy,
	},
}) => {
	return (
		<div className={'item-wrapper lg:mr-35'} key={uniqueId('card item')}>
			<GatsbyImage
				className={'card-image-icon'}
				image={getImage(localFile)}
				alt={altText}
			/>
			<div className={'z-15 relative mb-130 lg:mb-70'}>
				<h3 className={'mb-40 item-header'}>{headline}</h3>
				<p className={'typo-medium-body-light'}>{copy}</p>
			</div>
		</div>
	);
};

export const query = graphql`
	fragment Overview on WpPage_Pagecomponents_PageComponents_Overview {
		copy
		fieldGroupName
		headline
		middleSection {
			headline
			copy
			movingWords {
				word
			}
			finalCopy
		}
		anchor
		items {
			copy
			fieldGroupName
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
