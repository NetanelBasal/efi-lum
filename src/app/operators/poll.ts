import { MonoTypeOperatorFunction, Observable, timer } from 'rxjs';
import { concatMapTo } from 'rxjs/operators';

export function poll<T>(period: number): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    return timer(0, period).pipe(concatMapTo(source));
  };
}
