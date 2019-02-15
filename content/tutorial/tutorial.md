---
id: tutorial
title: "Урок: въведение в React"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Този урок не изисква опит с React.

## Преди да започнем {#before-we-start-the-tutorial}

Ще създадем малка игра по време на този урок. **Може да се изкушите да го пропуснете, защото не създавате игри, но дайте му шанс.** Техниките, които ще научите тук, са от основно значение за изграждането на всякакви приложения с React, а овладяването му ще ви помогне да разберете идеите вплетени в React.

>Съвет
>
>Този урок е предназначен за хора, които предпочитат **да учат чрез практика**. Ако предпочитате да започнете с основните концепции, разгледайте нашето [стъпка-по-стъпка ръководство](/docs/hello-world.html). Може да откриете, че този урок и ръководството се допълват взаимно.

Урокът е разделен на няколко части:

* [Технически детайли](#setup-for-the-tutorial) ще ви даде **инструменти**, за да следвате урока.
* [Преглед](#overview) ще ви научи на **основите** на React: компоненти, props и състояние.
* [Завършване на играта](#completing-the-game) ще ви научи на **най-често срещаните техники** в работа с React.
* [Добавяне на "Пътуване във времето"](#adding-time-travel) ще ви даде **по-дълбоко разбиране** в уникалните силни страни на React.

Не е необходимо да попълните всички секции наведнъж, за да получите стойността от този урок. Опитайте се да стигнете, доколкото можете - дори ако това е една или две секции.

Може да копирате кода, докато следвате урока, но препоръчваме да го въведете на ръка. Това ще ви помогне да развиете мускулна памет и да разберете добре въпросните примери.

### Какво ще правим? {#what-are-we-building}

В този урок ще разработим интерактивна игра Tic-Tac-Toe с React.

Можете да видите завършения вариант тук: **[Краен резултат](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Ако кодът за вас в момента е лишен от смисъл, или ако не сте запознати със синтаксиса, не се притеснявайте! Целта на този урок е да ви помогне да разберете React и неговия синтаксис.

Препоръчваме ви да прегледате играта на tic-tac-toe преди да продължите с урока. Една от функциите, които ще забележите, е, че в дясната част на дъската има номериран списък. Този списък ви дава история на всички ходове, които са направени, и се актуализира с напредването на играта.

Можете да затворите tic-tac-toe примера, след като сте се запознали с него. Ще започнем от по-прост код в този урок. Следващата ни стъпка е да ви подготвим така, че да можете да започнете реализирането на играта.

### Предварителни стъпки {#prerequisites}

Ще приемем, че сте запознати с HTML и JavaScript. Трябва да можете да следвате такъв код, дори ако идвате от различен език за програмиране. Предполагаме също, че сте запознати с концепции за програмиране като функции, обекти, масиви и в по-малка степен - класове.

Ако искате да се запознаете с JavaScript, препоръчваме ви да прочетете [това ръководство](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Имайте предвид, че използваме и някои функции от ES6 - наскоро излязла версия на JavaScript. Например [arrow функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [класове](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) и [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). Можете да използвате [Babel REPL](babel://es5-syntax-example), за да проверите към какъв код се компилира показания ES6.

## Технически детайли {#setup-for-the-tutorial}

Има два начина да завършите този урок: можете или да напишете кода в браузъра си, или да настроите локална среда на компютъра си.

### Опция 1: код в браузъра {#setup-option-1-write-code-in-the-browser}

Това е най-бързият начин да започнете!

Първо отворете този линк **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** в нов таб. Трябва да видите празна игрална дъска с tic-tac-toe и код на React. Ще редактираме кода на React в този урок.

Сега можете да пропуснете втората опция и да отидете на секцията [Преглед](#overview).

### Опция 2: локална среда {#setup-option-2-local-development-environment}

Това е напълно незадължително и не се изисква за този урок!

<br>

<details>

<summary><b>По ваш избор: Инструкция за разработка локално през ваш предпочитам редактор</b></summary>

Тази настройка изисква повече работа, но ви позволява да завършите урока с помощта на редактор по ваш избор. Ето следните стъпки:

1. Уверете се, че имате инсталирана последна версия на [Node.js](https://nodejs.org/en/).
2. Следвайте [инструкциите за инсталиране на Create React App](/docs/create-a-new-react-app.html#create-react-app), за да направите нов проект.

```bash
npx create-react-app my-app
```

1. Изтрийте всички файлове в папката `src /` на новия проект

> Забележка:
>
>**Не изтривайте цялата папка "src", само оригиналните файлове в нея.** Ще заменим файлове по подразбиране с примери свързани с този урок в следващата стъпка.

```bash
cd my-app
cd src

# If you're using a Mac or Linux:
rm -f *

# Or, if you're on Windows:
del *

# Then, switch back to the project folder
cd ..
```

1. Добавете файл с име `index.css` в папката `src/` с [този CSS код](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

2. Добавете файл с име `index.js` в папката `src/` с [този JS код](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

3. Добавете тези три реда в началото на `index.js` в папката `src/`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Сега, ако стартирате `npm start` в папката на проекта и отворете `http://localhost:3000` в браузъра, трябва да видите празно tic-tac-toe поле.

Препоръчваме ви да следвате тези инструкции (https://babeljs.io/docs/editors/), за да конфигурирате syntax highlighting за вашия редактор.

</details>

### Помощ, имам проблем! {#help-im-stuck}

Ако имате проблем, проверете [ресурсите за подкрепа на общността](/community/support.html). По-специално, [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) е чудесен начин бързо да получите помощ. Ако не получите желания отговор, или все още имате проблеми, моля, задайте вашите въпроси и ние ще ви помогнем.

## Преглед {#overview}

Сега, след като имате готова среда за работа нека да продължим с прегледа на React!

### Какво е React? {#what-is-react}

React е декларативна, ефикасна и гъвкава JavaScript библиотека за изграждане на потребителски интерфейси. Тя ви позволява да построявате сложни потребителски интерфейси от малки и изолирани части от код, наречени "компоненти".

React има няколко различни вида компоненти, но ние ще започнем с тези, които наследяват `React.Component`:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

Скоро ще стигнем до "забавните" тагове, подобни на XML. Използваме компоненти, за да кажем на React какво искаме да видим на екрана. Когато нашите данни се променят, React ефективно ще актуализира и рендерира нашите компоненти.

Тук, ShoppingList е **React class компонент**, или **React компонентен тип**. Компонентът взима параметри, наричани `props` (съкратени от "properties"), и връща йерархия от изгледи за рендериране чрез метода `render`.

Методът `render` връща *описание* на това, което искате да видите на екрана. React приема описанието и показва резултата. По-специално `render` връща **React елемент**, който е всъщност описание на това какво да се визуализира. Повечето разработчици на React използват специален синтаксис, наречен "JSX", който прави тези структури по-лесни за писане. Синтаксисът `<div />` се преобразува по време на компилиране в `React.createElement('div')`. Горният пример е еквивалентен на:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[Виж цялата версия тук.](babel://tutorial-expanded-version)

Ако сте любопитни, `createElement()` е описан по-подробно в [API документацията](/docs/react-api.html#createelement), но няма да го използваме в този урок. Вместо това ще продължим да използваме JSX.

JSX идва с многото възможности на JavaScript. Можете да използваме *всякакви* JavaScript изрази в скоби в JSX. Всеки React елемент е JavaScript обект, който можете да съхраните в променлива или да предавате от функция на функция в апликацията си.

Компонентът `ShoppingList` показва само вградени DOM компоненти като `<div />` и `<li />`. Но можете да създавате и рендерирате свои собствени React компоненти. Например, сега можем да се използваме целия списък за пазаруване, като напишем `<ShoppingList />`. Всеки React компонент е капсулиран и може да работи самостоятелно; това ви позволява да изграждате сложни потребителски интерфейси от прости компоненти.

## Разглеждане на началния код {#inspecting-the-starter-code}

If you're going to work on the tutorial **in your browser,** open this code in a new tab: **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. If you're going to work on the tutorial **locally,** instead open `src/index.js` in your project folder (you have already touched this file during the [setup](#setup-option-2-local-development-environment)).

This Starter Code is the base of what we're building. We've provided the CSS styling so that you only need to focus on learning React and programming the tic-tac-toe game.

By inspecting the code, you'll notice that we have three React components:

* Square
* Board
* Game

The Square component renders a single `<button>` and the Board renders 9 squares. The Game component renders a board with placeholder values which we'll modify later. There are currently no interactive components.

Ако сте избрали да работите **в браузъра си.** отворете този код в нов таб: **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Ако пък ще работите **локално,** отворете `src/index.js` в папката на проекта (вече редактирахме този файл по време на секция [Технически детайли](#setup-option-2-local-development-environment)).

Този стартов код е основата на нашата игра. Имаме наличен CSS, така че ще се съсредоточим върху използването на React и програмиране на играта Tic-Tac-Toe.

Разгледайте кода, ще забележите, че имаме три компонента React:

* Square
* Board
* Game

Компонентът `Square` рендерира единствения бутон на екрана, а `Board` показва 9 квадрата. Компонентът `Game` визуализира дъска със стойности, които ще променим по-късно. В момента няма интерактивни елементи.

### Подаване на данни ползвайки props {#passing-data-through-props}

Като за начало, нека опитаме да подадем данни от нашия `Board` компонент към `Square` компонента.

В метода `renderSquare` на `Board`, променете кода, така че да подадем prop с име `value`.

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Променете метода `render` na `Square` компонента така, че да покажете стойност. Заменете `{/* TODO */}` с `{this.props.value}`:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Преди:

![React Devtools](../images/tutorial/tictac-empty.png)

След: Би трябвало да видите число във всеки един от квадратите.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Вижте целия код до този момент](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Честито! Току-що "предадохме prop" от родителския `Board` към дъщерния `Square` компонент. Предаването на props е начинът, по който информацията се пренася в React приложенията, от родители към деца компоненти.

### Създаване на интерактивен компонент {#making-an-interactive-component}

Нека да запълним `Square` компонента с "X" всеки път, когато го натиснем.
Първо нека променим `button` тагът в `render` метода:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Ако натиснем бутона сега ще видим съобщението "click".

>Забележка
>
>За да спестим писане и за да избегнем [объркващото поведение на `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), тук и за напред ще използваме [arrow функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) на местата където трябва да прихванем събития. 
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Забележете как с `onClick={() => alert('click')}` предаваме *функция* като стойност на `onClick` prop-a. Тя се извиква само след натискане на бутона. Изспускането на `() =>` и използването на `onClick={alert('click')}` е често срещана грешка и би показала съобщението "click" всеки път, когато компонентът се рендерира.

Като следваща стъпка искаме компонентът `Square` да "помни", че е бил натиснат, и да се запълни с "X" маркер. За да запомнят неща, React компонентите използват **състояние (state)**.

React компонентите могат да имат състояние чрез инициализирането на "this.state" в своите конструктори. `this.state` трябва да се разглежда като вътрешен за компонента, в който е дефиниран. Нека да запазим текущата стойност на `Square` в `this.state` и да я променим, когато щракнем върху компонента.

Първо, ще добавим конструктор към класа, за да инициализира състоянието:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Забележка
>
>В [JavaScript класовете](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), трябва винаги да извикваме `super` когато дефинираме конструктор в наследяващия клас. Ако дефинираме React компонент като клас и добавим конструктор то той трябва винаги да започнем с `super(props)`.

Сега ще променим метода `render` на `Square`, за да покажем стойността на текущото състояние при кликване:

* Заменете `this.props.value` с `this.state.value` при `<button>` тага.
* Заменете стойноста на `onClick` prop-a от `() => alert ()` към `() => this.setState({value: 'X'})`.
* Поставете `className` и `onClick' на отделни линии за по-добра четимост.

След тези промени тагът `<button>`, който се връща от метода `render` на Square, изглежда така:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Като извиквате `this.setState` от `onClick` функцията в метода `render` на Square, ние казваме на React да ре-рендерира този квадрат всеки път, когато се натисне неговия бутон. След актуализацията, `this.state.value` ще бъде `'X'`, така че ще видим `X` на екрана. Ако кликнете върху някой от Square компонентите, ще се покаже `X`.

Когато извикваме `setState` в компонент, React автоматично актуализира дъщерните компоненти вътре в него.

**[Виж целия код тук](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Инструменти в помощ на програмиста {#developer-tools}

React Devtools приставката за [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) и [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) ви позволява да изследвате дърво от React компоненти с помоща на вградените инструменти на вашия browser.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

След като инсталирате React DevTools, можете да щракнете с десния бутон на мишката върху който и да е елемент на страницата, да кликнете върху "Inspect", и да отворите инструментите за разработчици (devtools), а таба React ще се появи като последния раздел вдясно.

**Все пак имайте предвид, че има няколко допълнителни стъпки, за да можете да видите това в CodePen:**

1. Влезте в профила си или се регистрирайте и потвърдете имейла си (необходим за предотвратяване на спам).
2. Кликнете върху бутона "Fork".
3. Кликнете върху "Change View" и изберете "Debug mode".
4. В новия таб, който се отваря, devtools ще покаже и таб React.

## Завършване на играта {#completing-the-game}

We now have the basic building blocks for our tic-tac-toe game. To have a complete game, we now need to alternate placing "X"s and "O"s on the board, and we need a way to determine a winner.

Вече имаме основните градивни елементи за нашата игра tic-tac-toe. За да я завършим обаче, сега трябва да заменим поставянето на "X" и "O" на дъската и накрая се нуждаем от начин да определим победител.

### Изнасяне на състоянието на по-горно ниво {#lifting-state-up}

В момента всеки Square компонент има вътрешно състояние. За да проверим кой е победител, ние трябва да разполагаме със стойността на всеки от 9-те квадрата на едно място.

Може да мислим, че Board трябва просто да _попита_ всеки Square за вътрешното му състояние. Въпреки, че този подход е възможен в React, ние не го препоръчваме, защото кодът става труден за разбиране, податлив на бъгове и е трудно да бъде променян. Вместо това най-добрият подход е да се запази състоянието на играта в родителския Board компонент, вместо във всеки Square. Board може да каже на всеки Square какво да покаже, като подаде стойноста през prop, [както направихме, когато предадохме число на всеки Квадрат](#passing-data-through-props).

**За да се събират данни от множество дъщерни компоненти или да осъществим комуникация между такива, трябва да декларирате споделеното състояние в родителския им компонент. Родителският компонент може да прехвърли състоянието обратно на децата с помощта на props; това поддържа синхронизирани дъщерните компоненти един с друг и с родителския компонент.**

Изнасянето на състоянието на по-горно ниво в родителския компонент е често срещана практика, когато компонентите в React се рефакторират - нека използваме тази възможност, за да го изпробваме. Ще добавим конструктор към Board и ще зададем началното състояние да съдържа масив с 9 нули. Тези 9 нули съответстват на 9те квадрата:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Когато по късно започнем да играем нещата ще изглеждат така:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

`renderSquare` методът на Board компонента за момента изглежда така:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

В началото, ние [прехвърлихме props](#pass-data-through-props) от Board към Square, за да покажем числа от 0 до 8 във всеки квадрат. В друга предишна стъпка заменихме числата с "X" маркер [определен от вътрешното състояние на Square](#making-an-interactive-component). Ето защо Square понастоящем пренебрегва `value` prop-a, предоставена му от Board.

Сега ще използваме отново механизма за подаване на props. Ще модифицираме Board, за да инструктираме всеки отделен Square за неговата текуща стойност (`'X'`, `'O'` или `null`). Вече сме дефинирали масива `squares` в конструктора на Board и ще модифицираме метода `renderSquare`, за да четем от него:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Вижте целия код тук](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Всеки Square сега ще получи `value`, коeто ще бъде `'X'`, `'O'` или `null` за празeн квадрат.

След това трябва да променим какво ще се случи, когато щракнете върху квадрат. Board компонента вече _знае_ кои квадрати са запълнени. Трябва да измислим начин, по който Square да актуализира вътрешното състоянието на Board. Тъй като състоянието се счита за вътрешно за компонент, който го дефинира, не можем да актуализираме състоянието директно.

За да запазим състоянието вътрешно за Board, ще подадем функция от Board към Square. Тази функция ще се извика, когато щракнете върху Square. Ще променим метода `renderSquare` в Board на:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Забележка
>
>Разделяме елементите на няколко реда за по-добра четимост и добавяме скоби, така че JavaScript да не вмъква точка и запетая след `return` и да счипи кода.

Сега подаваме двa props от Board към Square: `value` и `onClick`. Prop-a `onClick` е функция, която Square може да извика при кликване. Ще направим следните промени в Square:

* Заменете `this.state.value` с `this.props.value` в метода `render` на Square
* Заменете `this.setState()` с `this.props.onClick()` в метода `render` на Square
* Изтрийте `constructor` от Square, защото Square вече не следи състоянието на играта

След тези промени Square компонентa изглежда така:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Когато се кликнем на Square компонент, се извиква функцията `onClick`, предоставена от Board. Ето преглед на това как нещата работят:

1. `onClick` prop-a на DOM elementa `<button>` казва на React да настрои слушател на събития при натискане.
2. Когато бутонът е натиснат, React ще извика функцията `onClick`, която е дефинирана в метода 'render()' на Square.
3. Тази функция извиква `this.props.onClick()`. `onClick` на Square e дефиниран от Board компонента.
4. Тъй като Board подава `onClick = {() => this.handleClick (i)}` на Square, той извиква `this.handleClick(i)` при кликване.
5. Все още не сме дефинирали метода `handleClick()', така че кодът ни не работи.

>Забележка
>
>Атрибутът "onClick" на DOM елемента `<button>` има специално значение за React, защото е вграден компонент. За компоненти които ние създаваме, като Square, именуването зависи от нас. Бихме могли да наречем `onClick` prop-a на Square или метода на Board `handleClick` по различен начин. В React обаче е общоприето да се използват `on[Събитие]` имена за props, които представляват събития и `handle[Събитие]` за методите, които обработват събитията.

Когато се опитаме да кликнем върху квадрат, трябва да получим грешка, защото все още не сме дефинирали 'handleClick'. Сега ще добавим `handleClick` към на Board:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Вижте целия код до този момент](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

След тези промени отново можем да кликнем върху квадратчетата, за да ги запълним. Сега обаче състоянието се съхранява в Board компонента вместо в отделните Square компоненти. Когато състоянието на Board се промени, Square компонентите се рендерират автоматично. Съхраняването на състоянието на всички квадрати в Board компонента ще ни позволи да определим победителя в бъдеще.

Компонентите Square вече нямат вътрешно състоянието, те получават стойности от Board и го информират, когато бъдат натиснати. В React терминологията, компонентите Square вече са **контролирани компоненти (controlled components)**. Board има пълен контрол над тях.

Забележете как в `handleClick`, ние извикваме `.slice()`, за да създадем копие на `squares', за да го модифицираме, вместо да модифицираме съществуващия вече масив. Ще обясним защо създаваме копие в следващия раздел.

### Why Immutability Is Important {#why-immutability-is-important}

In the previous code example, we suggested that you use the `.slice()` operator to create a copy of the `squares` array to modify instead of modifying the existing array. We'll now discuss immutability and why immutability is important to learn.

There are generally two approaches to changing data. The first approach is to *mutate* the data by directly changing the data's values. The second approach is to replace the data with a new copy which has the desired changes.

#### Data Change with Mutation {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

#### Data Change without Mutation {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

The end result is the same but by not mutating (or changing the underlying data) directly, we gain several benefits described below.

#### Complex Features Become Simple {#complex-features-become-simple}

Immutability makes complex features much easier to implement. Later in this tutorial, we will implement a "time travel" feature that allows us to review the tic-tac-toe game's history and "jump back" to previous moves. This functionality isn't specific to games -- an ability to undo and redo certain actions is a common requirement in applications. Avoiding direct data mutation lets us keep previous versions of the game's history intact, and reuse them later.

#### Detecting Changes {#detecting-changes}

Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object to be compared to previous copies of itself and the entire object tree to be traversed.

Detecting changes in immutable objects is considerably easier. If the immutable object that is being referenced is different than the previous one, then the object has changed.

#### Determining When to Re-render in React {#determining-when-to-re-render-in-react}

The main benefit of immutability is that it helps you build _pure components_ in React. Immutable data can easily determine if changes have been made which helps to determine when a component requires re-rendering.

You can learn more about `shouldComponentUpdate()` and how you can build *pure components* by reading [Optimizing Performance](/docs/optimizing-performance.html#examples).

### Function Components {#function-components}

We'll now change the Square to be a **function component**.

In React, **function components** are a simpler way to write components that only contain a `render` method and don't have their own state. Instead of defining a class which extends `React.Component`, we can write a function that takes `props` as input and returns what should be rendered. Function components are less tedious to write than classes, and many components can be expressed this way.

Replace the Square class with this function:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

We have changed `this.props` to `props` both times it appears.

**[View the full code at this point](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Note
>
>When we modified the Square to be a function component, we also changed `onClick={() => this.props.onClick()}` to a shorter `onClick={props.onClick}` (note the lack of parentheses on *both* sides). In a class, we used an arrow function to access the correct `this` value, but in a function component we don't need to worry about `this`.

### Taking Turns {#taking-turns}

We now need to fix an obvious defect in our tic-tac-toe game: the "O"s cannot be marked on the board.

We'll set the first move to be "X" by default. We can set this default by modifying the initial state in our Board constructor:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine which player goes next and the game's state will be saved. We'll update the Board's `handleClick` function to flip the value of `xIsNext`:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

With this change, "X"s and "O"s can take turns. Let's also change the "status" text in Board's `render` so that it displays which player has the next turn:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

After applying these changes, you should have this Board component:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[View the full code at this point](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Declaring a Winner {#declaring-a-winner}

Now that we show which player's turn is next, we should also show when the game is won and there are no more turns to make. We can determine a winner by adding this helper function to the end of the file:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

We will call `calculateWinner(squares)` in the Board's `render` function to check if a player has won. If a player has won, we can display text such as "Winner: X" or "Winner: O". We'll replace the `status` declaration in Board's `render` function with this code:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // the rest has not changed
```

We can now change the Board's `handleClick` function to return early by ignoring a click if someone has won the game or if a Square is already filled:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[View the full code at this point](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Congratulations! You now have a working tic-tac-toe game. And you've just learned the basics of React too. So *you're* probably the real winner here.

## Adding Time Travel {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Storing a History of Moves {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Now we need to decide which component should own the `history` state.

### Lifting State Up, Again {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Note
>
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Showing the Past Moves {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
``` 

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Picking a Key {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Implementing Time Travel {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[View the full code at this point](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[View the full code at this point](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Wrapping Up {#wrapping-up}

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).
