export interface HasherComparer {
  hashComparer: (password: string, hashPassword: string) => Promise<boolean>
}
