/* eslint-disable template-curly-spacing */
/* eslint-disable operator-linebreak */
import React from 'react';
import { graphql } from 'gatsby';
import uniqueId from 'uniqid';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';

const ns = `wysiwyg`;

const getGridWidthByIndex = (total, index) => {
	if (total === 2) {
		if (index === 0) return 'col-span-7 lg:col-span-2';
		if (index === 1) return 'col-span-7 lg:col-span-5';
	}
	if (total === 3) {
		if (index === 0) return 'col-span-7 lg:col-span-2';
		if (index === 1) return 'col-span-7 lg:col-span-2';
		if (index === 2) return 'col-span-7 lg:col-span-3';
	}
	if (total === 4) {
		if (index === 0) return 'col-span-7 lg:col-span-2';
		if (index === 1) return 'col-span-7 lg:col-span-2';
		if (index === 2) return 'col-span-7 lg:col-span-1';
		if (index === 3) return 'col-span-7 lg:col-span-2';
	}
	return 'col-span-3';
};

const Wysiwyg = props => {
	const { headline, sections } = props;
	return (
		<div className={ns}>
			<div className={'container pt-190 pb-120 lg:pt-140 lg:pb-200'}>
				{headline && (
					<h1 className={'typo-h2 text-black text-center w-full pb-180 lg:pb-100'}>
						{headline}
					</h1>
				)}
				{sections &&
					sections.map((section, index) => {
						const idx = index > 8 ? index + 1 : `0${index + 1}`;
						const { builder } = section;
						return (
							<div
								key={section.headline}
								className={`section grid grid-cols-9 lg:grid-cols-12 gap-x-15 lg:gap-x-30 pt-60 lg:pt-50 pb-120 lg:pb-100`}
							>
								<div className={'col-span-1 lg:col-start-2 typo-eyebrow'}>
									{idx}
								</div>
								<div className={'col-span-8 lg:col-span-9 lg:col-start-4 typo-eyebrow'}>
									{section.headline}
								</div>
								<div className={'col-start-2 col-span-8 lg:col-span-7 lg:col-start-4 pt-80'}>
									{builder &&
										builder.map(element => {
											return (
												<div key={uniqueId('builder-section')}>
													{element.copy && (
														<RenderStaticHTML
															className={'typo-medium-body-light'}
															html={element.copy}
														/>
													)}
													{element.labels && (
														<div className={'hidden lg:grid lg:grid-cols-7 gap-x-30 pt-60'}>
															{element.labels
																.filter(x => {
																	return !!x.label;
																})
																.map((l, i) => {
																	// eslint-disable-next-line max-len
																	const count = element.labels.filter(x => {
																		return !!x.label;
																	}).length;
																	return (
																		<div
																			className={`${getGridWidthByIndex(
																				count,
																				i
																			)} typo-medium-body-semibold`}
																			key={l.label}
																		>
																			{l.label}
																		</div>
																	);
																})}
														</div>
													)}
													{element.rows && (
														<div className={'flex flex-col items-center pt-60 lg:pt-30 pb-60'}>
															{element.rows.map(row => {
																// eslint-disable-next-line max-len
																const count = Object.values(row).filter(x => {
																	return !!x;
																}).length;
																return (
																	<div
																		className={'grid grid-cols-7 gap-x-30 gap-y-30 lg:gap-y-0 w-full table_section'}
																		key={uniqueId('section-table-row')}
																	>
																		{row.value1 && (
																			<>
																				<span className={'lg:hidden col-span-7 typo-medium-body-semibold'}>
																					{element?.labels[0]?.label}
																				</span>
																				<span
																					className={`${getGridWidthByIndex(
																						count,
																						0
																					)} typo-medium-body-light`}
																				>
																					{row.value1}
																				</span>
																			</>
																		)}
																		{row.value2 && (
																			<>
																				<span className={'lg:hidden col-span-7 typo-medium-body-semibold'}>
																					{element?.labels[1]?.label}
																				</span>
																				<span
																					className={`${getGridWidthByIndex(
																						count,
																						1
																					)} typo-medium-body-light`}
																				>
																					{row.value2}
																				</span>
																			</>
																		)}
																		{row.value3 && (
																			<>
																				<span className={'lg:hidden col-span-7 typo-medium-body-semibold'}>
																					{element?.labels[2]?.label}
																				</span>
																				<span
																					className={`${getGridWidthByIndex(
																						count,
																						2
																					)} typo-medium-body-light`}
																				>
																					{row.value3}
																				</span>
																			</>
																		)}
																		{row.value4 && (
																			<>
																				<span className={'lg:hidden col-span-7 typo-medium-body-semibold'}>
																					{element?.labels[3]?.label}
																				</span>
																				<span
																					className={`${getGridWidthByIndex(
																						count,
																						3
																					)} typo-medium-body-light`}
																				>
																					{row.value4}
																				</span>
																			</>
																		)}
																	</div>
																);
															})}
														</div>
													)}
												</div>
											);
										})}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Wysiwyg;

export const query = graphql`
	fragment Wysiwyg on WpPage_Pagecomponents_PageComponents_Wysiwyg {
		fieldGroupName
		headline
		sections {
			builder {
				... on WpPage_Pagecomponents_PageComponents_Wysiwyg_sections_Builder_Copy {
					copy
					fieldGroupName
				}
				... on WpPage_Pagecomponents_PageComponents_Wysiwyg_sections_Builder_Table {
					fieldGroupName
					labels {
						label
					}
					rows {
						value1
						value2
						value3
						value4
					}
				}
			}
			headline
		}
	}
`;
