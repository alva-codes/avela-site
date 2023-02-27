/* eslint-disable template-curly-spacing */
import * as React from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

function RedCircle({ isRed, isMobile }) {
	const svg = React.useRef({
		// height: 499,
		// heightHalf: 499 / 2,
		height: 518,
		heightHalf: 518 / 2,
		width: 518,
		widthHalf: 518 / 2,
	});

	const anim = React.useRef([
		{
			start: -15, // -15
			end: -115, // -105
			x: svg.current.heightHalf - 40,
			y: svg.current.widthHalf - 16,
			rotate: 0,
			el: null,
		},
		{
			start: 80,
			end: -18,
			x: svg.current.heightHalf - 12,
			y: svg.current.widthHalf - 10,
			rotate: 0,
			el: null,
		},
		{
			start: 165,
			end: 71,
			x: svg.current.heightHalf - 12,
			y: svg.current.widthHalf - 2,
			rotate: 0,
			el: null,
		},
	]);
	const origin = `${svg.current.widthHalf}, ${svg.current.heightHalf}`;

	const reveal = () => {
		const duration = 0.6;
		gsap
			.timeline({
				onUpdate: () => {
					anim.current[0].el.setAttribute(
						'transform',
						`rotate(${anim.current[0].rotate}, ${origin})`
					);
					anim.current[1].el.setAttribute(
						'transform',
						`rotate(${anim.current[1].rotate}, ${origin})`
					);
					anim.current[2].el.setAttribute(
						'transform',
						`rotate(${anim.current[2].rotate}, ${origin})`
					);
				},
			})
			.fromTo(
				anim.current[0],
				{ rotate: anim.current[0].start },
				{
					rotate: anim.current[0].end,
					duration,
					ease: 'Power2.inOut',
					delay: duration * 2 - 0.22,
				}
			)
			.fromTo(
				anim.current[1],
				{ rotate: anim.current[1].start },
				{
					rotate: anim.current[1].end,
					duration,
					delay: duration - 0.22,
					ease: 'Power2.inOut',
				},
				0
			)
			.fromTo(
				anim.current[2],
				{ rotate: anim.current[2].start },
				{
					rotate: anim.current[2].end,
					duration,
					delay: 0,
					ease: 'Power2.inOut',
				},
				0
			);
	};

	const { ref, inView } = useInView({
		threshold: isMobile ? 0 : 0.25,
		triggerOnce: true,
	});

	React.useEffect(() => {
		anim.current[0].el = document.getElementById('clip0');
		anim.current[1].el = document.getElementById('clip1');
		anim.current[2].el = document.getElementById('clip2');
		return () => {};
	}, []);

	React.useEffect(() => {
		if (inView) {
			reveal();
		}
	}, [inView]);

	return (
		<svg
			ref={ref}
			id={'svg'}
			width={`${svg.current.width}px`}
			height={`${svg.current.height}px`}
			viewBox={`0 0 ${svg.current.width} ${svg.current.height}`}
		>
			<defs>
				<clipPath id={'clip-path-0'}>
					<rect
						id={'clip0'}
						x={anim.current[0].x}
						y={anim.current[0].y}
						width={'400'}
						height={'400'}
						transform={`rotate(${anim.current[0].start}, ${origin})`}
						fill={'blue'}
					/>
				</clipPath>

				<clipPath id={'clip-path-1'}>
					<rect
						id={'clip1'}
						x={anim.current[1].x}
						y={anim.current[1].y}
						width={'400'}
						height={'400'}
						transform={`rotate(${anim.current[1].start}, ${origin})`}
						fill={'red'}
					/>
				</clipPath>

				<clipPath id={'clip-path-2'}>
					<rect
						id={'clip2'}
						x={anim.current[2].x}
						y={anim.current[2].y}
						width={'400'}
						height={'400'}
						transform={`rotate(${anim.current[2].start}, ${origin})`}
						fill={'red'}
					/>
				</clipPath>
			</defs>

			<path
				stroke={isRed ? '#FF1415' : '#fed130'}
				strokeWidth={50}
				d={'M216.673347,27.825138 C265.16903,19.8498181 315.094882,28.8614395 357.893953,53.5801653 C397.085091,76.2145356 427.8553,110.606581 446.068993,151.55597 L446.068993,151.55597 L399.631412,163.999154 C385.204889,135.063713 362.551572,110.802108 334.277299,94.4216351 C302.792249,76.1810236 266.296269,68.8471203 230.421572,73.3394583 L230.421572,73.3394583 L207.794234,53.6175662 Z'}
				clipPath={'url(#clip-path-0)'}
			/>
			<path
				stroke={isRed ? '#FF1415' : '#fed130'}
				strokeWidth={50}
				d={'M444.4123,226.65504 L470.18826,235.501597 C478.17453,283.990882 469.177587,333.915411 444.472445,376.718916 C421.850926,415.914438 387.470393,446.692474 346.529453,464.918339 L346.529453,464.918339 L334.073486,418.432776 C363.016475,404.013549 387.28523,381.360621 403.667741,353.083259 C421.9113,321.594361 429.23988,285.093157 424.734863,249.215834 L424.734863,249.215834 L444.4123,226.65504 Z'}
				clipPath={'url(#clip-path-1)'}
			/>
			<path
				stroke={isRed ? '#FF1415' : '#fed130'}
				strokeWidth={50}
				d={'M79.4888206,352.772218 C93.8949038,381.712237 116.534626,405.980883 144.80125,422.367386 C176.281906,440.616049 212.780299,447.949958 248.654147,443.447164 L248.654147,443.447164 L271.277811,463.166366 L262.400076,488.954606 C213.906558,496.916745 163.986435,487.899262 121.190051,463.182716 C82.0030356,440.55072 51.232517,406.166936 33.0100483,365.226366 L33.0100483,365.226366 Z'}
				clipPath={'url(#clip-path-2)'}
			/>
		</svg>
	);
}

export default RedCircle;
