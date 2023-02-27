import React from 'react';
import classNames from 'classnames';

const ns = `image`;

const Image = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const {
		altText,
		title,
		sourceUrl,
		mainImageMobile,
		tabletImage,
		laptopImage,
		desktopImage,
		widescreenImage,
		dataMedia,
	} = props;

	// if no mainImageMobile return nothing
	if (!mainImageMobile && !sourceUrl) return null;

	let tabletSet = null;
	let laptopSet = null;
	let desktopSet = null;
	let widescreenSet = null;

	const getSrc = src => {
		return src.sourceUrl ? src.sourceUrl : src;
		// return src.sourceUrl;
	};

	if (tabletImage && tabletImage.sourceUrl) {
		tabletSet = <source media={`(min-width: 768px)`} srcSet={getSrc(tabletImage)} />;
	}

	if (laptopImage && laptopImage.sourceUrl) {
		laptopSet = <source media={`(min-width: 992px)`} srcSet={getSrc(laptopImage)} />;
	}

	if (desktopImage && desktopImage.sourceUrl) {
		desktopSet = <source media={`(min-width: 1200px)`} srcSet={getSrc(desktopImage)} />;
	}

	if (widescreenImage && widescreenImage.sourceUrl) {
		widescreenSet = <source media={`(min-width: 1400px)`} srcSet={getSrc(widescreenImage)} />;
	}

	return (
		<picture>
			{widescreenSet}
			{desktopSet}
			{laptopSet}
			{tabletSet}
			<img
				className={rootClassnames}
				alt={altText || title || mainImageMobile.altText || mainImageMobile.title}
				src={getSrc(mainImageMobile || sourceUrl)}
				data-media={dataMedia}
				loading={'lazy'}
				draggable={`false`}
			/>
		</picture>
	);
};

export default Image;
