
export interface Decrypter {
  decrypt: (plaintext: string) => Promise<string>
}
