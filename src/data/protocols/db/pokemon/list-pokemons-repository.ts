import { ListPokemons } from '@/domain/usecases'
export interface ListPokemonsRepository {
  list: (accountId: number) => Promise<ListPokemonsRepository.Result>
}

export namespace ListPokemonsRepository {
  export type Result = ListPokemons.Result
}
