import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import SEO from '../components/SEO';

// import { setMetaImage } from '../utils';
import renderComponent from '../utils/render-component';

const ns = `page-flexible`;

const Page = ({ data, location }) => {
	const {
		slug,
		pageComponents: { pageComponents },
	} = data.page;

	const pageSEO = data.page.seoData;
	const { seoData } = data.wp.globalSettings;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }-${ slug }`]: true,
	});

	return (
		<div className={rootClassnames}>
			<div id={'widgetContainer'} />
			<SEO
				location={location}
				slug={slug}
				defaultData={seoData}
				pageData={pageSEO}
			/>
			{pageComponents && (
				<div className={`${ ns }__components`}>
					{pageComponents.map(component => {
						return renderComponent(component, data.wp);
					})}
				</div>
			)}
		</div>
	);
};

export default Page;

export const pageQuery = graphql`
	query GET_PAGE_FLEXIBLE($id: String!) {
		...SEO
		wp {
			acfOptionsInformationRequestForm {
				informationRequestForm {
					bottomNote
					documentUploadText
					headline
					type {
						option
					}
					builder {
						... on WpAcfOptionsInformationRequestForm_Informationrequestform_Builder_Text {
							fieldGroupName
							placeholder
							type
							required
							width
							cf7Key
						}
						... on WpAcfOptionsInformationRequestForm_Informationrequestform_Builder_Textarea {
							fieldGroupName
							placeholder
							width
							required
							cf7Key
						}
						... on WpAcfOptionsInformationRequestForm_Informationrequestform_Builder_CountrySelect {
							fieldGroupName
							placeholder
							required
							width
							cf7Key
						}
					}
				}
			}
			acfOptionsContactFormDefault {
				contactFormDefault {
					headlineCfd
					termsOfUseCheckbox
					additionalCopy
					wpFields {
						... on WpAcfOptionsContactFormDefault_Contactformdefault_Fields_Text {
							fieldGroupName
							placeholder
							type
							required
							width
							cf7Key
						}
						... on WpAcfOptionsContactFormDefault_Contactformdefault_Fields_Textarea {
							fieldGroupName
							placeholder
							width
							required
							cf7Key
						}
						... on WpAcfOptionsContactFormDefault_Contactformdefault_Fields_CountrySelect {
							fieldGroupName
							placeholder
							required
							width
							cf7Key
						}
					}
					informationRow {
						info
						label
					}
				}
			}
			acfOptionsContactFormRequestSample {
				contactFormRequestSample {
					headlineRs
					subHeadlineRs
					termsOfUseCheckboxRs
					additionalCopyRs
					subThankyouRs
					wpFields {
						... on WpAcfOptionsContactFormRequestSample_Contactformrequestsample_Fields_Text {
							fieldGroupName
							placeholder
							type
							required
							width
							cf7Key
						}
						... on WpAcfOptionsContactFormRequestSample_Contactformrequestsample_Fields_Textarea {
							fieldGroupName
							placeholder
							width
							required
							cf7Key
						}
						... on WpAcfOptionsContactFormRequestSample_Contactformrequestsample_Fields_CountrySelect {
							fieldGroupName
							placeholder
							required
							width
							cf7Key
						}
					}
				}
			}
			globalSettings {
				globalSettings {
					fieldGroupName
					headline404
					link404 {
						target
						title
						url
					}
					loadingState
					loadingErrorMessage
					loadingSuccessMessage
					loadingSuccessMessageSubline
					loadingSuccessSubmitNewFormLabel
					loadingSuccessLink  {
						target
						title
						url
					}
				}
			}
		}
		page: wpPage(id: { eq: $id }) {
			title
			slug
			featuredImage {
				node {
					sourceUrl
					title
					altText
				}
			}
			seoData {
				title
				description
				ogDescription
				ogImage {
					sourceUrl
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
				}
				twitterSite
				twitterTitle
			}
			template {
				... on WpTemplate_Flexible {
					templateName
					pageSetting {
						invertNavigation
					}
				}
			}
			pageComponents {
				pageComponents {
					__typename
					...HeroGrid
					...FeaturedBrands
					...ContentList
					...Overview
					...Link
					...Newsroom
					...ImageText
					...BrandImage
					...ClaimWithSlider
					...InfoSlider
					...BackgroundImageWithContent
					...IntroWithImage
					...StickyImageWithText
					...ImageHero
					...DoubleImageWithCopy
					...Citation
					...Wysiwyg
					...TeamSlider
					...BrandImageWithDownloads
					...Statement
					...IntroWithOverviewCard
					...Process
					...ImageHeroWithCopy
					...ContactForm
					...ContactFormRequestSample
					...InformationRequestForm
					...HeadingTop
					...Accordion
				}
			}
		}
	}
`;
