const path = require(`path`);

module.exports = async({ gatsbyUtilities }) => {
	const GET_POSTS = `
        query GET_POSTS {
			allWpPage(filter: {template: {templateName: {eq: "Press"}}}) {
				blogPage: nodes {
				  	slug
				}
			}
            allWpPost {
				posts: nodes {
					id
					uri
					slug
					title
					date
					content
					featuredImage {
					    node {
					        sourceUrl
					        title
					        altText
					    }
				    }
				}
            }
        }
	`;
 
	const fetchPosts = async variables => {
		const postsResult = await gatsbyUtilities.graphql(GET_POSTS, variables).then(({ data }) => {
			const {
				allWpPage: {
					blogPage: [blogPage],
				},
				allWpPost: {
					posts,
				},
			} = data;

			// eslint-disable-next-line no-console
			return [blogPage, posts];
		});

		return postsResult;
	};

	await fetchPosts().then(([blogPage, posts]) => {
		return Promise.all(
			// Create Individual post pages
			posts.map(post => {
				// createPage is an action passed to createPages
				// See https://www.gatsbyjs.com/docs/actions#createPage for more info
				return gatsbyUtilities.actions.createPage({
					// Use the WordPress uri as the Gatsby page path
					// This is a good idea so that internal links and menus work 👍
					//path: `/${ blogPage.slug }/${ post.slug }`,
					path: `${ post.uri }`,

					// use the blog page template as the page component
					component: path.resolve(`./src/templates/post.jsx`),

					// `context` is available in the template as a prop and
					// as a variable in GraphQL.
					context: {
						// we need to add the post id here
						// so our blog post template knows which blog post
						// the current post is (when you open it in a browser)
						id: post.id,
					},
				});
			})
		);
	});
};
