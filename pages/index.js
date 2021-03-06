import React, {useRef, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha'

const HomePage= ()=> {

  const refRef = useRef();
  const [robot, setRobot] = useState('');

  return(

    <div className='homePage'>

     <h1>Form with ReCAPTCHA!</h1>
     <div className='homePage-form'>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async(values, { setSubmitting }) => {
            const token = await refRef.current.executeAsync();
            refRef.current.reset()

            setRobot('')
            const response = await fetch("/api/validate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
                token,
              }),
            });

            const data = await response.json();
            if (data.errors) {
              setServerErrors(data.errors);
              setRobot(`You are a robot!!!`)
            } else {
              setRobot(`You are not a robot!!!`)
            }
            setSubmitting(false);
  
          }}
          >
       {({ isSubmitting }) => (
         <Form>
           {robot &&
             <p>{robot}</p>
           }
           <div className='homePage-formItem'>
             <Field type="email" name="email" placeholder='Email'/>
              <ErrorMessage name="email" component="div"/>
           </div>

           <div className='homePage-formItem'>
            <Field type="password" name="password" placeholder='Password'/>
            <ErrorMessage name="password" component="div" />
           </div>
           <ReCAPTCHA 
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY} 
            size="invisible"
            ref={refRef}
           />

            <div className='homePage-formItem'>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
           </div>
        
         </Form>
       )}
     </Formik>
     </div>
   </div>
  )
}

export default HomePage