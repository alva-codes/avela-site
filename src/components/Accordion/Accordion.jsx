import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import uniqueId from 'uniqid';
import RenderStaticHTML from '../generic/RenderStaticHTML/RenderStaticHTML';

const ns = `accordion`;

const Accordion = props => {
  	const { titleAcc, accordionMain } = props;
  	const [isOpen, setIsOpen] = useState(Array(accordionMain.length).fill(false));
  	const [indexOpen, setIndexOpen] = useState(false);

  	const toggleAccordion = index => {
	    setIsOpen(
	      	isOpen.map((value, i) => {
		        if (i === index) {
		          	return !value;
		        } else if (value === true) {
          			return false;
         		} else {
		          	return value;
		        }
	      	})
	    );
	    const newIndexOpen = isOpen.findIndex(value => value === true);
    	setIndexOpen(newIndexOpen);
  	};

//   	useEffect(() => {
// 	    const questions = document.getElementsByClassName('accordion-header');
// 	    const answers = document.getElementsByClassName('accordion-answer');
// 
// 	    for (let i = 0; i < questions.length; i++) {
// 	        if (isOpen[i]) {
// 	            questions[i].classList.add('open');
// 	        } else {
// 	            questions[i].classList.remove('open');
// 	        }
// 	    }
// 	}, [isOpen]);


  	return (
	    <div className="accordion-main">
	    	<div className="accordion-container">
		      	{accordionMain &&
			        accordionMain.map((a, index) => {
			        	if (a.title) {
							return <h2 className={'title-accordion'} key={+index}>{a.title}</h2>;
						}
			          	if (a.question && a.answer) {
				            return (
				              	<div
					                className={`accordion-header ${indexOpen && index == indexOpen ? 'open' : ''}`}
					                key={a.question}
					                onClick={() => {
					                	toggleAccordion(index) 
						                setIndexOpen(index)
						            }}
				              	>
				              		<div className="question-open">
									  	<p className="accordion-question">{a.question || "Default question"}</p>
									  	<div className="icon-container">
										    {isOpen[index] ? (
										      <div className="minus-icon"></div>
										    ) : (
										      <div className="plus-icon"></div>
										    )}
									  	</div>
									</div>
					                {/* <i className={`fas ${isOpen[index] ? <FontAwesomeIcon icon={'fa-minus'} /> : <FontAwesomeIcon icon={'fa-plus'} />}`} /> */}
					                {isOpen[index] && (
					                  	<RenderStaticHTML
											className={'accordion-answer'}
											key={a.question}
											html={a.answer || "Default Answer"}
										/>
					                )}
				              	</div>
				            );
			          	}
	          		return null;
		        })}
	       	</div>
	    </div>
  	);
};


export default Accordion;

export const query = graphql`
	fragment Accordion on WpPage_Pagecomponents_PageComponents_Accordion {
		fieldGroupName
		accordionMain{
			... on WpPage_Pagecomponents_PageComponents_Accordion_AccordionMain_Titleacc{
				title
			}
			... on WpPage_Pagecomponents_PageComponents_Accordion_AccordionMain_Accordionsub {
				question
				answer
			}
		}
	}
`;
