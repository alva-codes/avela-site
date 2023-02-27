import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useIsMobile } from '../../utils/hooks';

import LinkedIn from '../../icons/LinkedIn';
import Link from '../generic/Link';
import HorizontalScroll from '../generic/horizontalScroll/HorizontalScroll';

const ns = `team-slider`;

const TeamSlider = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});
	const { mainLabel, slides } = props;
	const isMobile = useIsMobile(true, 'lg');

	return (
		<div className={`${ rootClassnames } pt-30 lg:pt-80 pb-120 lg:pb-180`}>
			<div className={'container px-0 lg:grid grid-cols-12'}>
				{slides?.length && (
					<HorizontalScroll
						title={mainLabel}
						extendLastSlide={1 / slides.length}
						extendScroll={isMobile ? 0 : 30}
						className={'col-span-10 col-start-2'}
					>
						{ slides.map((slide, slideIdx) => {
							return (
								<TeamPlayer teamPlayer={slide} key={+slideIdx} />
							);
						}) }
					</HorizontalScroll>
				)}
			</div>
		</div>
	);
};

export default TeamSlider;

const TeamPlayer = ({teamPlayer}) => {
	return (
		<div className={'team-player-card container relative md:flex md:flex-col'}>
			<h2 className={'typo-horizontal-slider-heading mb-30 xl:mb-50'}>{teamPlayer.name}</h2>
			<div className={'md:flex md:items-center md:ml-50 lg:ml-115 image-copy-wrapper'}>
				<div className={'md:flex md:flex-col md:mr-55 image-and-icon-wrapper'}>
					<GatsbyImage alt={teamPlayer.image.altText} image={teamPlayer.image.localFile.childImageSharp.gatsbyImageData} className={'team-player-image xl:w-330'} />
					{teamPlayer.linkedinProfile && (
						<Link href={teamPlayer.linkedinProfile} className={'linkedin-logo-wrapper'}>
							<LinkedIn />
						</Link>
					)}
				</div>
				<div className={'w-full'}>
					<h2 className={'typo-subhead-02 mb-25 '}>{teamPlayer.position}</h2>
					<p className={'typo-medium-body-light'}>{teamPlayer.copy}</p>
				</div>
			</div>
		</div>
	);
};

export const query = graphql`
	fragment TeamSlider on WpPage_Pagecomponents_PageComponents_TeamSlider {
		fieldGroupName
		anchor
		mainLabel
		slides {
			copy
			linkedinProfile
			name
			position
			image {
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
