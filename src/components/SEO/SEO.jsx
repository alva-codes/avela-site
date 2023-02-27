/* eslint-disable operator-linebreak */
import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

function SEO({
	defaultData, pageData, location,
}) {
	return (
		<Helmet
		// 	title={pageData?.title || defaultData?.title}
		// 	meta={[
		// 		{
		// 			name: `description`,
		// 			content: pageData?.description || defaultData?.description,
		// 		},
		// 		{
		// 			property: `og:title`,
		// 			content: pageData?.ogTitle || defaultData?.ogTitle,
		// 		},
		// 		{
		// 			property: `og:locale`,
		// 			content: pageData?.ogLocale || defaultData?.ogLocale,
		// 		},
		// 		{
		// 			property: `og:url`,
		// 			content: pageData?.ogUrl || defaultData?.ogUrl,
		// 		},
		// 		{
		// 			property: `og:site_name`,
		// 			content: pageData?.ogSiteName || defaultData?.ogSiteName,
		// 		},
		// 		{
		// 			property: `og:description`,
		// 			content: pageData?.ogDescription || defaultData?.ogDescription,
		// 		},
		// 		{
		// 			property: `og:image`,
		// 			content:
		// 				pageData?.ogImage?.sourceUrl || defaultData?.ogImage?.sourceUrl,
		// 		},
		// 		{
		// 			property: `og:image:url`,
		// 			content:
		// 				pageData?.ogImage?.sourceUrl || defaultData?.ogImage?.sourceUrl,
		// 		},
		// 		{
		// 			property: `og:image:width`,
		// 			content:
		// 				pageData?.ogImage?.mediaDetails?.width
		// 				||	defaultData?.ogImage?.mediaDetails?.width,
		// 		},
		// 		{
		// 			property: `og:image:height`,
		// 			content:
		// 				pageData?.ogImage?.mediaDetails?.height
		// 				||	defaultData?.ogImage?.mediaDetails?.height,
		// 		},
		// 		{
		// 			property: `og:type`,
		// 			content: pageData?.ogType || defaultData?.ogType,
		// 		},
		// 		{
		// 			property: `twitter:card`,
		// 			content: pageData?.twitterCard || defaultData?.twitterCard,
		// 		},
		// 		{
		// 			property: `twitter:title`,
		// 			content: pageData?.twitterTitle || defaultData?.twitterTitle,
		// 		},
		// 		{
		// 			property: `twitter:description`,
		// 			content:
		// 				pageData?.twitterDescription || defaultData?.twitterDescription,
		// 		},
		// 		{
		// 			property: `twitter:image:src`,
		// 			content:
		// 				pageData?.twitterImage?.sourceUrl ||
		// 				defaultData?.twitterImage?.sourceUrl,
		// 		},
		// 		{
		// 			property: `twitter:image:width`,
		// 			content:
		// 				pageData?.twitterImage?.mediaDetails?.width ||
		// 				defaultData?.twitterImage?.mediaDetails?.width,
		// 		},
		// 		{
		// 			property: `twitter:image:height`,
		// 			content:
		// 				pageData?.twitterImage?.mediaDetails?.height ||
		// 				defaultData?.twitterImage?.mediaDetails?.height,
		// 		},
		// 		{
		// 			property: `twitter:site`,
		// 			content: pageData?.twitterSite || defaultData?.twitterSite,
		// 		},
		// 	]}
		>
			<title>{pageData?.title}</title>
			{location && location.href && (
				<link rel={'canonical'} href={location.href} />
			)}
		 	<meta name="google-site-verification" content="HbUIpgsM7f-uSYR8LZmRTxKk0H35RKR7SpZUojgzv98" />
		 	<meta name="description" content={pageData?.description} />

		 	<meta property="og:title" content={pageData?.ogTitle} />
		 	<meta property="og:locale" content={pageData?.ogLocale} />
		 	<meta property="og:url" content={pageData?.ogUrl} />
		 	<meta property="og:site_name" content={pageData?.ogSiteName} />
		 	<meta property="og:description" content={pageData?.ogDescription} />
		 	<meta property="og:image" content={pageData?.ogImage?.sourceUrl} />
		 	<meta property="og:image:url" content={pageData?.ogImage?.sourceUrl} />
		 	<meta property="og:image:width" content={pageData?.ogImage?.mediaDetails?.width} />
		 	<meta property="og:image:height" content={pageData?.ogImage?.mediaDetails?.height} />
		 	<meta property="og:type" content={pageData?.ogType} />

		 	<meta property="twitter:card" content={pageData?.twitterCard} />
		 	<meta property="twitter:title" content={pageData?.twitterTitle} />
		 	<meta property="twitter:description" content={pageData?.twitterDescription} />
		 	<meta property="twitter:image:src" content={pageData?.twitterImage?.sourceUrl} />
		 	<meta property="twitter:image:width" content={pageData?.twitterImage?.mediaDetails?.width} />
		 	<meta property="twitter:image:height" content={pageData?.twitterImage?.mediaDetails?.height} />
		 	<meta property="twitter:twitter:site" content={pageData?.twitterSite} />
		</Helmet>
	);
}

export default SEO;

export const query = graphql`
	fragment SEO on Query {
		wp {
			globalSettings {
				seoData {
					title
					description
					ogDescription
					ogImage {
						sourceUrl
						mediaDetails {
							height
							width
						}
					}
					ogUrl
					ogLocale
					ogSiteName
					ogTitle
					ogType
					twitterCard
					twitterDescription
					twitterImage {
						sourceUrl
						mediaDetails {
							height
							width
						}
					}
					twitterSite
					twitterTitle
				}
			}
		}
	}
`;
