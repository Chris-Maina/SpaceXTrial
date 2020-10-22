import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { isLoggedInVar } from '../cache';
import { Loading, LoginForm } from '../components';
import * as LoginTypes from './__generated__/login'

const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;
export default function Login() {
  const [login,{ loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login.token as string);
        localStorage.setItem('userId', login.id as string);
        isLoggedInVar(true);
      }
    }
  )
  if (loading) return <Loading />
  if (error) return <div>{error}</div>

  return <LoginForm login={login} />;
}
