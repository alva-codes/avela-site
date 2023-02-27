/* eslint-disable template-curly-spacing */
import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import BrandImage from '../BrandImage/BrandImage';
import Link from '../generic/Link';
import File from '../../icons/File';
import Fade from '../generic/Fade';

const ns = `brand-image-with-downloads`;

const BrandImageWithDownloads = props => {
	const rootClassnames = classNames({
		[`${ns}`]: true,
	});
	const {
		downloads, headline, anchor, subheadline, copy, ...otherProps
	} = props;
	return (
		<div className={`${rootClassnames} pb-120`}>
			<BrandImage {...otherProps} isRed={false} />
			{/* eslint-disable-next-line react/no-unknown-property */}
			<div anchor={anchor} style={{ visibility: 'hidden' }} />
			<div className={'container relative py-120'}>
				<div className={'grid grid-cols-9 gap-x-15 lg:gap-x-30'}>
					<div className={'lg:col-start-2 col-span-9 mb-80'}>
						<Fade threshold={0.3}><h2 dangerouslySetInnerHTML={{ __html: headline }} /></Fade>
					</div>
					<div className={'lg:col-start-2 flex flex-col lg:grid lg:grid-cols-7 lg:gap-x-30 col-span-8 mb-80 content-max'}>
						{subheadline && <h3 className={'subheadline md:col-span-3 font-light'}><Fade threshold={0.5} delay={500}>{subheadline}</Fade></h3>}
						{copy && <div className={'md:col-span-3 typo-small-body-light'}><Fade threshold={0.7} delay={1000}>{copy}</Fade></div>}
					</div>
					{
						downloads.map((downlds, downldsIdx) => {
							return (
								<FileItem key={+downldsIdx} fileKey={+downldsIdx} downlds={downlds} />
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default BrandImageWithDownloads;

const FileItem = ({fileKey, downlds}) => {
	const filenameWithLink = (
		<Link className={'typo-subhead-03 pl-20'} href={downlds.file.mediaItemUrl}>
			<h3 className={'underline'}>
				<Fade delay={1500}>{downlds.filename}</Fade>
			</h3>
		</Link>
	);
	return (
		<div className={'file-item lg:col-start-2 col-span-8 flex lg:grid lg:grid-cols-7 lg:gap-x-30 content-max items-center'} key={fileKey}>
			<div className={'col-span-3 flex items-center'}>
				<div className={'col-start-1 col-span-2 file-item__icon'}>
					<Fade delay={1500}><File /></Fade>
				</div>
				<div className={'hidden lg:inline-flex'}>{filenameWithLink}</div>
			</div>
			<div className={'col-span-4 ml-20 lg:ml-0 lg:flex lg:items-center justify-between lg:w-full'}>
				<div className={'pb-10 lg:hidden'}>{filenameWithLink}</div>
				<div className={'file-details'}>
					<p className={'typo-small-body-light'}>
						<Fade delay={1500}>{downlds.label1}</Fade>
					</p>
					<p className={'typo-small-body-light'}>
						<Fade delay={1500}>{downlds.label2}</Fade>
					</p>
				</div>
			</div>
		</div>
	);
};

export const query = graphql`
	fragment BrandImageWithDownloads on WpPage_Pagecomponents_PageComponents_BrandImageWithDownloads {
		fieldGroupName
		anchor
		headline
		subheadline
		copy
		variant
		backgroundLayer {
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
		frontLayer {
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
		mobileBackgroundLayer {
			altText
			sourceUrl
			localFile {
				childImageSharp {
					gatsbyImageData(
						width: 1500
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
		mobileFrontLayer {
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
		downloads {
			filename
			label1
			label2
			file {
				mediaItemUrl
				srcSet
				sourceUrl
				mediaItemUrl
			}
		}
	}
`;
