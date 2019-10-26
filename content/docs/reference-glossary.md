---
id: glossary
title: Терминологичен речник на React
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Single-page Application {#single-page-application}

Single-page application е вид приложение, което зарежда една HTML страница заедно с всички необходими активи (например JavaScript и CSS) за цялостната му работа. Всяко последвало взаимодействие с тази страница или отварянето на последващи страници не изискват допълнителни заявки до сървъра или с други думи, страницата не се презарежда.

Въпреки, че можете да създадете Single-page application страница с React, това не е задължително изискване. React може да бъде използван и за подобряване на малки части от вече съществуващи уеб страници чрез добавяне на допълнителна интерактивност. Код написан на React може да съжителства съвместно с markup рендериран на сървъра (например от PHP) или с друга client-side библиотека. Всъщност, React се използва точно по този начин във Facebook.

## ES6, ES2015, ES2016, и т.н. {#es6-es2015-es2016-etc}

Всички тези акроними се отнасят за най-скорошните версии на стандарта за спецификация на езика ECMAScript, kato JavaScript е негова имплементация. Версита ES6 (още известна като ES2015) включва много нови допълнения към предишните версии, като например: arrow functions, classes, template literals, `let` и `const`. Можете да научите повече относно специфичните версии [тук](https://en.wikipedia.org/wiki/ECMAScript#Versions).

## Компилатори {#compilers}

JavaScript компилатора приема JavaScript код, трансформира го и връща JavaScript код в друг формат. Най-често срещаната употреба е приемането на ES6 синтаксис и преработката му в синтаксис, който по-старите браузъри могат да интерпретират. [Babel](https://babeljs.io/) е компилатора, който се използва най-често съвместно с React.

## Bundlers {#bundlers}

Bundler-a взимат JavaScript и CSS код написан като отделни модули (често стотици) и ги събира заедно в по-малко на брой файлове, които са по-добре оптимизирани за браузърите. Някои bundler-и, които са често използвани в React приложения са [Webpack](https://webpack.js.org/) и [Browserify](http://browserify.org/).

## Мениджъри на пакети {#package-managers}

Мениджърите на пакети са инструменти, които позволяват на потребителя да управлява зависимостите в едно приложение. [npm](https://www.npmjs.com/) и [Yarn](https://yarnpkg.com/) са два такива, които са често използвани при разработката на приложения с React. И двата са клиенти за npm регистъра на пакети.
Package managers are tools that allow you to manage dependencies in your project. [npm](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) are two package managers commonly used in React applications. Both of them are clients for the same npm package registry.

## CDN {#cdn}

CDN е съкращение от Content Delivery Network (Мрежа за доставка на съдържание). CDN-ите предоставят статично съдържание кещирано от мрежа от сървъри по целия свят.

## JSX {#jsx}
JSX е разширение на синтаксиса на JavaScript. Наподобява шаблонен език (template language), но има на разположение пълната сила на JavaScript. JSX се компилира до извиквания на `React.createElement()`, което връща обикновени JavaScript обекти наричани "React елементи". За основно въведение в JSX [прочетете документацията тук](/docs/introducing-jsx.html), а по-задълбочен урок по JSX можете да намерите [тук](/docs/jsx-in-depth.html).

React DOM замества стандарната конвенция при именуването на HTML атрибути, използвайки camelCase. Например, `tabindex` става `tabIndex` в JSX. Атрибута `class` се изписва като `className`, тъй като `class` е запазена дума в JavaSCript:
```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">My name is {name}!</h1>,
  document.getElementById('root')
);
```  

## [Елементи](/docs/rendering-elements.html) {#elements}

React елементите са изграждащите блокове на React приложенията. Човек би сгрешил елементите с по-широко разпознаваемата концепция на "компоненти". Елемента описва какво искате да се визуализира на екрана. React елементите са неизменни.

```js
const element = <h1>Hello, world</h1>;
```

Обикновено елементите не се използват директно, а се връщат от компоненти.

## [Компоненти](/docs/components-and-props.html) {#components}

Компонентите в React са малки, преизползваеми парчета код, които връщат React елемент за да бъде рендериран на страницата. Най-простата версия на React компонент е обикновена JavaScript функция, която връща React елемент:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Компоненти могат да бъдат и ES6 класове:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Компоненти могат да бъдат разбити на обособени парчета от функционалности и използвани в други компоненти. Компоненти могат да връщат други компоненти, масиви, низове и числа. Добро правило е, че ако част от вашият UI се използва на няколко места (Button, Panel, Avatar) или е достатъчно сложна сама по себе си (App, FeedStory, Comment), то тази част е кандидат за преизползваем компонент. Имената на компонентите трябва винаги да започват с главна буква (`<Wrapper/>` **,а не** `<wrapper/>`). Прочетете [тази статия](/docs/components-and-props.html#rendering-a-component) за повече информация за рендерирането на компоненти.

### [`props`](/docs/components-and-props.html) {#props}

`props` е вид входяща информация за един React компонент. Те се предават от компонент-родител към компонент-наследник.

Запомнете, че `props` са само за четене. Те не бива да се модифицират по какъвто и да е начин:

```js
// Грешно!
props.number = 42;
```

Ако ви се налага да модифицирате дадена стойност в отговор на входяща информация от потребител или мрежови отговор, то използвайте `state`.

### `props.children` {#propschildren}

`props.children` е на разположение във всеки компонент. Стойността му е съдържанието между отварящите и затварящи тагове на компонент. Например:

```js
<Welcome>Hello world!</Welcome>
```

Низа `Hello world!` е наличен като стойност в `props.children` в компонент `Welcome`:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

За компоненти дефинирани като класове, използвайте `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Компонент се нуждае от `state` когато дадени данни свързани с него се променят във времето. Например, `Checkbox` компонент може да се нуждае от стойност `isChecked` в неговия state, a компонент `NewsFeed` може да има нуждата да запазва `fetchedPosts` в неговия state.

Основната разлика между `state` и `props` е, че `props` се предават от компонент-, а `state` се управлява от самият компонент. Компонент не може да променя неговите `props`, но може да променя своят `state`. За да го направи, трябва да извика `this.setState()`. Само компоненти дефинирани като класове могат да имат state.

За всяка индивидуална част променливи данни трябва да има един компонент, който отговаря за запазването им в собствения си state. Не се опитвайте да синхронизирате състоянията на два различни компонента. Вместо това [го издигнете](/docs/lifting-state-up.html) до най-близкия общ прародител и го предайте като props на всеки един от тези компоненти.

## [Lifecycle методи](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle методите са персонализирана функционалност, която се изпълнява по време на различните фази на компонента. Има методи, които са налични при създаването и добавянето на компонента към DOM ([монтиране](/docs/react-component.html#mounting)), когато компонента се актуализира и когато компонента се демонтира или премахне от DOM.

 ## [Контролирани](/docs/forms.html#controlled-components) и [Неконтролирани Компоненти](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Reconciliation](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
