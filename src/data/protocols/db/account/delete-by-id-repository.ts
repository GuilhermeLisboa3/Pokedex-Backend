export interface DeleteByIdRepository {
  deleteById: (id: string) => Promise<void>
}
