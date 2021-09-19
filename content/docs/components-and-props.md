---
id: components-and-props
title: Компоненти и Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---
Компонентите ви дават възможност да разделите потребителския ви интерфейс на независими, многократно използваеми части и да мислите за всяка от тях в изолация.
Тази страница предлага въведение към идеята за компоненти. Тук можете да намерите [подробна справка за API на компонентите](/docs/react-component.html).

Концептуално, компонентите са като JavaScript функции. Те приемат произволни обекти (наричани "props") и връщат React елементи, описващи какво трябва да се появи на екрана.

## Функция и класови компоненти {#function-and-class-components}

Най-простия начин за дефиниране на компонент е да се напише JavaScript функция:

```js
function Welcome(props) {
  return <h1>Здравейте, {props.name}</h1>;
}
```

Тази функция е валиден React компонент, защото приема един обект "props" (идва от "properties") с данни и връща React елемент. Ние наричаме такива компоненти "функция компоненти", защото те са буквално JavaScript функции.

Може също да използвате [ES6 класове](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) за да дефинирате компонент:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Здравейте, {this.props.name}</h1>;
  }
}
```

Горните два компонента са еквивалентни от гледна точка на React.

Класовете имат някои допълнителни функции, които ще обсъдим в [следващите раздели](/docs/state-and-lifecycle.html). Дотогава ще използваме функция компоненти заради тяхната компактност.

## Rendering a Component {#rendering-a-component}

По-рано срещнахме само React елементи, които представляват DOM тагове:

```js
const element = <div />;
```

Освен това, елементите могат също да представляват дефинирани от потребителя компоненти:

```js
const element = <Welcome name="Иван" />;
```

Когато React срещне елемент, представляващ дефиниран от потребителя компонент, той предава JSX атрибутите и децата на този компонент като един обект. Ние наричаме този обект "props".

Този код например показва „Здравейте, Иван“ на страницата:

```js{1,5}
function Welcome(props) {
  return <h1>Здравейте, {props.name}</h1>;
}

const element = <Welcome name="Иван" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Нека повторим какво се случва в този пример:

1. Използваме `ReactDOM.render()` с елемента `<Welcome name="Иван" />`.
2. React използва `Welcome` компонента с `{name: 'Иван'}` като props.
3. Нашия `Welcome` компонент връща `<h1>Здравейте, Иван</h1>` елемент като резултат.
4. React DOM ефективно актуализира DOM, който съответства на `<h1>Здравейте, Иван</h1>`.

>**Забележа:** Винаги започвайте имената на компонентите с главна буква.
>
>React третира компонентите, започващи с малки букви като DOM тагове. Например, `<div />` представлява HTML div таг, но `<Welcome />` представлява компонент и изисква функцията `Welcome` да бъде в обхват.
>
>За да научите повече за идеите зад тази конвенция, моля прочетете [JSX в детайли](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Композиране на компоненти {#composing-components}

Всеки компонент може да използва други компоненти като резултат. Това ни позволява да използваме същата абстракция на компонента на всяко ниво. Бутон, Форма, dialog: в React приложения, всички те обикновено се изразяват като компоненти.

Например, можем да създадем `App` компонент, който използва `Welcome` многократно:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Иван" />
      <Welcome name="Драган" />
      <Welcome name="Петкан" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Обикновенно новите React приложения започват с един основен `App` компонент. В случаите, когато интегрирате React във вече съществуващо приложение, може да започнете отдолу-нагоре с малък компонент, като например `Button` и постепенно да стигнете до върха на йерархията.

## Extracting Components {#extracting-components}

Не се страхувайте да разделяте компонентите на по-малки компоненти.

Например разгледайте този `Comment` компонент:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

Той приема `author` (като обект), `text` (низ), и `date` (дата) като props и описва коментар в уебсайт на социална медия.

Този компонент може да се окаже труден за промяна поради многото вложени елементи. Също така е трудно да преизползваме отделните му части. Нека го разделим на няколко по-малки компонента.

Първо, ще извлечем `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
`Avatar` не е нужно да знае, че той се визуализира от `Comment`. Ето защо сме дали по-общо име: `user`, а не `author`.

Ние препоръчваме наименуването на props от гледна точка на компонента, а не от контекста в който се използва.

Сега можем да опростим `Comment` малко:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Сега, ще извлечем компонентът `UserInfo`, който визуализира `Avatar` до името на потребителя:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Това ни позволява да опростим `Comment` още повече:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

<<<<<<< HEAD
Извличането на компоненти може да изглежда като трудна и груба работа в началото, но разполагайки с палитра от компоненти за многократна употреба се изплаща в по-големите приложения. Прието е ако част от вашият потребителски интерфейс се използва многократно (`Button`, `Panel`, `Avatar`) или е достатъчно сложен сам по себе си (`App`, `FeedStory`, `Comment`), да го приемем като добър кандидат за компонент за многократна употреба.
=======
Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

## Props са Read-Only {#props-are-read-only}

Дали декларирате компонент [като функция или клас](#function-and-class-components), той никога не трябва да променя собствените си props. Вземете в предвид тази `sum` функция:

```js
function sum(a, b) {
  return a + b;
}
```

Такива функции се наричат ["pure"](https://en.wikipedia.org/wiki/Pure_function), защото те не се опитват да променят входните си данни и винаги връщат същия резултат за същите входни данни.

За разлика от това, тази функция е impure, защото променя собствените си входни данни:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React е доста гъвкав, но има едно строго правило:

**Всички React компоненти трябва да действат като pure функции по отношение на техните props.**

Разбира се, потребителските интерфейси на приложенията са динамични и се променят с времето. В [следващата секция](/docs/state-and-lifecycle.html), ще въведем нова концепция за "state". State дава възможност на React компоненти да променят тяхния резултат с течение на времето в отговор на потребителски действия, отговори от външни заявки и други, без да нарушаваме това правило.
