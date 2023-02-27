import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';
import CitationIcon from '../../icons/Citation';

const ns = `citation`;

const Citation = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const { leftColumn, rightColumn, headline } = props;
	return (
		<div className={rootClassnames}>
			<div className={'container pt-60 md:pt-50 pb-120 md:pb-210'}>
				<div className={'grid grid-cols-9 md:grid-cols-12 gap-x-15 md:gap-x-30'}>
					<div className={'col-span-1 md:col-start-2'}>
						<CitationIcon />
					</div>
					<div className={'col-span-8 col-start-2 md:col-start-3 typo-eyebrow text-black pb-80 headline'}>
						{headline}
					</div>
					<div className={'col-span-8 md:col-span-4 md:col-start-3 col-start-2 pb-40 md:pb-0'}>
						<RenderStaticHTML
							className={'text-lightestGrey typo-small-body-light html'}
							html={leftColumn}
						/>
					</div>
					<div className={'col-span-8 col-start-2 md:col-span-4 md:col-start-8'}>
						<RenderStaticHTML
							className={'text-lightestGrey typo-small-body-light html'}
							html={rightColumn}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Citation;

export const query = graphql`
	fragment Citation on WpPage_Pagecomponents_PageComponents_Citation {
		fieldGroupName
		anchor
		headline
		leftColumn
		rightColumn
	}
`;
