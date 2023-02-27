import React from 'react';

/**
 * Breaks up or 'chunks' array to smaller parts
 * @param {array} array of items
 * @param {number} size the number of itmes per chunk
 * @returns
 */

export const chunkArray = (array, size) => {
	return array.reduce((chunks, item, i) => {
		if (i % size === 0) {
			chunks.push([item]);
		} else {
			chunks[chunks.length - 1].push(item);
		}
		return chunks;
	}, []);
};

/**
 * Renders ifram markup for Youtube or Vimeo given url
 * @param {string} url YT or Vimeo url
 * @returns
 */

export const getVideoIframe = url => {
	const pattern = /(\/\/.+\/)(.+v=)?([a-zA-Z0-9-]+)($|\?.+)/;
	const matches = url.match(pattern);

	if (!matches) return false;

	const videoId = matches[3]; // Video ID is 3rd capturing group.
	let iframeSrc;
	let type;

	if (url.indexOf('youtu') !== -1) {
		type = `youtube`;
		iframeSrc = `https://www.youtube.com/embed/${ videoId }`;
	} else if (url.indexOf('vimeo') !== -1) {
		type = `vimeo`;
		iframeSrc = `https://player.vimeo.com/video/${ videoId }`;
	} else {
		return false;
	}

	return (
		<div className={`iframe-container`}>
			<iframe
				src={iframeSrc}
				title={`${ type }-video`}
				width={640}
				height={360}
				frameBorder={`0`}
				allowFullScreen
			/>
		</div>
	);
};

/**
 * Determine external url (Button, Link)
 * @param {string} url
 * @returns
 */

export const isExternalUrl = url => {
	let isExternal = false;

	if (url && (url.includes('//') || url.match(/((^(mailto|tel|sms|mms):)|www.)/))) {
		isExternal = true;
	}

	return isExternal;
};

/**
 * Sets SEO meta image
 * @param {obj} image object (wp featured image)
 * @param {obj} custom fields meta image from seo group
 * @returns
 */

export const setMetaImage = (image, seo) => {
	let metaImage = null;
	if (seo?.metaImage) {
		metaImage = seo.metaImage.sourceUrl;
	} else if (image) {
		metaImage = image.sourceUrl;
	}

	return metaImage;
};
