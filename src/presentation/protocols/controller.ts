import { HttpResponse } from './http'
export interface Controller<T = any> {
  handle: (request: T) => HttpResponse
}
