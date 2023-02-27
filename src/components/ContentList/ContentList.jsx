import React, {
	useCallback
} from 'react';
import classNames from 'classnames';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { InView } from 'react-intersection-observer';
import Fade from '../generic/Fade';

const ns = `content-list`;

const ContentList = props => {
	const { headline, copy, list } = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const getHeadlineNumber = useCallback(headlineNumber => {
		return headlineNumber.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});
	}, []);

	return (
		<div className={rootClassnames}>
			<div className={'container pb-120 md:pb-225'}>
				<div className={'grid grid-cols-9 mg:grid-cols-12 gap-x-15 mg:gap-x-30 mg:items-start mg:mb-32'}>
					<div className={'mb-80 mg:mb-0 col-start-1 mg:col-start-2 col-span-4 '}>
						<Fade threshold={0.3}>
							<h2 className={'font-light text-black'} dangerouslySetInnerHTML={{ __html: headline }} />
						</Fade>
					</div>
					<div className={'mg:col-start-6 col-start-1 col-span-9 mg:col-span-6 lg:col-start-6 lg:col-span-4 mb-80 mg:mb-0'}>
						<p className={'typo-medium-body-light text-black'}>
							<Fade threshold={0.5} delay={500}>{copy}</Fade>
						</p>
					</div>
				</div>

				{
					list && list.map((listItem, index) => {
						return (
							<InView key={+index} triggerOnce>
								{
									({inView, ref}) => {
										return (
											<div
												ref={ref}
												className={
													inView ? 'list-item-wrapper' : ''
												}
											>
												<hr className={'mb-50'} />
												<div className={'grid grid-cols-9 md:grid-cols-12 gap-x-15 md:gap-x-30 mb-50'}>
													<p className={'number md:col-start-2 md:mb-18 text-black'}>
														{getHeadlineNumber(index + 1)}
													</p>
													<div className={'col-start-3 md:col-start-2 col-span-7 md:col-span-2  mb-50 md:mb-0 md:self-center '}>
														<GatsbyImage
															className={'main-image-wrapper'}
															image={getImage(listItem.mainImage.localFile)}
															alt={listItem.mainImage.altText}
														/>
													</div>

													<p className={'typo-eyebrow custom-list-headline col-start-1 md:row-start-1 md:col-start-6 md:col-span-6 lg:col-start-6 lg:col-span-4 col-span-9 mb-50 md:mb-78 text-black'}>
														{listItem.headline}
													</p>
													<p className={'custom-font-p col-start-1 col-span-9 md:col-start-6 md:col-span-6 lg:col-start-6 lg:col-span-4 text-black'}>
														{listItem.copy}
													</p>

													{listItem?.mobileImage && (
														<div className={'md:hidden col-start-1 col-span-9 mt-50'}>
															<GatsbyImage
																className={'mobile-image'}
																image={getImage(listItem.mobileImage.localFile)}
																alt={listItem.mobileImage.altText}
															/>
														</div>
													)}

												</div>

											</div>

										);
									}
								}
							</InView>
						);
					})
				}
			</div>
		</div>
	);
};

export default ContentList;

export const query = graphql`
	fragment ContentList on WpPage_Pagecomponents_PageComponents_ContentList {
		copy
		anchor
		fieldGroupName
		headline
		list {
			copy
			headline
			fieldGroupName
			mainImage {
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
			mobileImage {
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
