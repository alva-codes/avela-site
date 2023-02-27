import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Rellax from 'rellax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ns = `generic-parallax`;

const Parallax = props => {
	const {
		className, speed, children, disableMobile,
	} = props;
	const rootEl = React.createRef();
	let rellax;

	useEffect(() => {
		const destroyRellax = () => {
			rellax?.destroy();
			rootEl.current
			&& rootEl.current.style.removeProperty('transform');
		};
		const refreshRellax = () => {
			if (!rootEl.current) return;
			if (!(window.innerWidth < 1024 && disableMobile)) {
				rellax = new Rellax(rootEl.current, { center: true, speed });
			} else if (disableMobile) {
				destroyRellax();
			} else {
				rootEl.current.style.removeProperty('transform');
				rellax?.refresh();
			}
		};

		refreshRellax();
		return () => {
			destroyRellax();
		};
	}, []);

	const rootClassnames = classNames(className, {
		[`${ ns }`]: true,
	});

	return (
		<div ref={rootEl} className={rootClassnames}>
			{children}
		</div>
	);
};

Parallax.defaultProps = {
	speed: 1,
	disableMobile: false,
};

export default Parallax;
