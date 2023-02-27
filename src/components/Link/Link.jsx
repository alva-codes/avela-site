import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import Button from '../Button/Button';
import { useIsMobile } from '../../utils/hooks';

const ns = `custom-link`;

const Link = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});
	const { linkBuilder, linkBuilderMobile } = props;

	const isMobile = useIsMobile(true, 'lg');
	const data = (isMobile && linkBuilderMobile) ? linkBuilderMobile : linkBuilder;
	return (
		<div className={rootClassnames}>
			<div className={'wrap'}>
				{data && data.map((e, index) => {
					if (e.copy) {
						return <div className={'typo-subhead-01 mb-10 lg:mb-0'} key={+index}>{e.copy}</div>;
					}
					if (e.link) {
						return (
							<Button key={+index} magnetic variant={'large'} to={e.link.url} className={'mb-10 lg:mb-0 lg:mx-20'}>
								{e.link.title}
							</Button>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Link;

export const query = graphql`
	fragment Link on WpPage_Pagecomponents_PageComponents_Link {
		fieldGroupName
		anchor
		linkBuilder {
			... on WpPage_Pagecomponents_PageComponents_Link_LinkBuilder_Copy {
				copy
			}
			... on WpPage_Pagecomponents_PageComponents_Link_LinkBuilder_Link {
				link {
					url
					title
				}
			}
		}
		linkBuilderMobile {
			... on WpPage_Pagecomponents_PageComponents_Link_LinkBuilderMobile_Copy {
				copy
			}
			... on WpPage_Pagecomponents_PageComponents_Link_LinkBuilderMobile_Link {
				link {
					url
					title
				}
			}
		}
	}
`;
