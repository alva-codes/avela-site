import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import uniqueId from 'uniqid';
import Input from '../generic/Input/Input';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';
import Button from '../Button/Button';
import FormStates from '../generic/formStates/formStates';

const ns = `contact-form-request-sample`;

const ContactFormRequestSample = props => { 
	const {
		headlineRs,
		wpFields,
		subHeadlineRs,
		termsOfUseCheckboxRs,
		additionalCopyRs,
		subThankyouRs,
		globalSettings,
	} = props;
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const [formData, setFormData] = useState({});
	const [formErrors, setFormErrors] = useState([]);
	// formState
	// initial || loading || error || success
	const [formState, setFormState] = useState('initial');
	const [countries, setCountries] = useState([]);

	async function fetchCountries() {
		const response = await fetch('https://restcountries.com/v2/all');
		const countryData = await response.json();
		countryData.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
		setCountries(countryData);
	}

	useEffect(() => {
		fetchCountries();
	}, []);

	useEffect(() => {
		document.scrollingElement.scrollTop = 0;
	}, [formState]);

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

		if (type === 'tel') {
			// eslint-disable-next-line
			const regex = /^[0-9\-\(\)\+ ]*$/;
			setFormErrors(prevState => {
				return {...prevState, [id]: !value.match(regex) ? 'Valid phone number required.' : ''};
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

		const formDataCF7 = new FormData();
		Object.entries(formData).forEach(element => {
			formDataCF7.append(element[0], element[1]);
		});
		//	Add subject and name custom
		formDataCF7.append('your-subject', 'Contact Form Request');
		formDataCF7.append('your-name', `${ formData['first-name'] } ${ formData['last-name'] }`);
		// fetch
		fetch(`${ process.env.GATSBY_WORDPRESS_URL }/wp-json/contact-form-7/v1/contact-forms/674/feedback`, {
			method: 'POST',
			body: formDataCF7,
		}).then(r => {
			if (r.ok) {
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

	return (
		<div className={`${ rootClassnames } container mb-300 md:mb-0`}>
			{formState === 'initial' && (
				<div className={'min-h-[calc(100vh-86px)] pt-180 md:grid grid-cols-12 gap-30'}>
					<h1 className={'typo-h1 font-light text-center mb-170 md:mb-0 md:text-60 col-span-12'}>{headlineRs}</h1>
					<div className={'md:col-span-12 lg:col-span-10 lg:col-start-2 md:mb-80 md:text-60'}><p className={'sub-headline-request-sample'}>{subHeadlineRs}</p></div>
					<form action={''} className={'md:col-span-12 lg:col-span-10 lg:col-start-2'} onSubmit={onSubmitHandler}>
						<div className={'mb-50 md:mb-30 md:grid grid-cols-12 gap-30'}>
							{wpFields
					&& (wpFields.map(field => {
						const sizeClass = `col-span-${ field.width.split('/')[0] }`;

						if (field.fieldGroupName.includes('CountrySelect')) {
							return (
								<select
									name={'country'}
									id={field.cf7Key}
									key={field.placeholder}
									className={`${ ns }__select ${ sizeClass } ${ formData.country ? `${ ns }__select--active` : '' } mb-25 md:mb-0  w-full md:w-auto typo-formfield`}
									onChange={onChangeHandler}
									required={field.required}
								>
									<option value={'Select your Country'}>{field.required ? `${ field.placeholder } *` : field.placeholder}</option>
									{countries?.length && countries.map(country => {
										return (
											<option key={country.name} className={''} value={country.alpha2Code}>
												{country.name}
											</option>
										);
									})}
								</select>
							);
						}
						return (
							<Input
								className={`${ sizeClass } w-full mb-25 md:mb-0`}
								key={field.placeholder}
								placeholder={field.required ? `${ field.placeholder } *` : field.placeholder}
								name={field.placeholder}
								id={field.cf7Key}
								type={field.type}
								required={field.required}
								onChange={onChangeHandler}
								error={formErrors[field.placeholder]}
							/>
						);
					}))}
						</div>

						<div className={'mb-50 md:mb-30'}>
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label>
								<Input
									type={'checkbox'}
									onChange={onCheckedHandler}
									name={'termsOfUse'}
									required
									className={'mr-10 inline-block'}
								/>
								<RenderStaticHTML html={termsOfUseCheckboxRs} className={`${ ns }__termsOfUse typo-medium-body-semibold text-white inline-block font-normal`} />
								{formErrors.termsOfUse && (
									<span className={'typo-small-body-light block px-40 mt-5 text-primaryRed opacity-80'}>
										{formErrors.termsOfUse}
									</span>
								)}
							</label>
							<RenderStaticHTML html={subThankyouRs} className={'sub-thank-you-request-sample md:mb-50 md:mt-80'} />
						</div>
						<Button type={'submit'} variant={`medium`} className={'w-full md:w-210'}>Submit</Button>
					</form>
				</div>
			)}
			<FormStates
				globalSettings={globalSettings}
				formState={formState}
				onSubmitHandler={onSubmitHandler}
				onPostSuccessHandler={() => {
					clearForm({state: 'initial'});
				}}
			/>

			{additionalCopyRs && (
				<div className={'md:grid grid-cols-12'}>
					<div className={'col-span-12 lg:col-span-10 lg:col-start-2 mt-100 mb-150 md:my-120'}>
						<RenderStaticHTML html={additionalCopyRs} className={`typo-legal-copy ${ ns }__legal `} />
					</div>
				</div>
			)}

		</div>
	);
};

export default ContactFormRequestSample;

export const query = graphql`
	fragment ContactFormRequestSample on WpPage_Pagecomponents_PageComponents_ContactFormRequestSample {
		fieldGroupName	
	}
`;
