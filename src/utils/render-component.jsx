/* eslint-disable react/no-unknown-property */
import React from 'react';
import uniqueId from 'uniqid';
import HeroGrid from '../components/HeroGrid';
import BrandImage from '../components/BrandImage';
import BrandImageWithDownloads from '../components/BrandImageWithDownloads';
import Citation from '../components/Citation';
import ClaimWithSlider from '../components/ClaimWithSlider';
import ContentList from '../components/ContentList';
import DoubleImageWithCopy from '../components/DoubleImageWithCopy';
import FeaturedBrands from '../components/FeaturedBrands';
import ImageHero from '../components/ImageHero';
import ImageHeroWithCopy from '../components/ImageHeroWithCopy';
import ImageText from '../components/ImageText';
import IntroWithImage from '../components/IntroWithImage';
import IntroWithOverviewCard from '../components/IntroWithOverviewCard';
import Link from '../components/Link';
import Newsroom from '../components/Newsroom';
import Overview from '../components/Overview/Overview';
import Process from '../components/Process';
import Statement from '../components/Statement';
import TeamSlider from '../components/TeamSlider';
import Wysiwyg from '../components/Wysiwyg';
import ContactForm from '../components/ContactForm';
import ContactFormRequestSample from '../components/ContactFormRequestSample';
import InformationRequestForm from '../components/InformationRequestForm';
import InfoSlider from '../components/InfoSlider/InfoSlider';
import BackgroundImageWithContent from '../components/BackgroundImageWithContent';
import StickyImageWithText from '../components/StickyImageWithText';
import HeadingTop from '../components/HeadingTop';
import Accordion from '../components/Accordion';

const renderComponent = (component, wp) => {
	if (!component.fieldGroupName) return null;
	const { acfOptionsInformationRequestForm, acfOptionsContactFormDefault, acfOptionsContactFormRequestSample } = wp;

	const componentName = component.fieldGroupName.split('_').slice(3).join('_');
	switch (componentName) {
	case 'HeroGrid':
		return (
			<HeroGrid
				key={uniqueId('bala-bangles-')}
				{...component}
			/>
		);
	case 'FeaturedBrands':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-FeaturedBrands')}>
				<FeaturedBrands {...component} />
			</div>
		);
	case 'ContentList':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-ContentList')}>
				<ContentList {...component} />
			</div>
		);
	case 'Overview':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Overview')}>
				<Overview {...component} />
			</div>
		);
	case 'Link':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Overview')}>
				<Link {...component} />
			</div>
		);
	case 'Newsroom':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Newsroom')}>
				<Newsroom {...component} />
			</div>
		);
	case 'ImageText':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-ImageText')}>
				<ImageText key={uniqueId('bala-bangles-ImageText')} {...component} />
			</div>
		);
	case 'BrandImage':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-BrandImage')}>
				<BrandImage {...component} />
			</div>
		);
	case 'BackgroundImageWithContent':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-BackgroundImageWithContent')}>
				<BackgroundImageWithContent {...component} />
			</div>
		);
	case 'ClaimWithSlider':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-ClaimWithSlider')}>
				<ClaimWithSlider {...component} />
			</div>
		);
	case 'InfoSlider':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-InfoWithSlider')}>
				<InfoSlider {...component} />
			</div>
		);
	case 'IntroWithImage':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-IntroWithImage')}>
				<IntroWithImage {...component} />
			</div>
		);
	case 'ImageHero':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-ImageHero')}>
				<ImageHero {...component} />
			</div>
		);
	case 'DoubleImageWithCopy':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-DoubleImageWithCopy')}>
				<DoubleImageWithCopy {...component} />
			</div>
		);
	case 'Citation':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Citation')}>
				<Citation {...component} />
			</div>
		);
	case 'Wysiwyg':
		return (
			<div key={uniqueId('bala-bangles-Wysiwyg')}>
				<Wysiwyg {...component} />
			</div>
		);
	case 'TeamSlider':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-TeamSlider')}>
				<TeamSlider {...component} />
			</div>
		);
	case 'BrandImageWithDownloads':
		return (
			<div key={uniqueId('bala-bangles-BrandImageWithDownloads')}>
				<BrandImageWithDownloads anchor={component.anchor} {...component} />
			</div>
		);
	case 'Statement':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Statement')}>
				<Statement {...component} />
			</div>
		);
	case 'IntroWithOverviewCard':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-IntroWithOverviewCard')}>
				<IntroWithOverviewCard {...component} />
			</div>
		);
	case 'Process':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-Process')}>
				<Process {...component} />
			</div>
		);

	case 'ImageHeroWithCopy':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-ImageHeroWithCopy')}>
				<ImageHeroWithCopy {...component} />
			</div>
		);
	case 'StickyImageWithText':
		return (
			<div anchor={component.anchor} key={uniqueId('bala-bangles-StickyImageWithText')}>
				<StickyImageWithText {...component} />
			</div>
		);
	case 'ContactForm':
		return (
			<div key={uniqueId('bala-bangles-ContactForm')}>
				<ContactForm
					{...acfOptionsContactFormDefault.contactFormDefault}
					{...component}
					globalSettings={wp.globalSettings.globalSettings}
				/>
			</div>
		);
	case 'ContactFormRequestSample':
		return (
			<div key={uniqueId('bala-bangles-ContactFormRequestSample')}>
				<ContactFormRequestSample
					{...acfOptionsContactFormRequestSample.contactFormRequestSample}
					{...component}
					globalSettings={wp.globalSettings.globalSettings}
				/>
			</div>
		);
	case 'InformationRequestForm':
		return (
			<div key={uniqueId('bala-bangles-InformationRequestForm')}>
				<InformationRequestForm
					{...acfOptionsInformationRequestForm.informationRequestForm}
					{...component}
					globalSettings={wp.globalSettings.globalSettings}
				/>
			</div>
		);
	case 'HeadingTop':
		return (
			<div key={uniqueId('bala-bangles-HeadingTop')}>
				<HeadingTop {...component} />
			</div>
		);
	case 'Accordion':
		return (
			<div key={uniqueId('bala-bangles-Accordion')}>
				<Accordion {...component} />
			</div>
		);
	default:
		if (process.env === 'development') {
			return (
				<b>
					Component &quot;
					{componentName}
					&quot; not found
				</b>
			);
		}
		return null;
	}
};

export default renderComponent;
