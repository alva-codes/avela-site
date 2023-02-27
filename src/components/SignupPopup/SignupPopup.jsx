import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Button from '../../components/Button/Button';
import Input from '../../components/generic/Input/Input';
import FormStates from '../../components/generic/formStates/formStates';
import classNames from 'classnames';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'js-cookie';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const SignupPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsClose, setModalIsClose] = useState(false);

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  const [formState, setFormState] = useState('initial');

  const clearForm = (options = {data: {}, errors: [], state: 'initial'}) => {
    setFormData(options.data || {});
    setFormState(options.state || 'initial');
    setFormErrors(options.errors || []);
  };

  // 40% page show popup
  useEffect(() => {

    const pageName = window.location.href;
    console.log('Page name:', pageName);
    const cookieName = `popupShown_${pageName}`;
    const popupShown = Cookies.get(cookieName);
    const localShown = localStorage.getItem(cookieName);

    if (!popupShown && !localShown) {
      window.onscroll = function() {
        const scrollPercentage =
          (document.documentElement.scrollTop + document.body.scrollTop) /
          (document.documentElement.scrollHeight - document.documentElement.clientHeight);

        if (scrollPercentage >= 0.25 && !modalIsOpen && !modalIsClose ) {
          setModalIsOpen(true);
          localStorage.setItem(cookieName, 'true');
          Cookies.set(cookieName, 'true', { expires: 1 });
        }
      };
    }

    !modalIsClose && setModalIsClose(true)
  }, [modalIsOpen]);


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
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      setFormErrors(prevState => {
        return {...prevState, [id]: !value.match(regex) ? 'Valid email address required.' : ''};
      });
    }

    setFormData(prevState => {
      return {...prevState, [id]: value};
    });
  };

  //check required
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

  // get data & request when submit form
  const handleSubmit = e => {
    e.preventDefault();
    setFormState('loading');

    const formDataGR = new FormData();
    Object.entries(formData).forEach(element => {
      formDataGR.append(element[0], element[1]);
    });
    //  Add subject and name custom
    //formDataGR.append('your-subject', 'Sign Up Popup');
    formDataGR.append('input_2.3', `${ formData['firstName'] }`);
    formDataGR.append('input_2.6', `${ formData['lastName'] }`);
    formDataGR.append('input_5', `${ formData['email'] }`);

    // fetch
    fetch(`${ process.env.GATSBY_WORDPRESS_URL }/wp-json/gf/v2/forms/4/submissions`, {
      method: 'POST',
      body: formDataGR,
    }).then(r => {
      if (r.ok) {
        var sign_up_popup = document.getElementsByClassName('sign-up-form-popup');
        if(sign_up_popup.length){
          sign_up_popup[0].innerHTML = '<p className="text-success" >Thanks for joining! Welcome to Avela.</p>';
        }
        console.log(sign_up_popup);
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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        className="custom-modal"
      >
        <h2>Innovation In Your Inbox</h2>
        <h4>Join our newsletter for Avela™ updates, formulation ideas, industry news - and exclusive invitations.</h4>
        <form action={''} className={'md:col-span-12 flex sign-up-form-popup'} onSubmit={handleSubmit}>
          <div className={'first-last-name'}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={onChangeHandler}
              id={'firstName'}
              required
              className={'inline-block'}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={onChangeHandler}
              id={'lastName'}
              required
              className={'inline-block'}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={onChangeHandler}
            id={'email'}
            required
            className={'inline-block'}
          />
          <Button type={'submit'} variant={`medium`} className={'w-full md:w-210'} id={'submit-signup-form'} >Sign Me Up</Button>
        </form>
        <button className={'close-popup'} type="button" onClick={() => { setModalIsOpen(false); setModalIsClose(true); }}></button>
      </Modal>
    </div>
  );
};

export default SignupPopup;

         
