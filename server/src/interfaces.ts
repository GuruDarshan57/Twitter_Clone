export interface JWTPayload {
  id: string;
  email: string;
}
export interface GraphqlContext {
  user?: JWTPayload;
}
