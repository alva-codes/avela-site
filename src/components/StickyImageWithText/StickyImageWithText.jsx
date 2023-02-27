import React, {
	createRef, useEffect, useRef, useState
} from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

gsap.registerPlugin(ScrollTrigger);

const ns = `sticky-image-with-text`;

const StickyImageWithText = props => {
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
			const distance = copyRef.current.offsetHeight - pinRef.current.offsetHeight;
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
	const { copy, headline, image } = props;
	return (
		<div className={rootClassnames}>
			<div className="container pb-100 lg:py-200">
				<div className={'lg:grid grid-cols-12 lg:gap-30'}>
					<figure
						className={`${ ns }__portrait relative col-span-4 -mx-30 col-start-2 mb-40 lg:mb-auto`}
					>
						<div ref={pinRef}>
							<GatsbyImage
								image={image.localFile.childImageSharp.gatsbyImageData}
								alt={image.altText}
							/>
						</div>
					</figure>
					<div className={'bg-white text-black col-span-4 col-start-7'}>
						<div className={`${ ns }__copy typo-medium-body-light`}>
							<div className={''}>
								{headline && (
									<h2 className={'pb-30 lg:pb-65'}>{headline}</h2>
								)}
								{copy && (
									<div
										ref={copyRef}
										dangerouslySetInnerHTML={{ __html: copy }}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StickyImageWithText;

export const query = graphql`
	fragment StickyImageWithText on WpPage_Pagecomponents_PageComponents_StickyImageWithText {
		fieldGroupName
		image {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 2580
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		headline
		copy
	}
`;
