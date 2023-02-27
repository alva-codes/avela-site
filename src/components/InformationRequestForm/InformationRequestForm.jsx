import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import Input from '../generic/Input/Input';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';
import Button from '../Button/Button';
import FormStates from '../generic/formStates/formStates';

const ns = `information-request-form`;

const InformationRequestForm = props => {
	const {
		bottomNote,
		documentUploadText,
		headline,
		type: requestType,
		builder,
		globalSettings,
	} = props;

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	// formState
	// initial || loading || error || success
	const [formState, setFormState] = useState('initial');
	const [formData, setFormData] = useState({ });
	const [formErrors, setFormErrors] = useState([]);
	const [fileName, setFileName] = useState('');
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

	const clearForm = () => {
		setFormData({});
		setFormState('initial');
		setFormErrors({});
	};

	const onChangeHandler = e => {
		const {
			type, required, id, value,
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

	const onRadioChangeHandler = e => {
		setFormData(prevState => {
			return {...prevState, type: e.target.value};
		});
	};

	const onFileReset = e => {
		e.preventDefault();
		e.stopPropagation();
		e.target.querySelector('input').value = [];
		setFileName('');
		setFormErrors(prevState => {
			return {...prevState, upload: false};
		});
	};

	const onFileHandler = e => {
		setFormData(prevState => {
			return {...prevState, document: e.target.files[0]};
		});
		setFileName(e.target.files[0].name);
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		setFormState('loading');

		const formDataCF7 = new FormData();
		Object.entries(formData).forEach(element => {
			formDataCF7.append(element[0], element[1]);
		});
		//	Add subject and name custom
		formDataCF7.append('your-subject', 'Information Request Form');
		formDataCF7.append('your-name', `${ formData['first-name'] } ${ formData['last-name'] }`);
		if (formData.document) {
			formDataCF7.append('file-name', formData.document.name);
		}
		// fetch
		fetch(`${ process.env.GATSBY_WORDPRESS_URL }/wp-json/contact-form-7/v1/contact-forms/676/feedback`, {
			method: 'POST',
			body: formDataCF7,
		}).then(r => {
			if (!r.ok) {
				setTimeout(() => {
					setFormState('error');
				}, 500);
				return;
			}

			r.json().then(data => {
				if (data.status === 'validation_failed') {
					setFormState('initial');
					setFormErrors(prevState => {
						return {...prevState, upload: data.invalid_fields[0].message};
					});
					return;
				}

				setTimeout(() => {
					setFormState('success');
					clearForm();
				}, 500);
			});
		}).catch(error => {
			setTimeout(() => {
				setFormState('error');
			}, 500);
			console.log(error);
		});
	};

	return (
		<div className={`${ rootClassnames } container`}>

			{formState === 'initial' && (
				<div className={'pt-180 md:px-100'}>
					<h1 className={'typo-h2 text-center font-light mb-110 md:mb-80'}>{headline}</h1>
					<form action={''} className={' md:col-span-12 lg:col-span-10 lg:col-start-2'} onSubmit={onSubmitHandler}>

						{/* Input Fields */}
						<div className={'mb-100 md:mb-45 md:grid grid-cols-12 gap-30'}>
							{builder && (builder.map(field => {
								const sizeClass = `col-span-${ field.width.split('/')[0] }`;
								if (field.fieldGroupName.includes('CountrySelect')) {
									return (
										<select
											key={field.placeholder}
											className={`${ ns }__input ${ ns }__input--select ${ formData.country ? `${ ns }__input--active` : '' } ${ sizeClass } mb-25 md:mb-0 max-w-full typo-formfield`}
											name={'country'}
											id={field.cf7Key}
											onChange={onChangeHandler}
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
										className={` ${ sizeClass } mb-25 md:mb-0`}
										key={field.placeholder}
										placeholder={field.required ? `${ field.placeholder } *` : field.placeholder}
										type={field.type}
										id={field.cf7Key}
										required={field.required}
										name={field.placeholder}
										onChange={onChangeHandler}
										error={formErrors[field.placeholder]}
									/>
								);
							}))}
						</div>

						{/* Radio Buttons */}
						<div className={'mb-100 md:mb-70'}>
							{requestType && (
								requestType.map(button => {
									return (
										/* eslint-disable-next-line */
										<label key={button.option} className='typo-medium-body-semibold text-white font-light flex items-start mb-25 md:mb-15'> 
											<input type={'radio'} name={'option'} onChange={onRadioChangeHandler} value={button.option} className={`mr-10  ${ ns }__radioButton shrink-0 `} />
											<div>{button.option}</div>
										</label>
									);
								})
							)}
						</div>

						<div className={'mb-40 md:mb-20'}>
							<div className={'typo-subhead-03 mb-15'}>Document Upload</div>
							<RenderStaticHTML html={documentUploadText} className={`typo-medium-body-semibold font-normal opacity-70 lg:w-1/2 lg:pr-25`} />
						</div>

						<div className={'md:grid grid-cols-2 gap-30 lg:w-6/12 xl:w-5/12'}>
							{/* eslint-disable-next-line */}
							<label
								className={`typo-subhead-03 ${ ns }__input ${ ns }__input--file mb-20 md:mb-0 flex items-center justify-center opacity-70 md:col-span-1`}
								onClick={e => { if (fileName) onFileReset(e); }}
							>
								{!fileName && (
									<>
										<svg className={'mr-10'} width={'17'} height={'20'} viewBox={'0 0 15 17'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
											<path d={'M4.5 13H10.5V7H14.5L7.5 0L0.5 7H4.5V13ZM0.5 15H14.5V17H0.5V15Z'} fill={'#B2B2B2'} />
										</svg>
										Upload File
									</>
								)}
								{fileName && (
									<>
										<svg className={'mr-10'} width={'13'} height={'14'} viewBox={'0 0 13 14'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
											<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M12.2053 1.29396C11.8114 0.900059 11.1728 0.900059 10.7789 1.29396L6.49902 5.5738L2.21994 1.29471C1.82603 0.900808 1.18738 0.900808 0.793477 1.29471C0.39957 1.68862 0.39957 2.32727 0.793476 2.72118L5.07256 7.00026L0.793628 11.2792C0.399722 11.6731 0.399722 12.3117 0.793628 12.7057C1.18753 13.0996 1.82618 13.0996 2.22009 12.7057L6.49902 8.42672L10.7787 12.7064C11.1726 13.1003 11.8113 13.1003 12.2052 12.7064C12.5991 12.3125 12.5991 11.6738 12.2052 11.2799L7.92548 7.00026L12.2053 2.72043C12.5992 2.32652 12.5992 1.68787 12.2053 1.29396Z'} fill={'white'} />
										</svg>
										Remove File
									</>
								)}
								<Input
									className={`hidden`}
									type={'file'}
									name={'upload'}
									onChange={onFileHandler}
								/>
							</label>

							{formErrors?.upload && (
								<span className={'col-span-2 typo-small-body-light block text-primaryRed opacity-80 lg:hidden'}>
									{formErrors.upload}
								</span>
							)}
							{(fileName) && (
								<div className={'-mt-5 mb-10 typo-medium-body-light lg:hidden'}>{fileName}</div>
							)}

							<Button type={'submit'} variant={`medium`} className={'w-full md:col-span-1 md:col-start-2'}>Submit</Button>
						</div>
					</form>

					{formErrors?.upload && (
						<span className={'typo-small-body-light mt-10 text-primaryRed opacity-80 hidden lg:block'}>
							{formErrors.upload}
						</span>
					)}
					{(fileName) && (
						<div className={'mt-10 typo-medium-body-light hidden lg:block'}>{fileName}</div>
					)}

					<div className={'mt-110 md:mt-170'}>
						<RenderStaticHTML html={bottomNote} className={`typo-legal-copy opacity-70 ${ ns }__legal `} />
					</div>
				</div>
			)}

			<FormStates
				globalSettings={globalSettings}
				formState={formState}
				onSubmitHandler={onSubmitHandler}
			/>

		</div>
	);
};

export default InformationRequestForm;

export const query = graphql`
	fragment InformationRequestForm on WpPage_Pagecomponents_PageComponents_InformationRequestForm {
		fieldGroupName
	}
`;
