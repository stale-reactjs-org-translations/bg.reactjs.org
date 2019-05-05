---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Ако заредите React от `<script>` таг, тези API-та от най-високо ниво са достъпни чрез глобалната променлива `ReactDOM`. Ако използвате ES6 с npm, може да напишете `import ReactDOM from 'react-dom'`. Ако използвате ES5 с npm, може да напишете `var ReactDOM = require('react-dom')`.

## Преглед {#overview}

`react-dom` пакета предоставя DOM-специфични методи, които могат да се използват на високо ниво във вашето приложение и като авариен изход, ако се нуждаете да излезете от React модела. Повечето от вашите компоненти няма да се нуждаят от този модул.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Поддръжка От Браузъра {#browser-support}

React поддържа всички популярни браузъри, включително Internet Explorer 9 и нагоре, въпреки че [някои библиотеки за съвместимост се изискват](/docs/javascript-environment-requirements.html) за по-стари браузъри като IE 9 и IE 10.

> Бележка:
>
> Не поддържаме по-стари браузъри, които не поддържат ES5 методите, но може да видите, че вашите приложения работят в по-стари браузъри, ако библиотеките за съвместимост като [es5-shim и es5-sham](https://github.com/es-shims/es5-shim) са добавени на страницата. Сами сте, ако решите да поемете по този път.

* * *

## Референция {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Рендерира React елемент в DOM в предоставения `container` и връща [референция](/docs/more-about-refs.html) на компонента (или връща `null` за [компоненти без state](/docs/components-and-props.html#functional-and-class-components)).

Aко React елемента е бил рендериран в `container` преди, това ще направи ъпдейт на елемента и ще промени само DOM като необходимост да се отрази на последният React елемент.

Ако незадължителния callback е предоставен, той ще бъде извикан след като компонента се рендерира или ъпдейтне.

> Бележка:
>
> `ReactDOM.render()` контролира съдържанието на контейнера който сме подали. Всички съществуващи DOM елементи вътре са заместени, когато са извикани за пръв път. По късно извикванията използват DОМ различаващия алгоритъм на React за ефикасни ъпдейти.
>
> `ReactDOM.render()` не променя контейнера (само децата на контейнера променя). Може да е възможно вкарването на компонент в съществуващ DOM елемент без да презаписва съществуващите деца.
>
> `ReactDOM.render()` връща референция към инстанцията на основния `ReactComponent`. Въпреки това, използвайки тази върната стойност е наследствена.
>  и трябва да бъде избягвана, защото в бъдещите версии на React може да рендерираме компоненти асинхронно в някои случаи. Ако се нуждаете от инстанция на главния компонент `ReactComponent`, предпочитаното решение е да закачите
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) на главния компонент.
>
> Използвайки `ReactDOM.render()` да хидратирате контейнер рендериран на сървъра е препоръчано да не се изполва и ще бъде премахнато в React 17. Изполвайте [`hydrate()`](#hydrate) вместо това.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Съшо като [`render()`](#render), но се използва да хидратира контейнер, на който HTML съдържанието е било рендерирано от [`ReactDOMServer`](/docs/react-dom-server.html). React ще закачи слушателите на събития към съществуващия документ.

React очаква, че рендерираното съдържание е индентично между сървъра и клиента. Той може да изглади разликите в текстовото съдържание, но вие трябва да считате разликите като грешки и да ги оправите. В процес на програмиране, React предупреждава за разликите повреме на хидратация. Няма гаранции, че разликата в атрибутите ще се изгладят, ако има разминавания. Това е важно поради съображения за бързодействие, защото в повечето приложения, разликите са рядкост и вадилирането на целия HTML ще бъде прекалено скъпо.

Ако атрибут на елемент или текстово съдържание са неизбежно различни между сървъра и клиента (например timestamp), може да заглушите предупреждението като добавите `suppressHydrationWarning={true}` на елемента. Това работи само едно ниво надолу и е предназначено да бъде авариен изход. Не го използвайте прекалено много. Освен ако е текстово съдържание. React още няма да направи опит да го оправи, така че може да остане невярна информация до бъдещи ъпдейти.

Ако нарочно трябва да рендерирате нещо различно на сървъра и клиента, може да направите двойно рендериране. Компонентите, които рендерират нещо различно на клиента могат да четат променлива от state-a
If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to `true` in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.
ете да бъдете  

Не забравяйте да внимавате за потребителското изживяване на бавни интернет връзки. JavaScript кода може да зареди значително по-късно от първоначалния зареден HTML, така че ако рендерирате нещо различно само на клиента, прехода може да е шокиращ. Въпреки това, ако го направите добре, може да бъде полезно да рендерирате "черупка" на приложението на сървъра, и само да показвате някои от допълнителните функционалности на клиента. Да научите как да направите това без да получавате грешки при различия на маркъп-а, прегледайте обяснението в предишния параграф.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Изтрива маунтнат React компонент от DOM и изчиства обработените събития и state. Ако никой компонент не е бил маунтнат в контейнера, извикването на тази функция не прави нищо. Връща `true`, ако компонента е бил ънмаунтнат и `false`, ако е нямало компонент да ънмаунтне.

* * *

### `findDOMNode()` {#finddomnode}

> Бележка:
>
> `findDOMNode` is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction. [It has been deprecated in `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Ако този компонент е бил маунтнат в DOM-a, това връща съответния браузър DOM елемент. Този метод е полезен за четене на стойности извън DOM-a, като стойности на полета на форма и да направи DOM измервания. **В повечето случаи, може да сложите ref на DOM елемента и да не използвате `findDOMNode` като цяло.**

Когато компонента рендерира `null` или `false`, `findDOMNode` връща `null`. Когато компонента се рендерира към низ, `findDOMNode` връща текстов DOM елемент, съдържащ стойноста. Като от React 16, компонент може да върне фрагмент с много деца, в този случай `findDOMNode` ще върне DOM елемента отнасящ се за първия не-празно дете.

> Бележка:
>
> `findDOMNode` работи само в маунтнати компоненти (това са, компоненти, които са били сложени в DOM). Ако се опитате да извикате това, на компонент, който още не е бил маунтнат (като да извикате `findDOMNode()` в `render()` на компонент, който още не е създаден) ще бъде хвърлена грешка.
>
> `findDOMNode` не може да бъде използван в функционални компоненти.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Създава портал. Порталите осигуряват начин да [ренденираме децата в DОМ елемент, който съществува извън йерархията на DOM компонента](/docs/portals.html).
