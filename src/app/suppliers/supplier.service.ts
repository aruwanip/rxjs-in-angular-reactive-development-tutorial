import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  suppliersWithMap$ = of(1, 5, 8)
    .pipe(
      map(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  /*
   * concatMap
   *
   * When an item is emitted, it's queued:
   * 1. Item is mapped to an inner Observable as specified by provided function
   * 2. Subscribes to inner Observable
   * 3. Waits
   * 4. Inner Observable emissions are concatenated to the output stream
   * 5. When inner Observable completes, processes the next item
   *
   * Ues concatMap:
   * 1. To wait for prior Observable to complete before starting next one
   * 2. To process items in sequence
   *
   * Examples:
   * 1. From a set of ids, get data in sequence
   * 2. From a set of ids, update data in sequence
   */
  suppliersWithConcatMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log('concatMap source Observable', id)),
      concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  /*
   * mergeMap
   *
   * When each item is emitted:
   * 1. Item is mapped to an inner Observable as specified by provided function
   * 2. Subscribes to inner Observable
   * 3. Inner Observable emissions are merged to output stream
   *
   * Use mergeMap:
   * 1. To process in parallel
   * 2. When order doesn't matter
   *
   * Examples:
   * 1. From a set of ids, retrieve data (order doesn't matter)
   */
  suppliersWithMergeMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log('mergeMap source Observable', id)),
      mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  /*
   * switchMap
   *
   * When each item is emitted:
   * 1. Item is mapped to an inner Observable as specified by a provided function
   * 2. Unsubscribes from prior inner Observable
   * 3. Subscribes to new inner Observable
   * 4. Inner Observable emissions are merged to output stream
   *
   * Use switchMap to stop any prior Observable before switching to the next one
   *
   * Examples:
   * 1. Type ahead or auto completion
   * 2. User selection from a list
   */
  suppliersWithSwitchMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log('switchMap source Observable', id)),
      switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  constructor(private http: HttpClient) {
    // this.suppliersWithMap$
    //   .subscribe(o => o.subscribe(
    //     item => console.log('map result', item)
    //   ));
    this.suppliersWithConcatMap$.subscribe(item => console.log('concatMap result', item));
    this.suppliersWithMergeMap$.subscribe(item => console.log('mergeMap result', item));
    this.suppliersWithSwitchMap$.subscribe(item => console.log('switchMap result', item));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
