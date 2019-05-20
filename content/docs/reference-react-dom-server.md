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

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Референция {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Рендерира React елемент до неговия първоначален HTML. React ще върне HTML низ. Може да използвате този метод, за да генерирате HTML на сървъра и да изпратите маркъпа на първоначалния рекуест за по-бързо зареждане на страницата и да позволите на търсачките да преглеждат вашите страници за SEO цели.

Ако извикате [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на елемент, който вече има този маркъп рендериран на сървъра, React ще го запази и само ще му закачи слушателите за събития, позволявайки ви да имате много бързо първо зареждане.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Същото като [`renderToString`](#rendertostring), с изключение, че това не създава допълнителни DOM атрибути, които React използва вътрешно, като  `data-reactroot`. Това е полезно ако искате да използвате React, като прост генератор на статични страници, като отстраняване на допълнителните атрибути може да спаси няколко бита.

Ако планувате да използвате React на клиента, за да направите маркъпа подвижен, не използвайте този метод. Вместо това използвайте [`renderToString`](#rendertostring) на сървъра и [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на клиента.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Рендерира React елемент до неговия първоначален HTML. Връша [Readable стрийм](https://nodejs.org/api/stream.html#stream_readable_streams), който рендерира HTML низ. HTML рендериран от този стрийм е равен точно на това, което [`ReactDOMServer.renderToString`](#rendertostring) ще върне. Може да използвате този метод да генерирате HTML на сървъра и да изпратите маркъпа на първоначалния рекуест за по-бързо зареждане на страницата и да позволите на търсачките да преглеждат вашите страници за SEO цели.

Ако извикате [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на елемент, който вече има маркъп рендериран на сървъра, React ще го запази и само ще му закачи слушателите за събития, позволявайки ви да имате много бързо първо зареждане.

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

Ако планувате да използвате React на клиента, за да направите маркъпа подвижен, не използвайте този метод. Вместо това използвайте [`renderToNodeStream`](#rendertonodestream) на сървъра и [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) на клиента.

> Бележка:
>
> Само на сървъра. Това API не е достъпно в браузъра.
>
> Стрийма върнат от този метод ще върне бит стрийм енкоднат в utf-8. Ако се нуждаете от стрийм в друг енкодинг, разгледайте проект като [iconv-lite](https://www.npmjs.com/package/iconv-lite), който предоставя трансформиращи стриймове за транскодиращ текст.