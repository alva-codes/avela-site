import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Parallax from '../generic/Parallax';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';
import SingleArrow from '../../icons/SingleArrow';
import ChemistryLines from '../../icons/ChemistryLines';
import Fade from '../generic/Fade';

const ns = `intro-with-image`;

const IntroWithImage = props => {
	const {
		headline, infoHeadline, infoCopy, image,
		notOverlappingWithNextSection, copy,
	} = props;
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div
			className={` ${ rootClassnames } container md:grid grid-cols-12 gap-30 items-start ${ notOverlappingWithNextSection ? 'mb-240' : 'mb-350' }`}
		>
			<div className={'col-start-2 col-span-8 lg:col-span-5 lg:col-start-2 order-1 mb-25 xl:mb-35'}>
				<Fade threshold={0.3}>
					<h2
						className={`typo-subhead-02 mb-40`}
						dangerouslySetInnerHTML={{ __html: headline }}
					/>
				</Fade>
				<Fade threshold={0.3} delay={500}>
					<RenderStaticHTML html={copy} className={`typo-medium-body-light `} />
				</Fade>
			</div>

			<div className={`col-span-6 col-start-7 order-3 lg:grid grid-cols-6 gap-30 items-center mb-150 md:mb-0`}>
				{!notOverlappingWithNextSection && (
					<ChemistryLines className={`mb-30 lg:mb-50 col-span-4 col-start-2 translate-x-90 lg:translate-x-0`} />
				)}

				<h3 className={` mb-15 col-span-4 ${ notOverlappingWithNextSection ? 'typo-sh2' : 'typo-medium-body-semibold xl:col-span-2 col-start-1' }`}>
					<Fade threshold={0.4} delay={500}>{infoHeadline}</Fade>
				</h3>

				<div className={`col-span-4 col-start-1`}>
					<Fade threshold={0.4} delay={800}>
						<div className={'w-full typo-medium-body-semibold font-light'} dangerouslySetInnerHTML={{ __html: infoCopy }} />
					</Fade>
				</div>
			</div>

			<Parallax
				className={`relative col-start-2 col-span-4 md:-mx-30 order-2 md:mt-80 lg:mt-120`}
				speed={-0.7}
			>
				<SingleArrow
					className={`absolute -top-100 xl:-top-150 z-10 w-9/12 lg:left-30`}
					noFill
					isRed
				/>
				{image && (
					<Fade threshold={0.4} delay={1100}>
						<GatsbyImage
							image={image.localFile.childImageSharp.gatsbyImageData}
							alt={image.altText}
							objectFit={'cover'}
							className={``}
						/>
					</Fade>
				)}
			</Parallax>
		</div>
	);
};

export default IntroWithImage;

export const query = graphql`
	fragment IntroWithImage on WpPage_Pagecomponents_PageComponents_IntroWithImage {
		fieldGroupName
		anchor
		notOverlappingWithNextSection
		headline
		copy
		infoHeadline
		infoCopy
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
`;
