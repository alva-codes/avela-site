import React from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';
import { graphql, Link } from 'gatsby';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';
import Button from '../Button/Button';
import Fade from '../generic/Fade';

const ns = `intro-with-overview-card`;

const IntroWithOverviewCard = props => {
	const {
		topSubline,
		topCopy,
		headline,
		copy,
		linkLabel,
		linkSublabel,
		subline,
		properties,
		productInformation,
		downloads,
		links,
	} = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div className={`${ rootClassnames }`}>
			<div className={'container lg:grid grid-cols-12 gap-30'}>
				<div className={'pb-70 col-span-12 lg:grid grid-cols-12 gap-30'}>
					<div className={'col-span-5 col-start-2'}>
						<Fade threshold={0.2}>
							<RenderStaticHTML html={topCopy} className={`typo-subhead-02 ${ ns }__headline mb-35`} />
						</Fade>
						<Fade threshold={0.3} delay={500}>
							<p className={`typo-medium-body-semibold font-normal mb-35`}>{topSubline}</p>
						</Fade>
					</div>
					<div className={'col-span-4 col-start-8 flex flex-col'}>
						<Fade threshold={0.2} delay={300}>
							<div className={`typo-sh2 mb-25`}>{linkLabel}</div>
							{linkSublabel && <div className={'linkSublabel typo-small-body-regular mb-20 mt-15'}>{linkSublabel}</div>}
							{links.map(link => {
								return <Button key={uniqueId(link.link.url)} variant={'small'} to={link.link.url} className={`inline-block mb-20 md:mr-10 lg:mr-auto`}>{link.link.title}</Button>;
							})}
						</Fade>
					</div>
				</div>
				<div className={`-mx-30 ${ ns }__card pt-120 typo-small-body-regular pb-80 lg:pb-90 xl:pb-120 col-span-9 col-start-4 lg:mx-0 lg:-mr-30 lg:-mb-410`}>
					<div className={'container lg:grid grid-cols-9 gap-x-30 lg:-ml-15'}>
						<div className={'col-span-3 col-start-2'}>
							<h3 className={`typo-h2`}>{headline}</h3>
							<div className={`typo-subhead-01 mb-160 lg:mb-70`}>{subline}</div>
							<div className={`typo-medium-body-semibold mb-30 lg:hidden`}>Approvals & Certifications</div>
						</div>
						<RenderStaticHTML html={copy} className={`${ ns }__card__copy col-span-4 col-start-5`} />
						<hr className={`mb-50 ${ ns }__card__line col-span-7 col-start-2 mt-45`} />
						<div className={'col-span-9 lg:grid grid-cols-9 gap-30'}>
							<div className={'col-span-3 col-start-2'}>
								<div className={'typo-medium-body-semibold mb-25  '}>Product Information:</div>
								<div className={`mb-50`}>
									{productInformation && (
										productInformation.map(info => {
											return (
												<div key={uniqueId(info)} className={`grid grid-cols-2 md:gap-30 lg:grid-cols-3`}>
													<div className={`mb-10 lg:-mr-15`}>{info.label}</div>
													<div className={`opacity-80 lg:col-span-2`}>{info.value}</div>
												</div>
											);
										})
									)}
								</div>
							</div>
							<div className={'col-span-4 col-start-5'}>
								<div className={'typo-medium-body-semibold mb-25'}>Properties:</div>
								<div className={`mb-50`}>
									{properties && (
										properties.map(prop => {
											return (
												<div key={uniqueId(prop.value)} className={`grid grid-cols-2 md:gap-30`}>
													<div className={`pr-30 mb-10`}>{prop.label}</div>
													<div className={`opacity-80 mb-10`}>{prop.value}</div>
												</div>
											);
										})
									)}
								</div>
							</div>

							<hr className={` ${ ns }__card__line col-span-7 col-start-2`} />

							<div className={`col-span-7 col-start-2 lg:-mt-30`}>
								{downloads && (
									downloads.map(item => {
										return (
											<Link key={uniqueId(item.file.mediaItemUrl)} target={'_blank'} to={item.file.mediaItemUrl} className={'block pt-50 lg:pt-40 cursor-pointer'}>
												<div className={'pb-50 lg:pb-40'}>
													<div className={'grid grid-cols-9 gap-15 md:grid-cols-12 md:gap-30 lg:grid-cols-7'}>
														<div className={'shrink-0 col-span-2 md:col-span-1 h-auto lg:row-start-1 lg:col-start-1'}>
															<svg className={'h-auto w-55 md:w-40'} width={'57'} height={'68'} viewBox={'0 0 57 68'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
																<path d={'M26.755 29.3867L19.8476 33.9853C19.5511 38.8318 17.4687 43.4023 13.995 46.8304C10.5213 50.2585 5.8977 52.306 1.0006 52.5849V66.2875C9.56169 65.9928 17.6913 62.4952 23.7494 56.5003C29.8076 50.5054 33.3434 42.4594 33.6436 33.9853L26.755 29.3867Z'} fill={'#FF1415'} />
																<path d={'M53.2466 66.9975H3.74968C3.0204 66.9975 2.321 66.7078 1.80534 66.1921C1.28967 65.6764 0.999983 64.977 1 64.2477V3.75177C0.999983 3.02249 1.28967 2.32307 1.80534 1.80738C2.321 1.29169 3.0204 1.00197 3.74968 1.00195H36.7485L55.9963 20.2507V64.2477C55.9963 64.977 55.7066 65.6764 55.191 66.1921C54.6753 66.7078 53.9759 66.9975 53.2466 66.9975V66.9975Z'} stroke={'white'} strokeLinecap={'round'} strokeLinejoin={'round'} />
																<path d={'M30 1V20H46'} stroke={'white'} strokeLinecap={'round'} strokeLinejoin={'round'} />
															</svg>
														</div>
														<div className={'grid grid-cols-7 gap-15 col-span-7 md:gap-30 md:col-start-2 md:items-center lg:col-start-1 lg:row-start-1'}>
															<div className={`typo-subhead-03 mb-10 col-span-7 md:col-span-3 md:mb-0 md:underline lg:pl-60`}>{item.filename}</div>
															<div className={`col-span-3 md:col-span-2`}>{item.label1}</div>
															<div className={`col-span-2 col-start-4 md:col-span-2`}>{item.label2}</div>
														</div>
													</div>
												</div>
												<hr className={`${ ns }__card__line mt-0`} />
											</Link>

										);
									})
								)}
							</div>
						</div>
					</div>

				</div>
			</div>
			{/* end .container */}

			<div className={'w-full pb-120 lg:pb-590 bg-white'} />
		</div>
	);
};

export default IntroWithOverviewCard;

export const query = graphql`
	fragment IntroWithOverviewCard on WpPage_Pagecomponents_PageComponents_IntroWithOverviewCard {
		fieldGroupName
		topSubline
		topCopy
		headline
		subline
		linkLabel
		linkSublabel
		links {
			link{
				target
				title
				url
			}
		}
		copy
		properties {
			label
			value
		}
		productInformation {
			label
			value
		}
		downloads {
			label1
			filename
			label2
			file {
				srcSet
				sourceUrl
				mediaItemUrl
			}
		}
	}
`;
