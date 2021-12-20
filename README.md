# RXJS in Angular: Reactive Development (Pluralsight Course)

Code from a Pluralsight course on reactive development with RxJS in Angular.
Topics covered include:

- RxJS terms, syntax, and operators
- Declarative approach to defining data streams and combining data streams to merge data from multiple sources
- Create streams from user actions and merge data streams with the action streams to react to those actions

Link to course with more info: https://app.pluralsight.com/library/courses/rxjs-angular-reactive-development/table-of-contents

Additional tutorial code using map, tap, and take operators is located in: https://github.com/aruwanip/rxjs-in-angular-reactive-development-tutorial-stackblitz

## Prerequisites

Node.js with npm should be installed on your local machine.

## Install

`npm install`

## Running the project

`npm start`

Project will be served at http://localhost:4200

## Key points, tips, and common issues

### RxJS Operators

Import from 'rxjs/operators'

`import { map, catchError } from 'rxjs/operators';`

Specify operators within the pipe method

```
of(2, 4, 6)
  .pipe(
    map(item => item * 2),
    tap(item => console.log(item))
  );
```

### RxJS Creation Functions

Import from 'rxjs'

`import { combineLatest, of } from 'rxjs';`

Be careful not to import the operator with the same name

`import { combineLatest } from 'rxjs/operators';`

### Debugging Observables

Use the `tap` operator

`tap(data => console.log(JSON.stringify(data)))`

Hover over the Observable to view the type

### Data Streams

- Emits one item, the response
- After emitting the response, the streams completes
- The response is often an array
- To transform the array elements:
  - Map the emitted array
  - Map each array element
  - Transform each array element

### Action Streams

- Only emits if it is active
- If the stream is stopped, it won't emit
- An unhandled error causes the stream to stop
- Catch the error and replace the errored Observable
  - Don't replace an errored action Observable with EMPTY
  - Replace with a default or empty value

### Combination Operators (Array)

- Don't emit until each source stream emits at least once
  - combineLatest
  - forkJoin
  - withLatestFrom
- Action stream created with a `Subject` does not immediately emit
- When combining with an action stream, consider using a `BehaviorSubject` since it emits a default value

### Complete Notifications

- Some functions/operators require the input Observable(s) complete before they emit
  - forkJoin
  - toArray
- Take care when using these functions/operators with action streams, which often don't complete

### A Few More Terms

Cold Observable
- Doesn't emit until subscribed to
- Unicast
- Example: HTTP

Hot Observable
- Emits without subscribers
- Multicast
- Example: Subject
