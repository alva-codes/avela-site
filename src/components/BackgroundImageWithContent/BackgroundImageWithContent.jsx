import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Fade from '../generic/Fade';

const ns = `background-image-with-content`;

const BackgroundImageWithContent = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});
	const {
		copy, imageLabel, backgroundImage, image,
	} = props;
	const imageFile = getImage(image.localFile);
	const backgroundFile = getImage(backgroundImage.localFile);
	return (
		<div className={rootClassnames}>
			<GatsbyImage className={'backgroundImage'} image={backgroundFile} alt={backgroundImage.altText} />
			<div className="py-100 lg:py-300">
				<Fade>
					<div className="container">
						<span>{imageLabel}</span>
						<GatsbyImage className={'logo'} image={imageFile} alt={image.altText} />
						<div dangerouslySetInnerHTML={{ __html: copy }} />
					</div>
				</Fade>
			</div>
		</div>
	);
};

export default BackgroundImageWithContent;

export const query = graphql`
	fragment BackgroundImageWithContent on WpPage_Pagecomponents_PageComponents_BackgroundImageWithContent {
		fieldGroupName
		backgroundImage {
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
		copy
		imageLabel
	}
`;
