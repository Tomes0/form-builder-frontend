import {map, Observable} from 'rxjs';
import {concatLatestFrom} from "@ngrx/effects";

export function storeValue<R>(selector: Observable<R>) {
  return function storeValue<T>(source: Observable<T>) {
    return source.pipe(
      concatLatestFrom(() => selector),
      map(([action, value]) => value)
    );
  }
}
