export interface AuthenticationToken {
  authToken: (token: string) => Promise<AuthenticationToken.Result>
}

export namespace AuthenticationToken {
  export type Result = {
    id: string
  }
}
