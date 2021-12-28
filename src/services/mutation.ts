export const Mutation = {
  login: `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken renewToken
    }
  }`
}