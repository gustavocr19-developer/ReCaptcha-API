import { Formik, Form, Field, ErrorMessage } from 'formik';

const HomePage= ()=> {
  return(

    <div className='homePage'>

     <h1>Example form!</h1>
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          >
       {({ isSubmitting }) => (
         <Form>
           <div className='homePage-formItem'>
             <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
           </div>

           <div className='homePage-formItem'>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
           </div>
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