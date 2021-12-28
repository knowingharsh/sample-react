export const Query = {
  getInfo: `query GetInfo {
    getInfo {
      email first_name last_name userId
    }
  }`,
  get_access_token: `query get_access_token($renewToken: String!) {
    get_access_token(renewToken: $renewToken) {
      accessToken
    }
  }`
}