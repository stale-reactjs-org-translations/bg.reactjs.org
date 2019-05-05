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

По време на този урок ще създадем малка игра. **Може да се изкушите да го пропуснете, защото не създавате игри, но дайте му шанс.** Техниките, които ще научите тук, са от основно значение за изграждането на всякакви приложения с React. Овладяването му ще ви помогне да разберете по-добре идеите зад библиотеката.

>Съвет
>
>Този урок е предназначен за хора, които предпочитат **да учат чрез практика**. Ако предпочитате да започнете с основните концепции, разгледайте нашето [стъпка-по-стъпка ръководство](/docs/hello-world.html). Може да откриете, че този урок и ръководството се допълват взаимно.

Урокът е разделен на няколко части:

* [Технически детайли](#setup-for-the-tutorial) ще ви даде **инструменти**, за да следвате урока.
* [Преглед](#overview) ще ви научи на **основите** на React: компоненти, props и състояние (state).
* [Завършване на играта](#completing-the-game) ще ви научи на **най-често срещаните техники** в работа с React.
* [Добавяне на "Time travel"](#adding-time-travel) ще ви даде **по-задълбочено разбиране** в уникалните страни на React.

Не е нужно да преминете през всички секции наведнъж, за да имате полза от урока. Опитайте се да стигнете докъдето можете - дори ако това е една или две секции.

Може да копирате кода, докато следвате урока, но препоръчваме да го въведете на ръка. Това ще ви помогне да развиете мускулна памет и да разберете добре въпросните примери.

### Какво ще правим? {#what-are-we-building}

В този урок ще разработим интерактивна игра tic-tac-toe с React.

Можете да видите завършения вариант тук: **[Краен резултат](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Ако кодът за вас в момента е лишен от смисъл, или ако не сте запознати със синтаксиса, не се притеснявайте! Целта на този урок е да ви помогне да разберете React и неговия синтаксис.

Препоръчваме ви да прегледате играта на tic-tac-toe преди да продължите с урока. Една от функциите, които ще забележите, е че в дясната част на дъската има номериран списък. Този списък ви дава история на всички ходове, които са направени, и се актуализира с напредването на играта.

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

<summary><b>По ваш избор: Инструкция за разработка локално през предпочитан от вас редактор</b></summary>

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

Ако имате проблем, проверете [ресурсите в помощ на общността](/community/support.html). По-специално, [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) е чудесен начин бързо да получите помощ. Ако не получите желания отговор, или все още имате проблеми, моля, задайте вашите въпроси и ние ще ви помогнем.

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

Скоро ще стигнем до "забавните" тагове, подобни на XML. Използваме компоненти, за да кажем на React какво искаме да видим на екрана. Когато нашите данни се променят, React ефективно ще актуализира и рендерира тези компоненти.

Тук, ShoppingList е **React class компонент**, или **компонент от тип React**. Компонентът взима параметри, наричани `props` (съкратени от "properties"), и връща йерархия от изгледи за рендериране чрез метода `render`.

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

Компонентът `ShoppingList` показва само вградени DOM компоненти като `<div />` и `<li />`. Но можете да създавате и рендерирате свои собствени React компоненти. Например, сега можем да използваме целия списък за пазаруване, като напишем `<ShoppingList />`. Всеки React компонент е капсулиран и може да работи самостоятелно; това ви позволява да изграждате сложни потребителски интерфейси от прости компоненти.

## Разглеждане на началния код {#inspecting-the-starter-code}

Ако сте избрали да работите **в браузъра си** отворете този код в нов таб: **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Ако пък ще работите **локално,** отворете `src/index.js` в папката на проекта (вече редактирахме този файл по време на секция [Технически детайли](#setup-option-2-local-development-environment)).

Този стартов код е основата на нашата игра. Имаме наличен CSS, така че ще се съсредоточим върху използването на React и програмиране на играта Tic-Tac-Toe.

Разгледайте кода, ще забележите, че имаме три React компонента:

* Square
* Board
* Game

Компонентът `Square` рендерира единствения бутон на екрана, а `Board` показва 9 квадрата. Компонентът `Game` визуализира дъска със стойности, които ще променим по-късно. В момента няма интерактивни елементи.

### Подаване на данни ползвайки props {#passing-data-through-props}

Като за начало, нека опитаме да подадем данни от нашия `Board` компонент към `Square` компонента.

Ние силно препоръчваме писането на код собственоръчно докато работите върху уроците, а не копирането на код. Това ще ви помогне да развиете мускулна памет и по-дълбоко разбиране.

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

Ако натиснем бутона сега ще видим съобщението "click" от браузера.

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
>В [JavaScript класовете](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), трябва винаги да извикваме `super` когато дефинираме конструктор в наследяващия клас. Ако дефинираме React компонент като клас и добавим конструктор то той трябва винаги да започнем със `super(props)`.

Сега ще променим метода `render` на `Square`, за да покажем стойността на текущото състояние при кликване:

* Заменете `this.props.value` с `this.state.value` при `<button>` тага.
* Заменете стойноста на `onClick` prop-a от `() => alert ()` към `() => this.setState({value: 'X'})`.
* Поставете `className` и `onClick` на отделни линии за по-добра четимост.

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

Вече имаме основните градивни елементи за нашата игра tic-tac-toe. За да я завършим обаче, сега трябва да позволим поставянето на "X", но и на "O" и накрая се нуждаем от начин да определим победител.

### Изнасяне на състоянието на по-горно ниво {#lifting-state-up}

В момента всеки Square компонент има вътрешно състояние. За да проверим кой е победител, ние трябва да разполагаме със стойността на всеки от 9-те квадрата на едно място.

Може да предположим, че Board трябва просто да _попита_ всеки Square за вътрешното му състояние. Въпреки, че този подход е възможен в React, ние не го препоръчваме, защото кодът става труден за разбиране, податлив на бъгове и е трудно да бъде променян. Вместо това най-добрият подход е да се запази състоянието на играта в родителския Board компонент, вместо във всеки Square. Board може да каже на всеки Square какво да покаже, като подаде стойноста през prop, [както направихме, когато предадохме число на всеки Квадрат](#passing-data-through-props).

Изнасянето на състоянието на по-горно ниво в родителския компонент е често срещана практика, когато компонентите в React се рефакторират - нека използваме тази възможност, за да го изпробваме.

**За да се събират данни от множество дъщерни компоненти или да осъществим комуникация между такива, трябва да декларирате споделеното състояние в родителския им компонент. Родителският компонент може да прехвърли състоянието обратно на децата с помощта на props; това поддържа синхронизирани дъщерните компоненти един с друг и с родителския компонент.**

Ще добавим конструктор към Board и ще зададем началното състояние да съдържа масив с 9 нули. Тези 9 нули съответстват на 9те квадрата:

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
```

Когато по-късно започнем да играем, `this.state.squares` масивът ще изглежда така:

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
>Разделяме елементите на няколко реда за по-добра четимост и добавяме скоби, така че JavaScript да не вмъква точка и запетая след `return` и да счупи кода.

Сега подаваме двe props от Board към Square: `value` и `onClick`. Prop-a `onClick` е функция, която Square може да извика при кликване. Ще направим следните промени в Square:

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
4. Тъй като Board подава `onClick = {() => this.handleClick(i)}` на Square, той извиква `this.handleClick(i)` при кликване.
5. Все още не сме дефинирали метода `handleClick()`, така че кодът ни не работи. Ако натиснем бутона сега ще видим екран в червено, предупреждаващ за грешка, например "this.handleClick is not a function".

>Забележка
>
>Атрибутът "onClick" на DOM елемента `<button>` има специално значение за React, защото е вграден компонент. За компоненти които ние създаваме, като Square, именуването зависи от нас. Бихме могли да наречем `onClick` prop-a на Square или метода на Board `handleClick` по различен начин. В React обаче е общоприето да се използват `on[Събитие]` имена за props, които представляват събития и `handle[Събитие]` за методите, които обработват събитията.

Когато се опитаме да кликнем върху квадрат, трябва да получим грешка, защото все още не сме дефинирали `handleClick`. Сега ще го добавим към на Board компонента:

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

Забележете как в `handleClick`, ние извикваме `.slice()`, за да създадем копие на `squares`, за да го променим, вместо да модифицираме съществуващия вече масив. Ще обясним защо създаваме копие в следващия раздел.

### Защо immutability е важна концепция {#why-immutability-is-important}

В предишния пример предложихме да използвате оператора `.slice()`, за да създадете копие на масив `squares`, който да променим, вместо да модифицирате съществуващия вече масив. Сега ще обсъдим тази практика (immutability) и защо е важно да бъде разбрана.

Обикновено има два подхода за промяна на данните. Първият подход е да се *мутират* (mutate) данните чрез директна промяна на стойностите. Вторият подход е да се заменят данните с ново копие, което има желаните промени.

#### Промяна на данни с мутация {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

#### Промяна на данни без мутация {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

Крайният резултат е същият, но когато не мутираме (променяме основните данни) директно, получаваме няколко ползи, описани по-долу.

#### Сложните функционалности стават лесни {#complex-features-become-simple}

Immutability прави много по-лесни за изпълнение сложните функции. По-късно в този урок ще имплементираме функция "Time travel", която ни позволява да прегледаме историята на играта на tic-tac-toe и "да се върнем" към предишните ходове. Тази функционалност не е само специфична за игрите - възможността за отмяна и повторно изпълнение на определени действия е често срещано изискване. Избягването на директна мутация на данни ни позволява да запазим предишните версии на играта непокътнати и да ги използваме по-късно.

#### Откриването на промени {#detecting-changes}

Откриването на промени в обекти, които могат да се променят, е трудно, защото те се модифицират директно. Това откриване изисква променения обект да бъде сравняван с предишните си копия и цялото дърво на обекта да бъде обхождано.

Откриването на промени в immutable обекти е значително по-лесно. Ако обектът, към който се обръщаме, е различен от предишния, обектът се е променил.

#### Определяне кога да пререндерираме в React {#determining-when-to-re-render-in-react}

Основното предимство на тази практика е, че помага за изграждането на _чисти (pure)_ компоненти в React. Лесно можем да определим кога данните са променени, което помага да се определи кога даден компонент изисква повторно рендериране.

Можете да научите повече за `shouldComponentUpdate()` и как можете да изградите *чисти компоненти* като прочетете [Оптимизиране на производителността](/docs/optimizing-performance.html#example).

### Функция компонент {#function-components}

Сега ще променим Square, за да бъде **функция компонент**.

В React, **функция компонентите** са по-лесени за писане компоненти, които съдържат само метод за рендериране и нямат вътрешно състояние. Вместо да дефинираме клас, който наследява `React.Component`, можем да напишем функция, която взима `props` като вход и връща това, което трябва да се визуализира. Функционалните компоненти са по-приятни за писане от класовете и много компоненти могат да бъдат имплементирани по този начин.

Заменете класа Square с тази функция:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Заменихме `this.props` с `props` на двете места.

**[Вижте целия код тук](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Забележка
>
>Когато променихме Square към функция компонент, променихме и `onClick={() => this.props.onClick ()}` на по-кратък `onClick={props.onClick}`(обърнете внимание на липсата на скоби) от двете страни). Когато работихме с клас използвахме arrow function за достъп до правилната стойност на `this`, но във функция компонент не е нужно да се притесняваме за това.

### Размяна на ходове {#taking-turns}

Сега трябва да поправим очевиден дефект в нашата игра: не може да маркираме "О" на дъската.

По подразбиране ще поставим първия ход като "X". Можем да зададем това, като променим първоначалното състояние в конструктора на нашия Board class:

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

Всеки път, когато играчът прави ходове, променливата `xIsNext` (boolean) ще обръща стойността си, за да се определи кой играч е следващият и ще бъде запазена във вътрешното състоянието на играта. Ще променим функцията `handleClick` на Board, за да може да обръщаме стойността на `xIsNext`:

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

С тази промяна "X" и "O" могат да се редуват. Пробвайте! Нека да променим и `status` текста в `render` на Board, така че да показва кой играч е наред:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

След като направим тези промени Board компонента трябва да изглежда така:

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

**[Виж целия код тук](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Определяне на победителя {#declaring-a-winner}

Сега, когато покажем кой от играчите е наред, трябва да покажем и кога играта е спечелена и няма повече ходове за правене. Можем да определим победителя, като добавим тази помощна функция в края на файла:

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

С даден масив от 9 квадрата тази функция проверява за победител и връща `'X'`, `'O'`, или `null` според случая.

Ще извикаме `calculateWinner(squares)` в `render` функцията на Board, за да проверим дали играчът е спечелил. Ако даден играч спечели, можем да покажем текст като "Winnner: X" или "Winnner: О". Ще заменим дефиницията на `status` с този код:

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

Сега можем да променим функцията `handleClick` на Board, за да върнем резултат по-рано, като пренебрегнем кликването, ако някой е спечелил играта или ако Square е вече кликнат:

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

**[Виж кода до този момент](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Честито! Сега имате работеща игра tic-tac-toe. И току-що научихте основите на React. Така че в момента най-вероятно *вие* сте истинският победител.

## Добавене на Time travel {#adding-time-travel}

Като упражнение за финал, нека направим възможно да се върнем назад към предишните ходове в играта.

### Съхраняване на историята за направените ходове {#storing-a-history-of-moves}

Ако мутираме масива `squares`, имплементирането на Time travel би било много трудно.

Въпреки това използвахме `slice()`, за да създадем ново копие на масив `squares` след всяко движение и [да го третираме като immutable](why-immutability-is-importants). Това ще ни позволи да съхраняваме всяка минала версия на масива `squares` и да се придвижваме между вече направени ходове.

Ще съхраняваме изминалите стойности на `squares` в друг масив, наречен `history`. Масивът `history` представлява всички състояния на дъската, от първия до последния ход, и има следния формат:

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

Сега трябва да решим кой компонент трябва да _пази_ `history` състоянието.

### Изнасяне на състоянието на по-горно ниво, отново {#lifting-state-up-again}

Желаем компонентът на играта от най-високо ниво да показва списък с минали ходове. Той ще има нужда от достъп до `history`, за да направи това, така че ще дефинираме `history` в компонента Game.

Този подход ни позволява да премахнем `squares` от неговия дъщерен компонент Board. Точно както [изнесохме състоянието на по-горно ниво](#lifting-state-up) от Square компонентa в компонента Board, сега го изнасяме от Board в компонента Game. Това дава на Game компонента пълен контрол над данните на Board и му позволява да инструктира Board да визуализира предишни ходове от `history` масива.

Първо, ще дефинираме първоначалното състояние за Game компонента в неговия конструктор:

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

След това ще променим компонента Board, така че да получава `squares` и `onClick` props от компонента Game. Тъй като вече имаме една единствена функция прихващаща кликванията в Board, ще трябва да изпратим местоположението на всеки Square в `onClick`, за да посочим кой квадрат е кликнат. Ето необходимите стъпки за трансформиране на компонента Board:

* Изтрийте конструктора в Board.
* Заменете `this.state.squares[i]` с `this.props.squares[i]` в `renderSquare` на Board.
* Заменете `this.handleClick(i)` с `this.props.onClick(i)` в `renderSquare` на Board.

Board компонентът сега изглежда така:

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

Ще актуализираме функцията `render` на Game компонентa, да използва последния елемент от `history` масива, за да определим и покажем състоянието на играта:

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

Тъй като Game компонентът сега предава статуса на играта, можем да премахнем съответния код от метода `render` на Board. След рефакториране, функцията `render` на Board изглежда така:

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

И накрая, трябва да преместим метода `handleClick` от Board към Game. Също така трябва да променим `handleClick`, защото състоянието на Game е структурирано по различен начин. В рамките на `handleClick` метода, ние добавяме нови записи към `history`.

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

>Забележка
>
>За разлика от метода `push()`, който е по-популярен, методът `concat()` не мутира оригиналния масив, затова предпочитаме него.

В този момент компонентът Board се нуждае само от методите `renderSquare` и `render`. Състоянието на играта и методът `handleClick` трябва да бъдат в компонента Game.

**[Вижте целия код до този момент](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Показване на миналите ходове {#showing-the-past-moves}

Тъй като записваме историята на играта, сега можем да я покажем на играча като списък от минали ходове.

По-рано научихме, че React елементите са first-class JavaScript обекти; можем да ги използваме в нашите приложения като променливи. За да визуализираме няколко елемента в React, можем да използваме масив от елементи на React.

В JavaScript масивите имат [метод `map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), който обикновено се използва за трансформиране на един вид към други вид данни, например:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Използвайки метода `map`, можем да трансформираме историята от ходовете до React елементи, представляващи бутоните на екрана, и да покажем този списък, за да може да се върнем към минали ходове.

Нека да използваме `map` върху `history` масива в метода `render` на Game компонента:

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

**[Виж целия код до този момент](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

За всяки ход в историята на играта, ние създаваме елемент от списък `<li>`, който съдържа бутон `<button>`. Бутонът има `onClick` функция, която извиква метод, наречен `this.jumpTo()`. Все още не сме го имплементирали. За сега трябва да видим списък с ходовете, които са настъпили в играта, и съобщение в конзолата на devtools, което казва:

> Warning:
> Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Нека да обсъдим какво означава това съобщение.

### Задаване на key {#picking-a-key}

Когато визуализираме списък, React съхранява някаква информация за всеки визуализиран елемент от списъка. Когато актуализираме списъкa, React трябва да определи какво се е променило. Бихме могли да добавим, премахнем, пренаредим или актуализираме елементите на списъка.

Представете си преход от

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

към

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

В допълнение към актуализирания брой задачи, когато човек чете най-вероятно ще каже, че сме заменили задачите на Алекса и Бен и включили Клаудия между Алекса и Бен. Въпреки това, React е компютърна програма и не знае какво точно сме имали в предвид. Тъй като React не може да знае нашите намерения, трябва да посочим prop *key* за всеки елемент от списъка, за да го разграничим от неговите братя и сестри. Една от възможностите е да се използват текст "alexa", "ben", "claudia". Ако показвахме елементи от база данни, уникалните ID-та на Алекса, Бен и Клаудия можеха да се използват като ключове.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

Когато списъкът се пререндерира, React взема ключа на всеки елемент от списъка и търси елементите от предишния списък със същия ключ. Ако текущият списък има ключ, който не съществува преди, React създава компонент. Ако в текущия списък липсва ключ, който съществува в предишния списък, React унищожава предишния компонент. Ако двата ключа съвпадат, съответният компонент се премества. Ключовете (keys) показват на React идентичността на всеки компонент, което позволява на React да поддържа правилно състоянието между повторното рендериране. Ако ключът на компонента се промени, компонентът ще бъде унищожен и отново създаден с ново състояние.

`key` е специална и запазена дума в React (заедно с `ref`, за по-напреднали). Когато елементът е създаден, React извлича стойността на prop-a `key` и съхранява ключа директно върху върнатия елемент. Въпреки че `key` може да изглежда, че принадлежи на `props`, `key` не може да бъде използван `this.props.key`. React автоматично използва `key`, за да реши кои компоненти да се актуализират. Компонентът не може да изследва неговия `ключ`.

**Силно се препоръчва да присвоите подходящи ключове всеки път, когато създавате динамични списъци.** Ако нямате подходящ ключ, може би трябва да обмислите структурата на вашите данните.

Ако не е зададен никакъв ключ, React ще покаже съобщение и ще използва индекса на масива като ключ по подразбиране. Използването на индекса на масива като ключ е проблематично, когато се опитвате да пренаредите елементите на списъка или да вмъкнете/премахнете елементи от списъка. Изрично задаването на `key={i}` заглушава предупреждението, но има същите проблеми като индексите на масивите и не се препоръчва в повечето случаи.

Ключовете не трябва да бъдат глобално уникални; те трябва само да бъдат уникални между компонентите и техните братя и сестри.

### Имплементиране на Time travel {#implementing-time-travel}

В историята на играта Tic-Tac-Toe, всеки минал ход има уникален идентификатор, свързан с него: това е поредният номер на хода. Ходовете никога не се пренареждат, изтриват или вмъкват, така че е безопасно да използвате индекса за преместване като ключ.

В метода `render` на компонента Game можем да добавим ключа като `<li key={move}>` и съобщениете в конзолата за ключовете трябва да изчезне:

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

**[Вижте целия код до този момент](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Кликването върху някой от бутоните от списъка предизвиква грешка, защото методът `jumpTo` не е дефиниран. Преди да напишем `jumpTo`, ще добавим `stepNumber` в състоянието на компонента Game, за да посочим коя стъпка се използва в момента.

Първо, добавете `stepNumber: 0` към първоначалното състояние в `constructor` функцията на Game:

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

След това ще дефинираме метода `jumpTo`, за да актуализираме `stepNumber`. Също така променяме `xIsNext` към `true`, ако номерът, към който променяме `stepNumber` е четен:

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

Сега ще направим няколко промени в `handleClick` метода на Game, който се извиква, когато кликнете върху квадрат.

Състоянието `stepNumber`, което добавихме, отразява хода, показван на потребителя. След като направим нов ход, трябва да актуализираме `stepNumber` като добавим `stepNumber: history.length` като част от аргумента към `this.setState`. Това гарантира, че няма да показваме същия ход след създаването на нов.

Ще заменим и четенето `this.state.history` с `this.state.history.slice(0, this.state.stepNumber + 1)`. Това гарантира, че ако "се върнем назад във времето" и след това направим нов ход от тази точка, ще изхвърлим цялата "бъдеща" история, която сега ще стане грешна.

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

И накрая, ще модифицираме метода `render` на компонента Game, oт винаги показвайки последния ход към визуализирането на избрания в момента ход според `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

Ако щракнете върху някоя стъпка в историята на играта, дъската на tic-tac-toe трябва незабавно да се актуализира, за да покаже как изглежда тази стъпка.

**[Вижте кода до този момент](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Финални думи {#wrapping-up}

Честито! Създадохте игра, която:

* Ви позволява да играете tic-tac-toe,
* Показва кога играчът е спечелил играта,
* Съхранява историята на играта в хода на играта,
* Позволява на играчите да преглеждат историята на играта и да виждат предишни версии на дъската.

Добра работа! Надяваме се, че придобихте знание за това как работи React.

Вижте крайния резултат тук: **[Краен резултат](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Ако имате допълнително време или искате да практикувате новите си React умения, ето някои идеи за подобрения, които бихте могли да направите към играта. Изброени са по реда на нарастваща трудност:

1. Посочете местоположението на всeки ход във формат (колона, ред) в списъка с историята на преместване.
2. Удебелявайте текущо избрания елемент в списъка за преместване.
3. Пренапишете Board компонента, за да използва две обхождания и да генерира квадратите, вместо да ги описва всичките един по един.
4. Добавете превключващ бутон, който ви позволява да подредите ходовете във възходящ или низходящ ред.
5. Когато някой спечели, маркирайте трите квадратчета, които са довели до победата.
6. Когато никой не спечели, покажете съобщение за равен резултата.

По време на този урок ние разгледахме концепциите в React, включващи елементи, компоненти, props и състояние (state). За по-подробно обяснение на всяка от тези теми разгледайте [останалата част от документацията](/docs/hello-world.html). За да научите повече за дефинирането на компоненти, разгледайте [`React.Component` API](/docs/react-component.html).
