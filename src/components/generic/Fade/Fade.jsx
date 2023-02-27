import React from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

const ns = `fade`;

const Fade = ({ children, threshold = 0.4, delay = 0 }) => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});
	const { ref, inView } = useInView({
		threshold,
		delay,
		triggerOnce: true,
	});
	return <div ref={ref} className={`${ rootClassnames } ${ inView ? 'fade--in' : '' }`}>{children}</div>;
};

export default Fade;
