import React, { useEffect, Children } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ns = `generic-horizontal-scroll`;

const HorizontalScroll = props => {
	const {
		title,
		fixedContent,
		children,
		className,
		extendScroll = 0,
		extendLastSlide = 0,
		slidePositions = {},
	} = props;

	const pin = React.createRef();
	const fixed = React.createRef();
	const track = React.createRef();

	useEffect(() => {
		const getScrollWidth = () => {
			if (!track.current) return 0;
			let scrollWidth = track.current.scrollWidth - track.current.offsetWidth;
			if (typeof extendScroll === 'number') 	scrollWidth += extendScroll;
			if (typeof extendScroll === 'function') scrollWidth += extendScroll();
			return scrollWidth;
		};
		const getSlideOffset = index => {
			if (!track.current) return 0;
			return track.current.children[index].offsetLeft;
		};

		setTimeout(() => {
			if (!pin?.current) return;
			const tl = gsap
				// ping the pin element when it's center is in the center of the screen
				// for the same amount of pixels we want to scroll the track
				.timeline({
					scrollTrigger: {
						trigger: pin.current,
						start: 'center 55%',
						end: () => { return `+=${ getScrollWidth() * 1.5 }`; },
						pin: pin.current,
						invalidateOnRefresh: true,
						anticipatePin: 1,
						scrub: true,
					},
				})
				// scroll the track for the required amount
				// using native scrollWidth propery

				// added this back in for smooth scrolling
				.to(track.current, {
					duration: 1,
					x: () => { return getScrollWidth() * -1; },
					ease: 'none',
				}, 0);
				//

			// always make sure the last slide state is removed just before/after
			// scrolling through the last slide
			// .add(() => {
			// 	if (!pin.current) return;
			// 	pin.current.classList.remove('is--last-slide');
			// }, 1 - (1 / Children.count(children)));

			// instead of "overflow-like scrolling"
			// scroll the track along in steps like a slider
			track.current.children[0]?.classList?.add('is--visible');
			fixed.current.children[0]?.classList?.add('is--visible');

			// setup the timeline, so that when hitting the scroll
			// threshold for each step, the current slide is automatically
			// scrolled into view
			// the transition is not handled by gsap, but through CSS
			for (let index = 0; index < Children.count(children); index += 1) {
				const step = 1 / (Children.count(children));
				const position = slidePositions[index]
					? slidePositions[index]
					: (step * index);
				tl
					//
					// removed this for smooth scrolling
					// .to(track.current, {
					// 	duration: 0,
					// 	x: () => { return getSlideOffset(index) * -1; },
					// 	ease: 'none',
					// }, position)
					//
					.add(() => {
						if (!track.current) return;

						// For some reason the index needs to be adjusted
						// when scrollTrigger is scrubbing the timeline
						// in reverse
						let adjustedIndex = index;
						if (tl.scrollTrigger.direction < 0) adjustedIndex -= 1;
						if (adjustedIndex < 0) adjustedIndex = 0;
						// console.log('index', index);
						// console.log('direction', tl.scrollTrigger.direction);
						// console.log('adjustedIndex', adjustedIndex);
						// console.log('slideOffset', getSlideOffset(index) * -1);

						[...track.current.children, ...fixed.current.children]
							.forEach(el => {
								return el.classList.remove('is--visible');
							});
						track.current.children[adjustedIndex]?.classList?.add('is--visible');
						fixed.current.children[adjustedIndex]?.classList?.add('is--visible');
						pin.current.classList.toggle(
							'is--last-slide',
							adjustedIndex === Children.count(children) - 1
						);
					}, position);
			}
			// make sure timeline ends at 1:
			tl.add(() => { return true; }, 1 + extendLastSlide);
		}, 100);
	}, [pin, track, children]);

	return (
		<div className={`${ ns } ${ className }`} ref={pin}>
			<div className={'container'}>
				{title && (
					<p className={`${ ns }__title typo-eyebrow mb-16 relative z-10`}>
						{title}
					</p>
				)}
				<div className={`${ ns }__fixed flex`} ref={fixed}>{fixedContent}</div>
			</div>
			<div
				ref={track}
				className={`${ ns }__track flex`}
				onTouchEnd={e => { return e.preventDefault(); }}
			>
				{children}
			</div>
		</div>
	);
};

export default HorizontalScroll;
