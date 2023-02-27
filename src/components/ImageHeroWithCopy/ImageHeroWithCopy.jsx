import React, {
	useEffect, useState, useRef, createRef
} from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FullArrow from '../../icons/FullArrow';
import Logo from '../../icons/Logo';
import logoGenomatica from '../../assets/images/logo-genomatica.png';

gsap.registerPlugin(ScrollTrigger);

const ns = `image-hero-with-copy`;

const ImageHeroWithCopy = props => {
	const {
		landscapeImage, landscapeLabel, portraitImage, portraitLabel, copy,
	} = props;

	const pinRef = createRef();
	const copyRef = createRef();
	const sT = useRef(false);

	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		setMobile(window.innerWidth < 1024);
		window.addEventListener('resize', () => {
			setMobile(window.innerWidth < 1024);
		});
		return () => {
			window.removeEventListener('resize', () => {});
		};
	}, []);

	useEffect(() => {
		const getScrollHeight = () => {
			if (!copyRef.current) return 0;
			const distance = (copyRef.current.offsetHeight / 2)
				+ (pinRef.current.offsetHeight * 1.25)
				+ 42;
			return distance;
		};

		setTimeout(() => {
			if (isMobile) {
				sT.current && sT.current.kill();
				return;
			}
			if (!pinRef?.current) return;
			sT.current = ScrollTrigger.create({
				trigger: pinRef.current,
				start: 'center center',
				pin: pinRef.current,
				end: `+=${ getScrollHeight() }`,
				invalidateOnRefresh: true,
				anticipatePin: 1,
				pinSpacing: false,
			});
		}, 100);
	}, [pinRef, copyRef, isMobile]);

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div className={rootClassnames}>
			<div className={'container pt-70 lg:pt-80'}>
				<Logo className={`${ ns }__logo absolute -translate-y-1/2 z-10 h-auto`} />
				<FullArrow className={'w-full lg:w-7/12 h-auto -translate-x-1/2 lg:-translate-x-130'} />
				<p className={`${ ns }__by absolute w-full left-0 text-center`}>
					<span className={'uppercase mb-5'}>created by</span>
					<img src={logoGenomatica} className={'w-220 mx-auto'} alt={'Genomatica'} />
				</p>

				<div className={'lg:grid grid-cols-12 gap-30 mt-140 lg:-mt-100 xl:-mt-300'}>
					<figure className={`${ ns }__landscape relative col-span-7 col-start-5 lg:-mx-30`}>
						<GatsbyImage
							className={'-mr-30 lg:mx-0'}
							image={landscapeImage.localFile.childImageSharp.gatsbyImageData}
							alt={landscapeImage.altText}
						/>
						{landscapeLabel && (
							<figcaption className={'typo-small-body-regular absolute -right-15 bottom-0 pt-10 translate-y-full w-130 lg:right-0 lg:w-full lg:text-right'}>
								{landscapeLabel}
							</figcaption>
						)}
					</figure>
				</div>
				<div ref={pinRef} className={'lg:grid grid-cols-12 gap-30'}>
					<figure className={`${ ns }__portrait relative -my-50 col-span-4 col-start-2 lg:-mx-30 lg:-my-180`}>
						<GatsbyImage
							className={` -ml-30 lg:mx-0`}
							image={portraitImage.localFile.childImageSharp.gatsbyImageData}
							alt={portraitImage.altText}
						/>
						{portraitLabel && (
							<figcaption className={'typo-small-body-regular text-black absolute left-0 bottom-0 pt-10 translate-y-full w-130 lg:right-0 lg:w-full'}>
								{portraitLabel}
							</figcaption>
						)}
					</figure>
				</div>
			</div>
			<div className={'bg-white text-black pt-200 pb-80 lg:pt-275 lg:pb-200'}>
				<div className={`${ ns }__copy container typo-medium-body-light lg:grid grid-cols-12 gap-30`}>
					<div
						ref={copyRef}
						className={'col-span-4 col-start-7 lg:-mr-30'}
						dangerouslySetInnerHTML={{__html: copy}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageHeroWithCopy;

export const query = graphql`
	fragment ImageHeroWithCopy on WpPage_Pagecomponents_PageComponents_ImageHeroWithCopy {
		copy
		anchor
		fieldGroupName
		landscapeLabel
		portraitLabel
		portraitImage {
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
		landscapeImage {
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
	}
`;
