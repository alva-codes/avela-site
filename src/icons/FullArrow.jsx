/* eslint-disable template-curly-spacing */
import * as React from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

function FullArrow({ delay = 1000, className = '' }) {
	const svg = React.useRef({
		height: 932,
		width: 684,
	});

	const anim = React.useRef([
		{
			start: 0,
			end: -90,
			x: -svg.current.width * 2,
			y: 0,
			rotate: 70,
			el: null,
		},
	]);

	const reveal = () => {
		gsap
			.timeline({
				onUpdate: () => {
					anim.current[0].el.setAttribute(
						'transform',
						`rotate(${anim.current[0].rotate}, 0, 0)`
					);
				},
			})
			.fromTo(
				anim.current[0],
				{ rotate: anim.current[0].start },
				{
					rotate: anim.current[0].end,
					duration: 1,
					ease: 'Power2.inOut',
				}
			);
	};

	React.useEffect(() => {
		anim.current[0].el = document.getElementById('clip99');
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
				<clipPath id={'clip-path-99'}>
					<rect
						id={'clip99'}
						x={anim.current[0].x}
						y={anim.current[0].y}
						width={svg.current.width * 2}
						height={svg.current.height}
						transform={`rotate(${anim.current[0].start})`}
					/>
				</clipPath>
			</defs>

			<path
				d={'M512.012 0L339.554 116.146C332.153 238.555 280.16 353.991 193.432 440.574C106.704 527.158 -8.73358 578.872 -131 585.916V932C82.7458 924.557 285.719 836.22 436.973 684.807C588.227 533.395 676.506 330.176 684 116.146L512.012 0Z'}
				fill={'#FF1415'}
				clipPath={'url(#clip-path-99)'}
			/>
		</svg>
	);
}

export default FullArrow;
