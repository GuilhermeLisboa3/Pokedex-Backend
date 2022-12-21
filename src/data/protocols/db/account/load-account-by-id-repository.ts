export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<LoadAccountByIdRepository.Result>
}
export namespace LoadAccountByIdRepository {
  export type Result = {
    id: string
    email: string
    name: string
  }
}
