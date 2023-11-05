import axios from "axios";

/**
 * Call the sign in API endpoint.
 * 
 * Params:
 *   email: User-entered email to sign in with.
 *   password: User-entered password to sign in with.
 * 
 * Returns:
 *   A promise that resolves to the response from the API. 
 */
export const signIn = async (email: string, password: string) => {
  let url: string = process.env.NM_USERS_API_URL + "/users/signin";
  return await axios.post(url, { email, password });
};

/**
 * Call the sign up API endpoint to create a user.
 * 
 * Params:
 *   email: User-entered email to create an account with.
 *   password: User-entered password to create an account with.
 * 
 * Returns:
 *   A promise that resolves to the response from the API.
 */
export const signUp = async (email: string, password: string) => {
  let url: string = process.env.NM_USERS_API_URL + "/users/signup";
  return await axios.post(url, { email, password });
};  