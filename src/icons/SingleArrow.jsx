/* eslint-disable template-curly-spacing */
import * as React from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

function SingleArrow({ delay = 1000, className = '' }) {
	const svg = React.useRef({
		height: 344,
		width: 393,
	});

	const anim = React.useRef([
		{
			start: 180,
			end: 90,
			x: svg.current.width,
			y: 0,
			rotate: 70,
			el: null,
		},
	]);

	const reveal = () => {
		const origin = `${anim.current[0].x} ${anim.current[0].y}`;
		gsap
			.timeline({
				onUpdate: () => {
					anim.current[0].el.setAttribute(
						'transform',
						// `rotate(${anim.current[0].rotate})`
						`rotate(${anim.current[0].rotate}, ${origin})`
					);
				},
			})
			.fromTo(
				anim.current[0],
				{ rotate: anim.current[0].start },
				{
					rotate: anim.current[0].end,
					duration: 1,
					// transformOrigin: 'top left',
					ease: 'Power2.inOut',
				}
			);
	};

	React.useEffect(() => {
		anim.current[0].el = document.getElementById('clip100');
		return () => {};
	}, []);

	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: true,
	});

	React.useEffect(() => {
		if (inView) {
			setTimeout(() => {
				reveal();
			}, delay);
		}
	}, [inView]);

	return (
		<svg
			className={className}
			ref={ref}
			width={svg.current.width}
			height={svg.current.height}
			viewBox={`0 0 ${svg.current.width} ${svg.current.height}`}
		>
			<defs>
				<clipPath id={'clip-path-100'}>
					<rect
						id={'clip100'}
						x={anim.current[0].x}
						y={anim.current[0].y}
						width={svg.current.height * 2}
						height={svg.current.width}
						transform={`rotate(${anim.current[0].start})`}
					/>
				</clipPath>
			</defs>
			<path
				fill={'#FF1415'}
				d={'M15.7955 14.8961H132.424C138.527 66.1842 162.048 113.826 199.059 149.866C236.07 185.906 284.33 208.161 335.779 212.914L375.516 271.406L336.871 328.707C254.536 323.776 176.741 289.328 117.763 231.685C58.7851 174.042 22.5812 97.0703 15.7955 14.8961ZM0 0C3.16297 90.2279 40.434 175.9 104.297 239.74C168.16 303.58 253.863 340.838 344.123 344L393 271.406L344.123 198.614C292.492 195.533 243.792 173.601 207.273 136.986C170.755 100.37 148.962 51.6216 146.034 0H0Z'}
				id={'Path'}
				clipPath={'url(#clip-path-100)'}
			/>
		</svg>
	);
}

export default SingleArrow;
