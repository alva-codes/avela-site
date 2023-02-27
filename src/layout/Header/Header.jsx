/* eslint-disable max-len */
import React, { useEffect, useState, createRef } from 'react';
import { graphql, Link } from 'gatsby';
import Headroom from 'headroom.js';
import Button from '../../components/Button/Button';
import Logo from '../../icons/Logo';

const ns = `site-header`;

const Header = props => {
	const { pathname, nav, invertNavigation } = props;
	const [mobileVariant, setMobile] = useState(null);
	const [openMenu, openMobileMenu] = useState(false);
	const desktopHeaderRef = createRef();
	const mobileHeaderRef = createRef();

	useEffect(() => {
		setMobile(window.innerWidth < 1024);
		window.addEventListener('resize', () => {
			setMobile(window.innerWidth < 1024);
		});
		return () => {
			window.removeEventListener('resize', () => {});
		};
	}, []);

	const filteredNav = nav.filter(e => { return e.page !== null; });

	useEffect(() => {
		if (openMenu) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [openMenu]);

	useEffect(() => {
		if (!desktopHeaderRef.current) return;
		const headroom = new Headroom(desktopHeaderRef.current);
		headroom.init();
	}, [desktopHeaderRef]);

	useEffect(() => {
		if (!mobileHeaderRef.current) return;
		const headroom = new Headroom(mobileHeaderRef.current, { offset: 10 });
		headroom.init();
	}, [mobileHeaderRef]);

	const mobileHeader = (
		<>
			<header ref={mobileHeaderRef} className={'fixed top-0 inset-x-0 w-full mobile-header'}>
				<div className={'logo'} role={'none'} onClick={() => { return openMobileMenu(false); }}>
					<Link to={'/'}>
						<Logo inverted={invertNavigation && !openMenu} />
					</Link>
				</div>
				<span
					className={`${ (invertNavigation && !openMenu) ? 'text-black' : 'text-white' }`}
					onClick={() => {
						openMobileMenu(!openMenu);
					}}
					role={'none'}
				>
					{openMenu ? 'CLOSE' : 'MENU'}
				</span>
			</header>
			<div className={`menu-overlay ${ openMenu ? 'menu-overlay--open' : '' }`}>
				<ul className={'links'}>
					{filteredNav && filteredNav.map(obj => {
						const { page } = obj;
						return (
							<li key={page.title} onClick={() => { return openMobileMenu(false); }} role={'none'}>
								<Link
									className={`relative text-white typo-nav-links nav-item ${
										(page?.uri && page.uri.includes(pathname) && pathname !== '/') ? 'current-page' : ''
									}`}
									to={page.uri}
								>
									{page.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);

	const desktopHeader = (
		<header ref={desktopHeaderRef} className={`fixed top-0 inset-x-0 w-full ${ invertNavigation ? 'invertedTheme' : '' }`}>
			<div className={'container'}>
				<div className={'lg:grid grid-cols-12 gap-x-30'}>
					<div className={'col-span-10 col-start-2 flex items-center'}>
						<Link to={'/'} className={'mr-auto'}>
							<Logo inverted={invertNavigation} />
						</Link>
						{filteredNav && filteredNav.map((obj, index) => {
							const { page } = obj;
							const isCurrentPage = page?.uri?.includes(pathname) && pathname !== '/';
							if (page?.title?.toLowerCase() === 'request sample') {
								return (
									<Button
										variant={'small'}
										className={`
											ml-auto
											${ invertNavigation ? 'text-black' : 'text-white' }
											${ isCurrentPage ? 'current-page' : '' }
										`}
										to={page.uri}
										key={page.title}
									>
										{page.title}
									</Button>
								);
							}
							return (
								<Link
									className={`${ invertNavigation ? 'text-black' : 'text-white' } nav-item typo-nav-links ${ index > 0 ? 'ml-60' : '' }
						${ isCurrentPage ? 'current-page' : '' }`}
									to={page.uri}
									key={page.title}
								>
									{page.title}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</header>
	);

	return (
		<div className={`${ ns } ${ invertNavigation ? 'inverted' : '' } z-30`}>{mobileVariant !== null && (mobileVariant ? mobileHeader : desktopHeader)}</div>
	);
};

export default Header;

export const query = graphql`
	fragment ACFOptionsHeader on Query {
		wp {
			acfOptionsHeader {
				header {
					nav {
						page {
							... on WpPage {
								id
								slug
								link
								title
								uri
							}
						}
					}
				}
			}
		}
	}
`;
