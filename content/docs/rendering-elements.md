---
id: rendering-elements
title: Рендериране на елементи
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Елементите са най-малките градивни елементи на приложенията правени с React.

Елементът описва това, което искате да видите на екрана:

```js
const element = <h1>Hello, world</h1>;
```

За разлика от DOM елементите в browser-a, React елементите са обикновени обекти и създаването им не се отразява на производителността. React DOM се грижи за актуализирането на DOM дървото в browser-a, да съответства на React елементите.

>**Забележка:**
>
>Често елементите се бъркат с по-широко познатото понятие "компоненти". Ще въведем компоненти в [следващия раздел](/docs/components-and-props.html). Компонентите са "направени" от елементи и ви препоръчваме да прочетете този раздел преди да продължите напред.

## Рендериране на елемент в DOM дървото на browser-a {#rendering-an-element-into-the-dom}

Нека да кажем, че имате `<div>` във вашия HTML файл:

```html
<div id="root"></div>
```

Ние наричаме това "root" DOM node, защото всичко в него ще се управлява от React DOM.

Приложенията, изградени само с React, обикновено имат един root DOM node. Ако интегрирате React в съществуващо приложение, може да имате много изолирани DOM roots.

За да рендерирате React елемент в root DOM node, подайте го на `ReactDOM.render()`:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

На страницата ще видите "Hello, world".

## Актуализиране на рендерирания елемент {#updating-the-rendered-element}

React елементите са [immutable](https://en.wikipedia.org/wiki/Immutable_object). След като създадете елемент, не можете да променяте неговите деца или атрибути. Елементът е като един кадър от филм: той визуализира потребителския интерфейс в определен момент във времето.

С нашите познания досега единственият начин да обновите потребителския интерфейс е да създадете нов елемент и да го подадем на `ReactDOM.render()`.

Разгледайте този пример на часовник:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

Той извиква `ReactDOM.render()` всяка секунда от [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) функцията.

>**Забележка:**
>
>На практика повечето React приложения извикват веднъж `ReactDOM.render()`. В следващите раздели ще научим как такъв код се капсулира в [компоненти имащи състояние](/docs/state-and-lifecycle.html).
>
>Препоръчваме ви да не прескачате теми, защото те зависят една от друга.

## React обновява само каквото е необходимо {#react-only-updates-whats-required}

React DOM сравнява елемента и неговите деца с предишния и прилага само DOM актуализациите, необходими за привеждане на DOM дървото в желаното състояние.

Можете да проверите, като инспектирате [последния пример](codepen://rendering-elements/update-rendered-element) с инструментите на браузъра:

![DOM инспектор показва подробни актуализации](../images/docs/granular-dom-updates.gif)

Въпреки че създаваме елемент, описващ цялото дърво на потребителския интерфейс на всяка итерация, само текстовият node, чието съдържание се е променило, се актуализира от React DOM.

Според нас, трябва да мислите как потребителският интерфейс трябва да изглежда в даден момент, а не как да го промените с времето. Това елиминира голям спектър от грешки.
