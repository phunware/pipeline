# pipeline

Pipes a value through a series of functions, sending the return value of the previous function as the single argument to the next. Inspired by the [es-pipeline-operator](https://github.com/mindeavor/es-pipeline-operator) proposal.

## TL;DR:

```sh
$ npm install --save pipeline
```

```js
var pipeline = require('pipeline');
var result = pipeline("[1, 2, 3]",
  JSON.parse,
  _ => _.map(n => n * 2)
) // [2, 4, 6]
```

## Motivation

The [es-pipeline-operator](https://github.com/mindeavor/es-pipeline-operator) proposal does a good job of explaining the benefits of using a functional pipeline such as the built-in syntax features in [F#](https://en.wikibooks.org/wiki/F_Sharp_Programming/Higher_Order_Functions#The_.7C.3E_Operator), [OCaml](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html#VAL%28%7C%3E%29), [Elm](https://edmz.org/design/2015/07/29/elm-lang-notes.html), and [Clojure (called the "thread macro")](https://clojuredocs.org/clojure.core/-%3E).

In short, it can turn long, deeply nested function chains into readable sequences (most of these examples are adapted from the es-pipeline-operator README):

```js
// before:
var result = exclaim(capitalize(doubleSay("hello")));
// after:
result = pipeline("hello", doubleSay, capitalize, exclaim);

// before:
var newScore = boundScore(0, 100, add(double(person.score), 7));
// after:
result = pipeline(person.score,
  _ => add(_, 7),
  _ => boundScore(0, 100, _)
);

// before:
renderLeaderboard('#my-div',
  Lazy(
    getAllPlayers()
      .filter( p => p.score > 100 )
      .sort()
  ) .map( p => p.name )
    .take(5)
);
// after:
pipeline(getAllPlayers(),
  _ => _
    .filter( p => p.score > 100 )
    .sort(),
  _ => Lazy(_)
    .map( p => p.name )
    .take(5),
  _ => renderLeaderboard('#my-div', _)
);
```

Notice how the pipeline lets you you read the flow of data from left to right and top to bottom, whereas it can get obfuscated with traditional function calls, especially when dealing with different argument orders or mixing OO and functional styles.

It pairs especially nicely with [ES2015 (aka ES6) arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). The underscore `_` argument used in the examples is a convention, not required by the pipeline.

## API

### pipeline(initial, ...funcs)

Calls each function in `funcs` in succession, passing it the result of the previous function (or `initial`, in the case of the first function). Returns the final result.

### pipeline.decorate(...funcs, initial)

Works like `pipeline`, but takes the initial value as the _last_ argument and passes the value through `funcs` in reverse order. This makes it superficially similar to the [class decorator proposal](https://github.com/wycats/javascript-decorators).

Examples:

```js
// Slightly contrived React + Redux + React Router example
var WrappedTodosHeader = decorate(
  connect(state => ({ todoCount: state.todos.length })),
  _ => withRouter(_, { withRef: true }),
  function TodosHeader(props) {
    return React.createElement('div', {},
      React.createElement('h1', {}, props.todoCount + " Todos"),
      React.createElement('a', { href: props.createHref('/home') }, "home")
    );
  }
);
// equivalent to
var WrappedTodosHeader = connect(state => ({ todoCount: state.todos.length }))(
  withRouter(
    function TodosHeader(props) {
      // same function body
    },
    { withRef: true }
  )
);
```

## Development and Contributing

You'll need to be running at least Node v6 - this project is written in ES2015 (aka ES6) and doesn't use Babel for tests.

Clone this repo, and run `npm install`. You can run `npm test` to run unit tests. Run `npm run build` to compile to ES5 in the `lib` directory.

## Publishing workflow

```sh
$ npm test
$ npm version [major|minor|patch]
$ npm run build
$ npm publish
$ git push --tags
```

## Wishlist

We'd gladly accept PRs for the following:

- [ ] Benchmarking, profiling, microoptimizations, etc. It's not slow, but I haven't yet made any effort to make it fast either.
- [ ] Support testing and building on Windows (should just be matter of using  [cross-env](https://www.npmjs.com/package/cross-env) and a few other cross-platform scripts)
- [ ] Support ES3 environments (right now there's a dependency on many of the ES5 Array.prototype methods)
- [ ] UMD build for non-CommonJS environments
