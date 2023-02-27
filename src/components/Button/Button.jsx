/* eslint-disable operator-linebreak */
/* eslint-disable template-curly-spacing */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Power2, TweenMax } from 'gsap';
import { Link } from 'gatsby';
import SafeAnchor from '../generic/SafeAnchor';
import { isExternalUrl } from '../../utils';

/*
- href prop wll create a regular a-tag but still with button classes
- variant - prop will add a modifier to classname
*/

const ns = `button`;

const Button = React.forwardRef(
	// eslint-disable-next-line object-curly-newline
	({ className, variant, type, to, href, magnetic, ...props }, ref) => {
		// define button classes
		const rootClassnames = classNames(
			className,
			`${ns}`,
			magnetic && `${ns}--magnetic`,
			variant && `${ns}--${variant}`
		);

		const root = useRef();
		const inner = useRef();
		const [animate, setAnimate] = useState(undefined);
		const [isMobile, setMobile] = useState(false);

		useEffect(() => {
			setMobile(window.innerWidth < 1024);
			window.addEventListener('resize', () => {
				setMobile(window.innerWidth < 1024);
			});
			return () => {
				window.removeEventListener('resize', () => {});
			};
		}, []);

		const parallaxIt = (e, movement) => {
			const relX = e.pageX - root.current.offsetLeft;
			const relY = e.pageY - root.current.offsetTop;
			TweenMax.to(root.current, 0.3, {
				x:
					((relX - root.current.clientWidth / 2) / root.current.clientWidth) *
					(movement + 5),
				y:
					((relY - root.current.clientHeight / 3) / root.current.clientHeight) *
					(movement + 5) - root.current.clientHeight / 4,
				ease: Power2.easeOut,
				duration: 1,
			});
		};

		const callParallax = e => {
			if (isMobile) return;
			parallaxIt(e, 10);
		};

		const onMouseLeave = () => {
			setAnimate(false);
			if (!magnetic || isMobile) return;
			TweenMax.to(root.current, 0.3, { scale: 1, x: 0, y: 0 });
		};

		const onMouseEnter = () => {
			if (isMobile) return;
			setAnimate(true);
		};

		const onMouseMove = e => {
			if (!magnetic || isMobile) return;
			callParallax(e);
		};

		if (href || isExternalUrl(to)) {
			return (
				<SafeAnchor
					{...props}
					href={href || to}
					ref={root}
					onMouseMove={onMouseMove}
					onMouseLeave={onMouseLeave}
					onMouseEnter={onMouseEnter}
					target={'_blank'}
					className={classNames(rootClassnames, props.disabled && 'disabled')}
				>
					<div ref={inner}>{props.children}</div>
				</SafeAnchor>
			);
		}

		if (to) {
			return (
				<Link
					{...props} // eslint-disable-line
					to={to || '/'}
					ref={root}
					onMouseMove={onMouseMove}
					onMouseLeave={onMouseLeave}
					onMouseEnter={onMouseEnter}
					className={`${rootClassnames} ${animate ? `${ns}--animate` : ''} ${animate === false ? `${ns}--revert` : ''}`}
				>
					<div ref={inner}>{props.children}</div>
				</Link>
			);
		}

		return (
			<button
				{...props}
				ref={root}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				className={`${rootClassnames} ${animate ? `${ns}--animate` : ''} ${animate === false ? `${ns}--revert` : ''}`}
			>
				<div ref={inner}>{props.children}</div>
			</button>
		);
		/* eslint-enable */
	}
);

export default Button;
