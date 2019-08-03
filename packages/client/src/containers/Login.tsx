import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useLogin } from '../hooks/login';
import Helmet from 'react-helmet';

const loginSchema = yup.object({
  emailAddress: yup.string().email(),
  password: yup.string(),
});

// type LoginData = yup.InferType<typeof loginSchema>;

const FieldItem: React.FC = ({ children }) => {
  return (
    <div
      css={{
        marginBottom: '1rem',
        '& label': {
          display: 'block',
          marginBottom: '0.4rem',
        },
        '& input': {
          fontSize: '1.1rem',
          padding: '0.4rem',
          boxSizing: 'border-box',
          width: '100%',
        },
      }}
    >
      {children}
    </div>
  );
};

export const Login: React.FC<RouteComponentProps> = () => {
  const login = useLogin();
  const [error, setError] = useState<null | string>(null);

  return (
    <div
      css={{
        backgroundImage: `url(${require('../assets/login.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Helmet title="Login" />
      <div
        css={{
          background: '#fff',
          padding: '2rem',
          maxWidth: 230,
          margin: '0 auto',
        }}
      >
        <h1
          css={{
            textAlign: 'center',
          }}
        >
          Log in
        </h1>

        <Formik
          initialValues={{ emailAddress: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async ({ emailAddress, password }, { setSubmitting }) => {
            const res = await login(emailAddress, password);
            console.log(res);
            setError(null);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FieldItem>
                <label htmlFor="name">Email Address</label>
                <Field type="email" name="emailAddress" />
                <ErrorMessage name="emailAddress" component="div" />
              </FieldItem>
              <FieldItem>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </FieldItem>
              <FieldItem>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </FieldItem>
            </Form>
          )}
        </Formik>
        {error && <div>Failed credentials</div>}
      </div>
    </div>
  );
};
