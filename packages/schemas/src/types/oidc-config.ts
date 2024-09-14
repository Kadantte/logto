import type { KeysToCamelCase } from '@silverhand/essentials';

export type SnakeCaseOidcConfig = {
  authorization_endpoint: string;
  userinfo_endpoint: string;
  token_endpoint: string;
};

export type OidcConfig = KeysToCamelCase<SnakeCaseOidcConfig>;

export enum GrantType {
  AuthorizationCode = 'authorization_code',
  RefreshToken = 'refresh_token',
  ClientCredentials = 'client_credentials',
  TokenExchange = 'urn:ietf:params:oauth:grant-type:token-exchange',
  Implicit = 'implicit',
}

export enum ResponseType {
  /** Authorization code flow */
  Code = 'code',
  /** Implicit flow */
  IdToken = 'id_token',
  /** Hybrid flow */
  HybridIdToken = 'code id_token',
}
