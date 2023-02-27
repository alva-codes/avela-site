import React from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';

const ns = `custom-press`;

const Newsroom = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});
	const { newsroomBuilder, newsroomInquiries } = props;

	return (
		<div className={rootClassnames}>
			{newsroomBuilder && (
				<div className={'wrap avelaup-press-builder'}>
					<div className={'avelaup-posts'}>
						{newsroomBuilder && newsroomBuilder.map((e, index) => {
							if (e.post) {
								if(e.post.url == '/genomatica-enters-functional-food-and-beverage-market-with-ketosis-for-all/'){
									return (
										<a key={+index} className={'avelaup-post'} target={'_blank'} href={`https://www.nutraingredients-usa.com/Article/2022/11/09/Genomatica-enters-functional-food-and-beverage-market-with-ketosis-for-all?utm_source=copyright&utm_medium=OnSite&utm_campaign=copyright`}>
											<div className={'avelaup-post-featured'}>
												{e.featuredImage && (
													<GatsbyImage
														image={e.featuredImage.localFile.childImageSharp.gatsbyImageData}
														alt={e.featuredImage.altText}
														objectFit={'cover'}
													/>
												)}
											</div>
											<div className={'avelaup-post-title'}>
												<h4 className={'avelaup-post-title-text'}>{e.post.title}</h4>
											</div>
										</a>
									);
								}else{
									return (
										<a key={+index} className={'avelaup-post'} href={`${e.post.url}`}>
											<div className={'avelaup-post-featured'}>
												{e.featuredImage && (
													<GatsbyImage
														image={e.featuredImage.localFile.childImageSharp.gatsbyImageData}
														alt={e.featuredImage.altText}
														objectFit={'cover'}
													/>
												)}
											</div>
											<div className={'avelaup-post-title'}>
												<h4 className={'avelaup-post-title-text'}>{e.post.title}</h4>
											</div>
										</a>
									);
								}
							}
							return null;
						})}
					</div>
				</div>
			)}
			{newsroomInquiries && (
				<div className={'wrap avelaup-press-inquiries'}>
					<div className={'avelaup-inquiries'}>
						{newsroomInquiries && newsroomInquiries.map((e, index) => {
							if (e.title) {
								return (
									<div className={'avelaup-press-inquiries-section'}>
										<h2 className={'avelaup-press-inquiries-title'}>{e.title}</h2>
										{e.subTitle && (
											<RenderStaticHTML html={e.subTitle} className={`${ ns }-sub-title inline-block font-normal`} />
										)}
										{e.file && (
											<Link key={uniqueId(e.file.mediaItemUrl)} target={'_blank'} to={e.file.mediaItemUrl} className={'block cursor-pointer'}>
												<div className={'layout-downloads'}>
													<svg className={'h-auto w-55 md:w-40'} width={'57'} height={'68'} viewBox={'0 0 57 68'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
														<path d={'M26.755 29.3867L19.8476 33.9853C19.5511 38.8318 17.4687 43.4023 13.995 46.8304C10.5213 50.2585 5.8977 52.306 1.0006 52.5849V66.2875C9.56169 65.9928 17.6913 62.4952 23.7494 56.5003C29.8076 50.5054 33.3434 42.4594 33.6436 33.9853L26.755 29.3867Z'} fill={'#FF1415'} />
														<path d={'M53.2466 66.9975H3.74968C3.0204 66.9975 2.321 66.7078 1.80534 66.1921C1.28967 65.6764 0.999983 64.977 1 64.2477V3.75177C0.999983 3.02249 1.28967 2.32307 1.80534 1.80738C2.321 1.29169 3.0204 1.00197 3.74968 1.00195H36.7485L55.9963 20.2507V64.2477C55.9963 64.977 55.7066 65.6764 55.191 66.1921C54.6753 66.7078 53.9759 66.9975 53.2466 66.9975V66.9975Z'} stroke={'black'} strokeLinecap={'round'} strokeLinejoin={'round'} />
														<path d={'M30 1V20H46'} stroke={'black'} strokeLinecap={'round'} strokeLinejoin={'round'} />
													</svg>
													<span className={'avelaup-press-inquiries-filename'}>{e.filename}</span>
												</div>
											</Link>
										)}
										
									</div>
								);
							}
							return null;
						})}
					</div>
				</div>
			)}
		</div>
	);
};
 
export default Newsroom;

export const query = graphql`
	fragment Newsroom on WpPage_Pagecomponents_PageComponents_Newsroom {
		fieldGroupName
		anchor
		newsroomBuilder {
			... on WpPage_Pagecomponents_PageComponents_Newsroom_NewsroomBuilder_Posts {
				featuredImage {
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
				post {
					url
					title
				}
			}
		}
		newsroomInquiries {
			... on WpPage_Pagecomponents_PageComponents_Newsroom_NewsroomInquiries_Downloads {
				title
				subTitle
				filename
				file {
					srcSet
					sourceUrl
					mediaItemUrl
				}
			}
		}
	}
`;
