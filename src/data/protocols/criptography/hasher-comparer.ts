export interface HasherComparer {
  hashComparer: (password: string, hashPassword) => Promise<boolean>
}
