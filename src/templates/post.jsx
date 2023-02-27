import React from 'react';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';
import moment from 'moment';
// import SEO from '../components/SEO';
import RenderStaticHTML from '../components/generic/RenderStaticHTML';
import Newsroom from '../components/Newsroom';

//import { setMetaImage } from '../utils';

const ns = `single-post`;

const Post = ({ data }) => {
	const {
		slug,
		title,
		uri,
		date,
		content,
		featuredImage,
		// pageDetails: {
		// 	seo,
		// },
	} = data.post; 

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }-${ slug }`]: true,
	});

	// Set the meta image
	//const metaImage = setMetaImage(featuredImage?.node, seo);
	const goBackArr = uri.split("/")[1];
	return (
		<div className={rootClassnames} >
			<div class={'avelaup-single-post'}>
				{title && (
					<div class={'header-single-post'}>
						<div class={'header-sp-container'}>
							<div class={'col-left'}>
								<h2 class={'title-single-post'}>{title}</h2>
								<p class={'date-single-post'}>
									<svg width={'17'} height={'13'} viewBox={'0 0 17 13'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
										<path d={'M0 0L11.5605 0L17 6.5L11.5605 13H0V0Z'} fill={'#FF1415'}/>
									</svg>
									{moment(date).format('MMM D, yyyy')}
								</p>
							</div>
							<div class={'col-right'}>
								{featuredImage && (
									<img src={featuredImage.node.sourceUrl} alt={featuredImage.node.altText} />
								)}
							</div>
						</div>
					</div>
				)}
				{content && (
					<div class={'content-single-post'}>
						<div class={'content-sp-container'}>
							<RenderStaticHTML html={content} className={'wysiwyg wysiwyg-single-post'} />
							<div class={'avelaup-hr'}>
							</div>
							<div class={'avelaup-post-goback'}>
								<Link to={`/${goBackArr}`} className={'block cursor-pointer'}>
									<svg width={'17'} height={'13'} viewBox={'0 0 17 13'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
										<path d={'M17 13L5.43949 13L-5.68248e-07 6.5L5.43949 1.01065e-06L17 0L17 13Z'} fill={'#FF1415'}/>
									</svg>
									Go Back
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
			<div class={'custom-press'}>
				<div className={'wrap avelaup-press-inquiries'}>
					<div className={'avelaup-inquiries'}>
						<div className={'avelaup-press-inquiries-section'}>
							<h2 className={'avelaup-press-inquiries-title'}>Press Contacts & Resources</h2>
							<div className={'rte custom-press-sub-title inline-block font-normal'}><p>To contact our media relations team, please email: Patti Bianchi</p><p>Public Relations Specialist, CG Life (for Geno)</p><p>
								<a href={'mailto:pbianchi@cglife.com'} target={'_blank'} className={'default-link'} rel={'noreferrer'}>pbianchi@cglife.com</a></p>
							</div>
							<Link target={'_blank'} to={'https://wp.avelaup.com/wp-content/uploads/2022/11/Avela-Press-Kit.zip'} className={'block cursor-pointer'}>
								<div className={'layout-downloads'}>
									<svg className={'h-auto w-55 md:w-40'} width={'57'} height={'68'} viewBox={'0 0 57 68'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
										<path d={'M26.755 29.3867L19.8476 33.9853C19.5511 38.8318 17.4687 43.4023 13.995 46.8304C10.5213 50.2585 5.8977 52.306 1.0006 52.5849V66.2875C9.56169 65.9928 17.6913 62.4952 23.7494 56.5003C29.8076 50.5054 33.3434 42.4594 33.6436 33.9853L26.755 29.3867Z'} fill={'#FF1415'} />
										<path d={'M53.2466 66.9975H3.74968C3.0204 66.9975 2.321 66.7078 1.80534 66.1921C1.28967 65.6764 0.999983 64.977 1 64.2477V3.75177C0.999983 3.02249 1.28967 2.32307 1.80534 1.80738C2.321 1.29169 3.0204 1.00197 3.74968 1.00195H36.7485L55.9963 20.2507V64.2477C55.9963 64.977 55.7066 65.6764 55.191 66.1921C54.6753 66.7078 53.9759 66.9975 53.2466 66.9975V66.9975Z'} stroke={'black'} strokeLinecap={'round'} strokeLinejoin={'round'} />
										<path d={'M30 1V20H46'} stroke={'black'} strokeLinecap={'round'} strokeLinejoin={'round'} />
									</svg>
									<span className={'avelaup-press-inquiries-filename'}>Download Press Kit</span>
								</div>
								
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

export const postQuery = graphql`
	query GET_POST_DEFAULT($id: String!) {
	  post: wpPost(id: {eq: $id}) {
	    title
	    uri
	    slug
	    content
	    date
	    featuredImage {
	      node {
	        sourceUrl
	        title
	        altText
	      }
	    }
	  }
	}
`;
