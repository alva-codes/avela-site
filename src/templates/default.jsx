import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';

// import SEO from '../components/SEO';
import RenderStaticHTML from '../components/generic/RenderStaticHTML';

import { setMetaImage } from '../utils';

const ns = `page-default`;

const Page = ({ data }) => {
	const {
		slug,
		title,
		content,
		featuredImage,
		// pageDetails: {
		// 	seo,
		// },
	} = data.page;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }-${ slug }`]: true,
	});

	// Set the meta image
	// const metaImage = setMetaImage(featuredImage?.node, seo);

	return (
		<div className={rootClassnames} style={{background: 'white'}}>
			{/* <SEO
				title={seo.title || slug !== 'home' ? title : ''}
				image={metaImage}
				description={seo.metaDescription}
				page={slug}
			/> */}
			{content && (
				<div className={'container'}>
					<RenderStaticHTML html={content} className={'wysiwyg'} />
				</div>
			)}
		</div>
	);
};

export default Page;

export const pageQuery = graphql`
	query GET_PAGE_DEFAULT($id: String!) {
		page: wpPage(id: { eq: $id }) {
			title
			slug
			content
			featuredImage {
				node {
					sourceUrl
					title
					altText
				}
			}
			# pageDetails {
			# 	seo {
			# 		title
			# 		metaDescription
			# 		metaImage {
			# 			sourceUrl
			# 		}
			# 	}
			# }
		}
	}
`;
