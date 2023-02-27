import React from 'react';
import { graphql } from 'gatsby';
import uniqueId from 'uniqid';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';

const ns = `heading-top`;

const HeadingTop = props => {
	const { headline, subtitleTop } = props;
	return (
		<div className={ns}>
			<div className={'container pt-190'}>
				{headline && (
					<h1 className={'typo-h2 text-black text-center w-full pb-180 lg:pb-100'}>
						{headline}
					</h1>
				)}
				{subtitleTop && (
					<RenderStaticHTML
						className={'typo-medium-body-light'}
						html={subtitleTop}
					/>
				)}
			</div>
		</div>
	);
};

export default HeadingTop;

export const query = graphql`
	fragment HeadingTop on WpPage_Pagecomponents_PageComponents_HeadingTop {
		fieldGroupName
		headline
		subtitleTop
	}
`;
