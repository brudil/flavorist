import React from 'react';
import { RouteComponentProps } from '@reach/router';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useLogin } from '../hooks/login';

const loginSchema = yup.object({
  emailAddress: yup.string().email(),
  password: yup.string(),
});

// type LoginData = yup.InferType<typeof loginSchema>;

export const Login: React.FC<RouteComponentProps> = () => {
  const login = useLogin();

  return (
    <div>
      <h1>Log in</h1>

      <Formik
        initialValues={{ emailAddress: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async ({ emailAddress, password }, { setSubmitting }) => {
          const res = await login(emailAddress, password);
          console.log(res);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="emailAddress" />
            <ErrorMessage name="emailAddress" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
