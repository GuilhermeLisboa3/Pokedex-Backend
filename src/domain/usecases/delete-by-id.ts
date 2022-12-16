
export interface DeleteById {
  delete: (id: string) => Promise<boolean>
}
