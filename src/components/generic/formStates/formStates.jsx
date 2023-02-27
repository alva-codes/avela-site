import React from 'react';
import Button from '../../Button/Button';

const FormStates = props => {
	const {
		formState,
		globalSettings,
		onSubmitHandler,
		onPostSuccessHandler,
	} = props;

	return (
		<div className={`form-states ${ formState !== 'initial' ? 'mt-270 md:mt-90' : '' }`}>
			{formState === 'loading' && (
				<div className={'min-h-[calc(100vh-86px)] py-180 flex flex-col lg:flex-row items-center justify-center text-center'}>
					<svg className={'animate-spin lg:mr-20 order-2 lg:order-1'} width={'32'} height={'32'} viewBox={'0 0 32 32'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
						<circle cx={'16'} cy={'16'} r={'15'} stroke={'#634A52'} />
						<path d={'M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1'} stroke={'white'} strokeWidth={'2'} strokeLinecap={'round'} />
					</svg>
					<span className={'typo-subhead-03 mb-30 lg:mb-0 order-1 lg:order-2'}>{globalSettings.loadingState}</span>
				</div>
			)}

			{formState === 'success' && (
				<div className={'min-h-[calc(100vh-86px)] py-180 flex flex-col items-center justify-center text-center'}>
					<span className={'headline mb-10'}>{globalSettings.loadingSuccessMessage}</span>
					<span className={'subline'}>{globalSettings.loadingSuccessMessageSubline}</span>
					<div>
						<Button
							variant={'medium'}
							className={`inline-block mt-30 lg:mt-50 mr-auto`}
							to={globalSettings.loadingSuccessLink.url}
						>
							{globalSettings.loadingSuccessLink.title}
						</Button>
						<button
							className={'block px-30 py-5 mx-auto submit-new'}
							onClick={onPostSuccessHandler}
						>
							{globalSettings.loadingSuccessSubmitNewFormLabel}
						</button>
					</div>

				</div>
			)}

			{formState === 'error' && (
				<div className={'min-h-[calc(100vh-86px)] py-180 flex flex-col items-center justify-center text-center'}>
					<span className={'typo-subhead-03 mb-30'}>{globalSettings.loadingErrorMessage}</span>
					<div>
						<Button
							variant={'medium'}
							className={`inline-block mr-auto`}
							onClick={onSubmitHandler}
						>
							Try again
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default FormStates;
