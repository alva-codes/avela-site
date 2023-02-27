const path = require(`path`);

module.exports = async(slugify, { gatsbyUtilities }) => {
	const GET_PAGES = `
        query WpPages {
            allWpPage {
                pages: nodes {
                    id
                    uri
					slug
                    template {
						templateName
					}
                }
            }
        }
	`;

	// Used to define pages that will use a different gatsby page template
	// const customPageTemplate = [
	// 	// 'Home',
	// ];

	const fetchPages = async variables => {
		const pagesResult = await gatsbyUtilities.graphql(GET_PAGES, variables).then(({ data }) => {
			const {
				allWpPage: {
					pages,
				},
			} = data;
			return pages;
		});

		return pagesResult;
	};

	await fetchPages().then(pages => {
		pages.map(page => {
			// Skip pages that don't use general template.
			// if (customPageTemplate.includes(page.template.templateName)) {
			// 	return gatsbyUtilities.actions.createPage({
			// 		// Use the WordPress uri as the Gatsby page path
			// 		// This is a good idea so that internal links and menus work 👍
			// 		path: `/${ page.slug }`,

			// 		// use the blog page template as the page component
			// 		// eslint-disable-next-line max-len
			// 		component: path.resolve(`./src/templates/${
			// 			page.template.templateName === 'Default'
			// 				? 'page'
			// 				: slugify(page.template.templateName)
			// 		}.js`),

			// 		// `context` is available in the template as a prop and
			// 		// as a variable in GraphQL.
			// 		context: {
			// 		// we need to add the page id here
			// 		// so our blog page template knows which blog page
			// 		// the current page is (when you open it in a browser)
			// 			id: page.id,
			// 		},
			// 	});
			// }

			const baseTemplatePath = `./src/templates/`;
			const pageTemplateFile = `${ slugify(page.template.templateName) }.jsx`;

			// createPage is an action passed to createPages
			// See https://www.gatsbyjs.com/docs/actions#createPage for more info
			return gatsbyUtilities.actions.createPage({
				// Use the WordPress uri as the Gatsby page path
				// This is a good idea so that internal links and menus work 👍
				path: page.slug === 'home' ? '/' : `/${ page.slug }`,

				// use the blog page template as the page component
				// eslint-disable-next-line max-len
				// component: path.resolve(`./src/templates/${ page.template.templateName === 'Default' ? 'page' : slugify(page.template.templateName) }.js`),
				component: path.resolve(`${ baseTemplatePath }${ pageTemplateFile }`),

				// `context` is available in the template as a prop and
				// as a variable in GraphQL.
				context: {
				// we need to add the page id here
				// so our blog page template knows which blog page
				// the current page is (when you open it in a browser)
					id: page.id,
				},
			});
		});
	});
};
