import React from 'react';
import { RouteComponentProps } from '@reach/router';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const loginSchema = yup.object({
  emailAddress: yup.string().email(),
  username: yup.string().trim(),
  password: yup.string(),
});

// type LoginData = yup.InferType<typeof loginSchema>;

export const Register: React.FC<RouteComponentProps> = () => {
  const [login] = useMutation(gql`
    mutation Register(
      $emailAddress: String!
      $username: String!
      $password: String!
    ) {
      createUser(
        emailAddress: $emailAddress
        username: $username
        password: $password
      ) {
        success
        code
        viewer {
          name
        }
      }
    }
  `);

  return (
    <div>
      <h1>Log in</h1>

      <Formik
        initialValues={{ emailAddress: '', username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await login({ variables: values });
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
