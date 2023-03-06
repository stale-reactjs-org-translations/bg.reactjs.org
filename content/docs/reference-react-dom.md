---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Ако заредите React от `<script>` таг, тези API-та от най-високо ниво са достъпни чрез глобалната променлива `ReactDOM`. Ако използвате ES6 с npm, може да напишете `import ReactDOM from 'react-dom'`. Ако използвате ES5 с npm, може да напишете `var ReactDOM = require('react-dom')`.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

## Преглед {#overview}

<<<<<<< HEAD
`react-dom` пакета предоставя DOM-специфични методи, които могат да се използват на високо ниво във вашето приложение и като авариен изход, ако се нуждаете да излезете от React модела. Повечето от вашите компоненти няма да се нуждаят от този модул.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Поддръжка От Браузъра {#browser-support}

<<<<<<< HEAD
React поддържа всички популярни браузъри, включително Internet Explorer 9 и нагоре, въпреки че [се изискват някои библиотеки за съвместимост](/docs/javascript-environment-requirements.html) за по-стари браузъри като IE 9 и IE 10.
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

> Бележка:
>
<<<<<<< HEAD
> Не поддържаме по-стари браузъри, които не поддържат ES5 методите, но може да видите, че вашите приложения работят в по-стари браузъри, ако библиотеките за съвместимост като [es5-shim и es5-sham](https://github.com/es-shims/es5-shim) са добавени на страницата. Сами сте, ако решите да поемете по този път.

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

## Референция {#reference}

### `createPortal()` {#createportal}

> Try the new React documentation for [`createPortal`](https://beta.reactjs.org/reference/react-dom/createPortal).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
Рендерира React елемент в DOM в предоставения `container` и връща [референция](/docs/more-about-refs.html) на компонента (или връща `null` за [компоненти без state](/docs/components-and-props.html#function-and-class-components)).
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

> Try the new React documentation for [`flushSync`](https://beta.reactjs.org/reference/react-dom/flushSync).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}

> Try the new React documentation for [`render`](https://beta.reactjs.org/reference/react-dom/render).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

Aко React елемента е бил рендериран в `container` преди това, ще направи ъпдейт на елемента и ще промени само DOM-а, така че да отрази последната версия на React елемента.

Ако незадължителния callback е предоставен, той ще бъде извикан след като компонента се рендерира или ъпдейтне.

> Бележка:
>
<<<<<<< HEAD
> `ReactDOM.render()` контролира съдържанието на контейнера който сме подали. Всички съществуващи DOM елементи вътре са заместени, когато са извикани за пръв път. Последващите извикванията използват DОМ различаващия алгоритъм на React за ефикасни ъпдейти.
>
> `ReactDOM.render()` не променя контейнера (променя само децата на контейнера). Може да е възможно вкарването на компонент в съществуващ DOM елемент без да презаписва съществуващите деца.
>
> `ReactDOM.render()` връща референция към инстанцията на основния `ReactComponent`. Въпреки това, използването на тази върната стойност не се препоръчва (legacy).
>  и трябва да бъде избягвана, защото в бъдещите версии на React може да рендерираме компоненти асинхронно в някои случаи. Ако се нуждаете от инстанция на главния компонент `ReactComponent`, предпочитаното решение е да закачите
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) на главния компонент.
>
> Използвайки `ReactDOM.render()` да хидратирате контейнер рендериран на сървъра е препоръчано да не се изполва и ще бъде премахнато в React 17. Изполвайте [`hydrate()`](#hydrate) вместо това.
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) instead.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

* * *

### `hydrate()` {#hydrate}

> Try the new React documentation for [`hydrate`](https://beta.reactjs.org/reference/react-dom/hydrate).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
Също като [`render()`](#render), но се използва да хидратира контейнер, на който HTML съдържанието е било рендерирано от [`ReactDOMServer`](/docs/react-dom-server.html). React ще закачи слушателите на събития към съществуващия документ.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

React очаква, че рендерираното съдържание е индентично между сървъра и клиента. Той може да изглади разликите в текстовото съдържание, но вие трябва да считате разликите като грешки и да ги оправите. В процес на програмиране, React предупреждава за разликите по време на хидратация. Няма гаранции, че разликата в атрибутите ще се изгладят, ако има разминавания. Това е важно поради съображения за бързодействие, защото в повечето приложения, разликите са рядкост и вадилирането на целия HTML ще бъде прекалено скъпо.

Ако атрибут на елемент или текстово съдържание са неизбежно различни между сървъра и клиента (например timestamp), може да заглушите предупреждението като добавите `suppressHydrationWarning={true}` на елемента. Това работи само едно ниво надолу и е предназначено да бъде нещо като авариен изход. Не го използвайте прекалено много. Освен ако е текстово съдържание. React няма да направи опит да го оправи, така че може да остане невярна информация до бъдещи ъпдейти.

Ако нарочно трябва да рендерирате нещо различно на сървъра и клиента, може да направите двойно рендериране. Компонентите, които рендерират нещо различно на клиента могат да четат променлива от state-a като `this.state.isClient`, която може да запишете като `true` в `componentDidMount()`. По този начин, първоначалното рендериране ще рендерира същото съдържание, като на сървъра, без разминавания, но допълнителното рендериране ще се случи синхронно точно след хидратация. Забележете, че този подход ще направи компонентите ви по-бавни, защото те ще трябва да се рендерират два пъти, така че използвайте го внимателно.

Не забравяйте да внимавате за потребителското изживяване на бавни интернет връзки. JavaScript кода може да зареди значително по-късно от първоначалния зареден HTML, така че ако рендерирате нещо различно само на клиента, прехода може да е шокиращ. Въпреки това, ако го направите добре, може да бъде полезно да рендерирате "черупката" на приложението на сървъра, и само да показвате някои от допълнителните функционалности на клиента. Да научите как да направите това без да получавате грешки при различия на маркъп-а, прегледайте обяснението в предишния параграф.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

> Try the new React documentation for [`unmountComponentAtNode`](https://beta.reactjs.org/reference/react-dom/unmountComponentAtNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
Изтрива mounted React компонент от DOM и изчиства обработените събития и state. Ако никой компонент не е бил mounted в контейнера, извикването на тази функция не прави нищо. Връща `true`, ако компонента е бил unmounted и `false`, ако е нямало компонент да unmount.
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

* * *

### `findDOMNode()` {#finddomnode}

<<<<<<< HEAD
> Бележка:
=======
> Try the new React documentation for [`findDOMNode`](https://beta.reactjs.org/reference/react-dom/findDOMNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

> Note:
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200
>
> `findDOMNode` е аварийния изход използван да се достъпи основен DOM елемент. В повечето случаи, използването на този авариен начин се обезсърчава, защото пречупва абстракцията на компонента. [Отхвърлено е в `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
Ако този компонент е бил mounted в DOM-a, този метод връща съответния браузър DOM елемент. Този метод е полезен за четене на стойности извън DOM-a, като стойности на полета на форма и да направи DOM измервания. **В повечето случаи, може да сложите ref на DOM елемента и да не използвате `findDOMNode` въобще.**

Когато компонента рендерира `null` или `false`, `findDOMNode` връща `null`. Когато компонента се рендерира към низ, `findDOMNode` връща текстов DOM елемент, съдържащ стойноста. От React 16 насам, всеки компонент може да върне фрагмент с много деца, в този случай `findDOMNode` ще върне DOM елемента отнасящ се за първото не-празно дете.

> Бележка:
>
> `findDOMNode` работи само в mounted компоненти (това са, компоненти, които са били сложени в DOM-а). Ако се опитате да извикате този метод, на компонент, който още не е бил mounted (като да извикате `findDOMNode()` в `render()` на компонент, който още не е създаден) ще бъде хвърлена грешка.
>
> `findDOMNode` не може да бъде използван във функционални компоненти.

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Създава портал. Порталите осигуряват начин да [ренденираме децата в DОМ елемент, който съществува извън йерархията на DOM компонента](/docs/portals.html).
=======
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200
