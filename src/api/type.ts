export interface Response<T> {
  status: number
  totalCount: number
  data: T
}
