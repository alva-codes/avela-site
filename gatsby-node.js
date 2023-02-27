const createPages = require(`./gatsby/createPages`);
const createPosts = require(`./gatsby/createPosts`);

function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
//const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
	await Promise.all([
		createPages(slugify, { gatsbyUtilities }),
		createPosts({ gatsbyUtilities }),
	]);
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
	if (stage === 'build-javascript') {
		actions.setWebpackConfig({
			devtool: false,
		});
	}
};
