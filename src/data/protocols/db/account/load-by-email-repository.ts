export interface LoadByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadByEmailRepository.Result>
}
export namespace LoadByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}
