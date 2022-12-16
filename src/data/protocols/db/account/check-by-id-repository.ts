export interface CheckByIdRepository {
  checkById: (id: string) => Promise<boolean>
}
