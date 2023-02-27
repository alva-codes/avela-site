import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import SignupPopup from '../../components/SignupPopup/SignupPopup';

const nsBase = 'layout';
const ns = `${ nsBase }-default`;

const DefaultLayout = props => {
	const {
		children, location, data,
	} = props;
	const rootClassnames = classNames({
		[`${ nsBase } ${ ns }`]: true,
	});

	const pageSettings = data?.page?.template?.pageSetting;
	const fetchData = useStaticQuery(graphql`
		query test {
			...ACFOptionsHeader
			...ACFOptionsFooter
		}
	`);

	const header = fetchData.wp?.acfOptionsHeader?.header;
	const footer = fetchData.wp?.acfOptionsFooter?.footer;

	const injectGA = () => {
	  if (typeof window == 'undefined') {
	    return null;
	  }
	  window.dataLayer = window.dataLayer || [];
	  function gtag() {
	    window.dataLayer.push(arguments);
	  }
	  gtag('js', new Date());

	  gtag('config', 'G-FYC2L1CLQP');
	};

	useEffect(() => {
		const scrollToAnchor = () => {
			const { hash } = location;
			if (hash) {
				const id = hash.substring(1);
				const element = document.querySelector(`[anchor=${ id }`);
				element.classList.add('scroll-margin-top');
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		};
		setTimeout(() => {
			scrollToAnchor();
		}, 1500);

		document.body.insertAdjacentHTML("beforeend", '<script type="text/javascript">_linkedin_partner_id = "4942065";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];window._linkedin_data_partner_ids.push(_linkedin_partner_id);</script><script type="text/javascript">(function(l) {if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s = document.getElementsByTagName("script")[0];var b = document.createElement("script");b.type = "text/javascript";b.async = true;b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b, s);})(window.lintrk);</script><noscript><img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=4942065&fmt=gif" /></noscript>');

	}, [location]);

	return (
		<>
			{true && process.env.NODE_ENV === 'development' && (
				<div className={'devGrid w-full container'}>
					<div
						className={
							'grid grid-cols-9 md:grid-cols-12 gap-x-15 md:gap-x-30 h-full'
						}
					>
						{Array(12)
							.fill({})
							.map(() => {
								return (
									<div
										className={'col col-span-1'}
										key={new Date().getTime() + Math.random()}
									/>
								);
							})}
					</div>
				</div>
			)}
			<Helmet>
				{
					process.env.GATSBY_COOKIEYES_ID && (
						<script
							id={'cookieyes'}
							type={'text/javascript'}
							src={`https://cdn-cookieyes.com/client_data/${ process.env.GATSBY_COOKIEYES_ID }/script.js`}
						/>
					)
				}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-FYC2L1CLQP"></script>
				<script>{injectGA()}</script>
			</Helmet>
			<div className={rootClassnames}>
				<Header pathname={location.pathname} {...header} {...pageSettings} />
				<main>
					<SignupPopup />
					{children}
				</main>
				<Footer {...footer} />
			</div>
		</>
	);
};

export default DefaultLayout;
