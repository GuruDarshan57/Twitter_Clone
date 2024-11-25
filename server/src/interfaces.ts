export interface JWTPayload {
  id: string;
  email: string;
}
export interface GraphqlContext {
  user?: JWTPayload;
}
export interface postData {
  content: string;
  imageUrl?: string;
}
