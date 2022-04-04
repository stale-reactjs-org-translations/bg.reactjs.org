---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

Обектът `ReactDOMServer` ви позволява да рендерирате компоненти до статичен маркъп. Типично се използва на Node сървър:

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Преглед {#overview}

Следващите методи могат да се използват и на двете среди, сървър и браузър:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Тези допълнителни методи зависят от пакета (`stream`), който е **достъпен само на сървъра**, и няма да работи на браузъра.

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Референция {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Рендерира React елемент до неговия първоначален HTML. React ще върне HTML низ. Може да използвате този метод, за да генерирате HTML на сървъра и да изпратите маркъпа на първоначалния request за по-бързо зареждане на страницата и да позволите на търсачките да преглеждат вашите страници за SEO цели.

<<<<<<< HEAD
Ако извикате [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на елемент, който вече има този маркъп рендериран на сървъра, React ще го запази и само ще му закачи слушателите за събития, позволявайки ви да имате много бързо първо зареждане.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Същото като [`renderToString`](#rendertostring), с изключение, че това не създава допълнителни DOM атрибути, които React използва вътрешно, като  `data-reactroot`. Това е полезно ако искате да използвате React, като прост генератор на статични страници, като отстраняване на допълнителните атрибути може да спаси няколко бита.

<<<<<<< HEAD
Ако планувате да използвате React на клиента, за да направите маркъпа подвижен, не използвайте този метод. Вместо това използвайте [`renderToString`](#rendertostring) на сървъра и [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на клиента.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Рендерира React елемент до неговия първоначален HTML. Връша [Readable стрийм](https://nodejs.org/api/stream.html#stream_readable_streams), който рендерира HTML низ. HTML рендериран от този стрийм е равен точно на това, което [`ReactDOMServer.renderToString`](#rendertostring) ще върне. Може да използвате този метод да генерирате HTML на сървъра и да изпратите маркъпа на първоначалния рекуест за по-бързо зареждане на страницата и да позволите на търсачките да преглеждат вашите страници за SEO цели.

<<<<<<< HEAD
Ако извикате [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на елемент, който вече има маркъп рендериран на сървъра, React ще го запази и само ще му закачи слушателите за събития, позволявайки ви да имате много бързо първо зареждане.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Бележка:
>
> Само на сървъра. Това API не е достъпно в браузъра.
>
> Стрийма върнат от този метод ще върне бит стрийм енкоднат в utf-8. Ако се нуждаете от стрийм в друг енкодинг, разгледайте проект като [iconv-lite](https://www.npmjs.com/package/iconv-lite), който предоставя трансформиращи стриймове за транскодиращ текст.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Същото като [`renderToNodeStream`](#rendertonodestream), с изключение, че това не създава допълнителни DOM атрибути, които React използва вътрешно, като  `data-reactroot`. Това е полезно ако искате да използвате React, като прост генератор на статични страници, като отстраняване на допълнителните атрибути може да спаси няколко бита.

HTML резултата от този стрийм е точно равен на това което [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) ще върне.

<<<<<<< HEAD
Ако планувате да използвате React на клиента, за да направите маркъпа подвижен, не използвайте този метод. Вместо това използвайте [`renderToNodeStream`](#rendertonodestream) на сървъра и [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на клиента.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Бележка:
>
> Само на сървъра. Това API не е достъпно в браузъра.
>
> Стрийма върнат от този метод ще върне бит стрийм енкоднат в utf-8. Ако се нуждаете от стрийм в друг енкодинг, разгледайте проект като [iconv-lite](https://www.npmjs.com/package/iconv-lite), който предоставя трансформиращи стриймове за транскодиращ текст.
