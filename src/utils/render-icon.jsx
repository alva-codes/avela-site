import React from 'react';

import CarrotDown from '../icons/CarrotDown';
import CarrotRight from '../icons/CarrotRight';
import CarrotLeft from '../icons/CarrotLeft';
import Cart from '../icons/Cart';
import Facebook from '../icons/Facebook';
import Instagram from '../icons/Instagram';
import Logo from '../icons/Logo';
import Menu from '../icons/Menu';
import Search from '../icons/Search';
import Twitter from '../icons/Twitter';
import X from '../icons/X';

const renderIcon = icon => {
	if (!icon) return null;

	switch (icon) {
	case 'carrot-down':
		return <CarrotDown />;
	case 'carrot-left':
		return <CarrotLeft />;
	case 'carrot-right':
		return <CarrotRight />;
	case 'cart':
		return <Cart />;
	case 'facebook':
		return <Facebook />;
	case 'instagram':
		return <Instagram />;
	case 'logo':
		return <Logo />;
	case 'menu':
		return <Menu />;
	case 'search':
		return <Search />;
	case 'twitter':
		return <Twitter />;
	case 'x':
		return <X />;
	default:
		return null;
	}
};

export default renderIcon;
