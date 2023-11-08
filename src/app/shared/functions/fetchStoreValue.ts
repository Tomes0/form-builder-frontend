import {map, Observable} from 'rxjs';
import {concatLatestFrom} from "@ngrx/effects";

/**
 * Returns the value from store.
 *
 * @param selector selector of store value
 * @return value from store
 */
export function fetchStoreValue<R>(selector: Observable<R>) {
  return function storeValue<T>(source: Observable<T>) {
    return source.pipe(
      concatLatestFrom(() => selector),
      map(([action, value]) => value)
    );
  }
}
