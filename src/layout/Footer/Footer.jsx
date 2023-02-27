import React, {useEffect, useState} from 'react';
import { graphql } from 'gatsby';
// import Reaptcha from 'reaptcha';
import classNames from 'classnames';
import Link from '../../components/generic/Link';
import Logo from '../../icons/Logo';
import Input from '../../components/generic/Input/Input';
import Button from '../../components/Button/Button';
import FormStates from '../../components/generic/formStates/formStates';

const ns = `site-footer`;

const Footer = props => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const {
		claimSubline,
		claimHeadline,
		copyrightHeadline,
		copyrightSubline,
		navigation,
		secondaryNavigation,
		titleForm,
		newsletterSignUp,
	} = props;

	const [formData, setFormData] = useState({});
	const [formErrors, setFormErrors] = useState([]);
	// formState
	// initial || loading || error || success
	const [formState, setFormState] = useState('initial');

	// useEffect(() => {
	// 	document.scrollingElement.scrollTop = 0;
	// }, [formState]);

	const clearForm = (options = {data: {}, errors: [], state: 'initial'}) => {
		setFormData(options.data || {});
		setFormState(options.state || 'initial');
		setFormErrors(options.errors || []);
	};

	const onChangeHandler = e => {
		const {
			type, required, value, id,
		} = e.target;

		if (required) {
			setFormErrors(prevState => {
				return {...prevState, [id]: value.length === 0 ? 'This field is required.' : ''};
			});
		}

		if (type === 'email') {
			// https://en.wikipedia.org/wiki/Email_address
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
			// eslint-disable-next-line
			const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			setFormErrors(prevState => {
				return {...prevState, [id]: !value.match(regex) ? 'Valid email address required.' : ''};
			});
		}

		setFormData(prevState => {
			return {...prevState, [id]: value};
		});
	};

	const onCheckedHandler = e => {
		const { required, name, checked } = e.target;

		if (required) {
			setFormErrors(prevState => {
				return {...prevState, [name]: checked ? '' : 'This field is required.'};
			});
		}

		setFormData(prevState => {
			return {...prevState, [name]: checked};
		});
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		setFormState('loading');

		const formDataGR = new FormData();
		Object.entries(formData).forEach(element => {
			formDataGR.append(element[0], element[1]);
		});
		//	Add subject and name custom
		formDataGR.append('input_5.3', `${ formData['name'] }`);
		formDataGR.append('input_7', `${ formData['email'] }`);
		// formDataGR.append('your-subject', 'Newsletter Sign Up');
		// formDataGR.append('your-name', `${ formData['text'] }`);
		// formDataGR.append('your-email', `${ formData['email'] }`);

		// fetch
		// /wp-json/gf/v2/forms/6/submissions
		// /wp-json/contact-form-7/v1/contact-forms/1500/feedback
		fetch(`${ process.env.GATSBY_WORDPRESS_URL }/wp-json/gf/v2/forms/6/submissions`, {
			method: 'POST',
			body: formDataGR,
		}).then(r => {
			if (r.ok) {
				var newsletter_sign_up = document.getElementsByClassName('newsletterSignUp');
				if(newsletter_sign_up.length){
					newsletter_sign_up[0].innerHTML = '<p className="text-success" >Thanks for joining! Welcome to Avela.</p>';
				}
				console.log(newsletter_sign_up);
				setTimeout(() => {
					clearForm({state: 'success'});
				}, 500);
			} else {
				setTimeout(() => {
					setFormState('error');
				}, 500);
			}
		}).catch(error => {
			setTimeout(() => {
				setFormState('error');
			}, 500);
			console.log(error);
		});
	};

	const onVerify = recaptchaResponse => {
		const submit_footer = document.getElementById('submit-form-footer');
		submit_footer.removeAttribute('disabled');
	};
	
	return (
		<footer className={rootClassnames}>
			<div className={`container pt-130 pb-40`}>
				<div
					className={'grid grid-cols-9 md:grid-cols-12 gap-x-15 md:gap-x-30'}
				>
					<div
						className={
							'logo-container col-span-full flex  justify-end md:col-start-9 md:col-span-3'
						}
					>
						<Link to={'/'}>
							<Logo />
						</Link>
					</div>
					<div className={'col-span-full col-form lg:col-start-2 '}>
						<div className={'newletter_form'}>
							<h3 className={'title_form'}>{titleForm}</h3>
							{/* {newsletterSignUp.map(newsletters => { */}
							{/* 	return ( */}
							{/* 		<NewsletterSignUp newsletterSUname={newsletters.name} newsletterSUemail={newsletters.email} onSubmitHandler={onSubmitHandler} onVerify={onVerify} /> */}
							{/* 	); */}
							{/* })} */}
							<div className={'newsletterSignUp'}>
								<form action={''} className={'md:col-span-12 flex'} onSubmit={onSubmitHandler}>
									<div className={'input-max'}>
										<div className={'mr-10 inline-block'}>
											<input
												placeholder="Your Name *"
												type="text"
												name="name"
												value={formData.name}
												onChange={onChangeHandler}
												id={'name'}
												required
												className={'input input--text typo-formfield has-text'}
											/>
										</div>
									</div>
									<div className={'input-max'}>
										<div className={'mr-10 inline-block'}>
											<input
												placeholder="Your Email *"
												type="email"
												name="email"
												value={formData.email}
												onChange={onChangeHandler}
												id={'email'}
												required
												className={'input input--email typo-formfield has-text'}
											/>
										</div>
									</div>
									{/* <Reaptcha sitekey={`6Lca0-AjAAAAACRPR3M6pKZZTW2gil1Z-s120-I8`} onVerify={onVerify} /> */}
									<Button type={'submit'} variant={`medium`} className={'w-full md:w-210'} id={'submit-form-footer'} >Stay Connected</Button>
								</form>
							</div>
						</div>
						<h3 className={'claim-subline'}>{claimSubline}</h3>
						<h2 className={'typo-subhead-01 '}>{claimHeadline}</h2>
					</div>
					<MainNavigation navigation={navigation} newsletterSignUp={newsletterSignUp} onSubmitHandler={onSubmitHandler} onVerify={onVerify} />
					<div
						className={
							'col-span-full lg:col-start-2 lg:col-span-10 lg:flex lg:justify-between md:mt-125'
						}
					>
						<SecondaryNavigation secondaryNav={secondaryNavigation} />
						<div className={'md:col-start-2 copy-wrapper'}>
							<div className={'copyright-headline mb-5'} dangerouslySetInnerHTML={{ __html: copyrightHeadline }} />
							<div className={'copyright-subline'} dangerouslySetInnerHTML={{ __html: copyrightSubline }} />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

const MainNavigation = ({ navigation = [], newsletterSignUp, onSubmitHandler, onVerify }) => {
	return (
		<div className={'main-navigation col-span-full lg:col-start-2 md:flex'}>
			{navigation.map(nav => {
				return (
					<div key={nav.mainLink.id} className={'mt-70 navigation-wrapper flex flex-col'}>
						<Link
							className={'main-link pb-25 md:pb-20'}
							to={nav.mainLink.uri}
							sameTab
						>
							{nav.mainLink.title}
						</Link>
						{nav.anchors && (
							<Anchors anchors={nav.anchors} parentLink={nav.mainLink.uri} />
						)}
					</div>
				);
			})}
			{/* {newsletterSignUp.map(newsletters => { */}
			{/* 	return ( */}
			{/* 		<NewsletterSignUp newsletterSUemail={newsletters.email} onSubmitHandler={onSubmitHandler} onVerify={onVerify} /> */}
			{/* 	); */}
			{/* })} */}
		</div>
	);
};

const NewsletterSignUp = ({ newsletterSUname, newsletterSUemail, onSubmitHandler, onVerify }) => {
	return (
		<div className={'newsletterSignUp'}>

			<form action={''} className={'md:col-span-12 flex'} onSubmit={onSubmitHandler}>
				{newsletterSUname.map(newsletterName => {
					if (!newsletterName) return null;
					return (
						<div className={'input-max'}>
							<Input
								placeholder={`${newsletterName.placeholderName} *`}
								type={newsletterName.typeName}
								key={newsletterName.placeholderName}
								name={newsletterName.placeholderName}
								id={newsletterName.cf7KeyName}
								required
								className={'mr-10 inline-block'}
							/>
						</div>
					);
				})}
				{newsletterSUemail.map(newsletterEmail => {
					if (!newsletterEmail) return null;
					return (
						<div className={'input-max'}>
							<Input
								placeholder={`${newsletterEmail.placeholderEmail} *`}
								type={newsletterEmail.typeEmail}
								key={newsletterEmail.placeholderEmail}
								name={newsletterEmail.placeholderEmail}
								id={newsletterEmail.cf7KeyEmail}
								required
								className={'mr-10 inline-block'}
							/>
						</div>
					);
				})}
				{/* <Reaptcha sitekey={`6Lca0-AjAAAAACRPR3M6pKZZTW2gil1Z-s120-I8`} onVerify={onVerify} /> */}
				<Button type={'submit'} variant={`medium`} className={'w-full md:w-210'} id={'submit-form-footer'} >Stay Connected</Button>
			</form>
		</div>
	);
};

const SecondaryNavigation = ({ secondaryNav }) => {
	return (
		<div className={'secondary-navigation mt-70 mb-35 md:order-2 md:mt-0'}>
			{secondaryNav?.map(second => {
				if (!second) return null;
				return (
					<Link
						key={second.page.id}
						to={second.page.uri}
						className={'second-nav-item'}
						sameTab
					>
						{second.page.title}
					</Link>
				);
			})}
		</div>
	);
};

const Anchors = ({ anchors = [], parentLink }) => {
	return (
		<div className={'anchors-container'}>
			{anchors.map(anchor => {
				switch(anchor.link.title) {
				    case 'twitter':
				      	return (
							<Link className={'anchor-link block item-anchor avelaup-icon-twitter'} key={anchor.link.title} to={anchor.link.url}><img src={'https://wp.avelaup.com/wp-content/uploads/2022/11/icon-twitter.svg'} alt={'twitter'} /></Link>
						);
					case 'instagram':
				      	return (
							<Link className={`anchor-link block item-anchor avelaup-icon-instagram`} key={anchor.link.title} to={anchor.link.url}><img src={'https://wp.avelaup.com/wp-content/uploads/2022/11/icon-instagram.svg'} alt={'instagram'} /></Link>
						);
					case 'linkedin':
				      	return (
							<Link className={`anchor-link block item-anchor avelaup-icon-linkedin`} key={anchor.link.title} to={anchor.link.url}><img src={'https://wp.avelaup.com/wp-content/uploads/2022/11/icon-linkedin.svg'} alt={'linkedin'} /></Link>
						);
				    default:
				      	return (
							<Link className={`anchor-link block item-anchor`} key={anchor.link.title} to={anchor.link.url}>{anchor.link.title}</Link>
						);
				} 
				return (
					<Link
						key={anchor.anchor}
						sameTab
						to={`${ parentLink }${ anchor.anchor }`}
						className={`anchor-link block item-anchor`}
					>
						{anchor.label}
					</Link>
				);
			})}
		</div>
	);
};

export const query = graphql`
	fragment ACFOptionsFooter on Query {
		wp {
			acfOptionsFooter {
				footer {
					claimHeadline
					claimSubline
					copyrightHeadline
					copyrightSubline
					titleForm
					navigation {
						mainLink {
							... on WpPage {
								id
								link
								uri
								title
								slug
							}
						}
						anchors {
							anchor
							label
							link {
								title
								url
							}
						}
					}
					secondaryNavigation {
						page {
							... on WpPage {
								id
								link
								slug
								title
								uri
							}
						}
					}
					newsletterSignUp {
						name {
				          cf7KeyName
				          placeholderName
				          typeName
				        }
						email {
				          cf7KeyEmail
				          placeholderEmail
				          typeEmail
				        }
					}
				}
			}
		}
	}
`;
