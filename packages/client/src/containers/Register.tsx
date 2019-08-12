import React from 'react';
import { RouteComponentProps } from '@reach/router';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Helmet from 'react-helmet';
import { useJoin } from '../hooks/join';

const loginSchema = yup.object({
  emailAddress: yup.string().email(),
  username: yup.string().trim(),
  password: yup.string(),
});

// type LoginData = yup.InferType<typeof loginSchema>;

export const Register: React.FC<RouteComponentProps> = () => {
  const join = useJoin();

  return (
    <div>
      <Helmet title="Join" />

      <h1>Join</h1>

      <Formik
        initialValues={{ emailAddress: '', username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await join(
            values.emailAddress,
            values.username,
            values.password,
          );
          console.log(res);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="emailAddress" />
            <ErrorMessage name="emailAddress" component="div" />
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
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
