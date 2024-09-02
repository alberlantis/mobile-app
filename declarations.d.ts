import * as blowater__collections from '@jsr/blowater__collections'

declare module "@jsr/blowater__collections" {
  export { blowater__collections }
  export type ReadonlySetLike<T> = ReadonlySet<T>
}