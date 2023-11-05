export interface Dimensions {
  width: number,
  height: number
}

/**
 * Types for dealing with our microservices
 */
export type APIError = {
  code: number,
  message: string
};

/**
 * User object
 */
export type User = {
  email: string,
  password: string
};