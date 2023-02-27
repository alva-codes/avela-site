import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import RedCircle from '../icons/RedCircle';

export default function NotFoundPage() {
	const data = useStaticQuery(graphql`
		query GlobalNotFound {
			wp {
				globalSettings {
					globalSettings {
						fieldGroupName
						headline404
						link404 {
							target
							title
							url
						}
					}
				}
			}
		}
	`);

	const { globalSettings } = data?.wp?.globalSettings || null;
	return (
		<div
			className={
				'page-404 pt-200 md:pt-290 pb-160 flex flex-col items-center justify-center'
			}
		>
			<div className={'relative px-10 md:px-0'}>
				<RedCircle isRed />
				<div className={'flex items-center'}>
					<h1 className={'md:pr-25'}>4</h1>
					<div className={'flex flex-col justify-center items-center'}>
						<h2 className={'typo-medium-body-semibold w-full text-center'}>
							{globalSettings.headline404}
						</h2>
						<Link
							className={'hidden md:block typo-medium-body-light'}
							to={globalSettings.link404.url}
						>
							{globalSettings.link404.title}
						</Link>
					</div>
					<h1 className={'md:pl-25'}>4</h1>
				</div>
			</div>
			<Link
				className={'md:hidden typo-medium-body-light pt-115 underline'}
				to={globalSettings.link404.url}
			>
				{globalSettings.link404.title}
			</Link>
		</div>
	);
}
