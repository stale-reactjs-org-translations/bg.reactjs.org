---
id: shallow-renderer
title: Shallow Renderer
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Използване**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 с npm
```

## Преглед {#overview}

Когато пишете unit тестове за React, shallow рендерирането може да ви е полезно. Shallow рендерирането ви позволява да изобразите компонент "едно ниво навътре" и да проверите какво рендер метода връща, без да се притеснявате за поведението на децата компоненти, които не са представени или рендерирани. Тази операция не изисква DOM.

Например, ако имате следния компонент:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Заглавие</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

Тогава може да проверите:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Заглавие</span>,
  <Subcomponent foo="bar" />
]);
```

Shallow тестването има някои ограничения в момента, а именно не поддържа refs.

> Бележка:
>
> Ние препоръчваме да прегледате и [Shallow Rendering API-то на Enzyme](https://airbnb.io/enzyme/docs/api/shallow.html). То предоставя по-хубаво API на високо ниво върху същата функционалност.

## Референция {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

Може да си мислите за shallowRenderer като "място" където да рендерирате компонента, който тествате, и от който да вземете резултата от компонента.

`shallowRenderer.render()` е сходен на [`ReactDOM.render()`](/docs/react-dom.html#render), но тази операция не изисква DOM и само рендерира едно ниво навътре. Това означава, че може да тествате компоненти изолирани от това как техните деца са имплементирани.

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

След като `shallowRenderer.render()` е бил извикан, може да използвате `shallowRenderer.getRenderOutput()`, за да вземете shallow рендерирания резултат.

Тогава вие може да продължите с проверките на резултата.
