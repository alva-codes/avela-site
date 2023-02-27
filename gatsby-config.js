const path = require(`path`);
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
	path: `.env.${ activeEnv }`,
});

module.exports = {
	siteMetadata: {
		siteTitle: `${ process.env.SITE_TITLE }`,
		siteTagline: `${ process.env.SITE_TAGLINE }`,
		siteUrl: `${ process.env.SITE_URL }`,
		siteDescription: `${ process.env.SITE_DESCRIPTION }`,
		siteTitleDefault: 'gatsby-wp-starter',
		hrefLang: 'en',
		siteImage: '/default-og-image.jpg',
		twitter: '@gatsbyjs',
	},
	flags: {
		FAST_DEV: true,
		DEV_SSR: false,
	},
	plugins: [
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-eslint`,
		`gatsby-plugin-postcss`,
		`gatsby-plugin-robots-txt`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				base64Width: 20,
				pngCompressionSpeed: 10,
				forceBase64Format: `webp`, // valid formats: png,jpg,webp
				useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
				stripMetadata: true,
				defaultQuality: 10,
			},
		},
		'gatsby-plugin-image',
		'gatsby-transformer-sharp',
		'gatsby-plugin-gatsby-cloud',
		{
			/**
			 * First up is the WordPress source plugin that connects Gatsby
			 * to your WordPress site.
			 *
			 * visit the plugin docs to learn more
			 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
			 *
			 */
			resolve: `gatsby-source-wordpress`,
			options: {
				// the only required plugin option for WordPress is the GraphQL url.
				url: `${ process.env.WORDPRESS_URL }/graphql`,
			},
		},
		{
			// See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Avela`,
				short_name: `Avela`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#000000`,
				display: `minimal-ui`,
				icon: `content/assets/favicon.png`,
			},
		},
		// TODO: find a version that works with the latest gatsby version
		// {
		// 	resolve: `@danbruegge/gatsby-plugin-stylelint`,
		// 	options: {
		// 		files: `**/*.scss`,
		// 		context: path.join(__dirname, '/src/scss'),
		// 	},
		// },
		{
			resolve: `gatsby-plugin-layout`,
			options: {
				component: require.resolve(`./src/layout/DefaultLayout`),
			},
		},
		// Add your Google Analytics ID to the .env file to enable
		// Otherwise, this plugin can be removed
		process.env.GOOGLE_GTM_ID && {
			resolve: 'gatsby-plugin-google-tagmanager',
			options: {
				id: process.env.GOOGLE_GTM_ID,

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: false,

				// Specify optional GTM environment details.
				// gtmAuth: `YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING`,
				// gtmPreview: `YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME`,
				// dataLayerName: `YOUR_DATA_LAYER_NAME`
			},
		},
	].filter(Boolean),
};
