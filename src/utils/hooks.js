import { useEffect, useState } from 'react';

const { theme } = require('../../tailwind.config');

const useWindowEventListener = (windowEvent, handlerCallback, useCapture = false) => {
	useEffect(() => {
		const isBrowser = typeof window !== 'undefined';

		if (isBrowser) {
			window.addEventListener(windowEvent, handlerCallback, useCapture);
		}

		return () => {
			window.removeEventListener(windowEvent, handlerCallback, useCapture);
		};
	}, [windowEvent, handlerCallback, useCapture]);
};

/**
 * Returns true if current window width matches mobile breakpoint
 * @param defaultState - default state for initial render, default is false
 * @param breakPoint - tailwind breakpoint to use as max width, default is md
 * @returns isMobile - boolean
 */
export function useIsMobile(
	defaultState = false,
	breakPoint = 'md'
) {
	const [isMobile, setIsMobile] = useState(defaultState);
	const bpWidth = theme.screens[breakPoint].replace('px', '');

	const onResize = () => {
		setIsMobile(window.innerWidth <= bpWidth);
	};

	const events = ['resize', 'orientationchange'];

	useEffect(() => {
		// trigger callback once after initial rendering
		onResize();
		// add event listeners for all events from the array above
		events.forEach(e => {
			window.addEventListener(e, () => {
				onResize();
			});
		});
		// remove event listeners for all events from the array above
		return () => {
			events.forEach(e => {
				window.removeEventListener(e, () => {});
			});
		};
	}, []);

	return isMobile;
}

export default { useWindowEventListener, useIsMobile };
