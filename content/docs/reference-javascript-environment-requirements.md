---
id: javascript-environment-requirements
title: Изисквания За JavaScript Среда
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 16 зависи от типовете колекции [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) и [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Ако поддържате по-стари браузъри и устройства, които може още да не се поддържат (например IE < 11) или които нямат подходящите имплементации (например IE 11), обмислете включването на глобална библиотека, която ще направи това за вас, във вашето завършено приложение, като например [core-js](https://github.com/zloirock/core-js) или [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

Средата, която поддържа по-стари браузъри, за React 16 използвайки core-js изглежда така:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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
