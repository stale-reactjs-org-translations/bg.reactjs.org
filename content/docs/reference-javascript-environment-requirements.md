---
id: javascript-environment-requirements
title: Изисквания За JavaScript Среда
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 зависи от типовете колекции [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) и [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Ако поддържате по-стари браузъри и устройства, които може още да не се поддържат (например IE < 11) или които нямат подходящите имплементации (например IE 11), обмислете включването на глобална библиотека, която ще направи това за вас, във вашето завършено приложение, като например [core-js](https://github.com/zloirock/core-js) или [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

Средата, която поддържа по-стари браузъри, за React 16 използвайки core-js изглежда така:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Здравей, свят!</h1>,
  document.getElementById('root')
);
```

React също зависи от `requestAnimationFrame` (дори и в тест средите).  
Може да използвате [raf](https://www.npmjs.com/package/raf) пакета, за да заместите `requestAnimationFrame`:

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6
