/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface LoginResponse {
  __typename: "LoginResponse";
  id: string;
  token: string;
}


export interface login {
  login: LoginResponse;
}

export interface loginVariables {
  email: string;
}
