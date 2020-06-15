export interface IEvent {
  path: string;
  httpMethod: string;
  queryStringParameters: { token?: string; group?: string; id?: string };
  headers: { [key: string]: string };
  body: string;
  isBase64Encoded: boolean;
}
