---
id: handling-events
title: Обработка на събития
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

Обработката на събития с React елементи е много подобна на обработката на събития на DOM елементи. Има някои синтактични разлики:

* Събитията в React са наименувани в camelCase стил, а не с малки букви.
* При JSX подавате функция (а не низ) която се справя с обработката на събитията.

Например този HTML:

```html
<button onclick="activateLasers()">
  Активирай Лазери
</button>
```

е малко по-различен в React:

```js{1}
<button onClick={activateLasers}>
  Активирай Лазери
</button>
```

Друга разлика е, че не можете да върнете `false`, за да предотвратите поведението по подразбиране в React. Трябва изрично да извикате `preventDefault`. Например, с обикновен HTML, за да предотвратите поведението по подразбиране на връзка която води към нова страница, можете да напишете:

```html
<a href="#" onclick="console.log('Кликнахте връзката.'); return false">
  Кликни ме
</a>
```

В React това може да бъде:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log ('Кликнахте връзката.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Кликни ме
    </a>
  );
}
```

Тук `е` е синтетично събитие. React определя тези синтетични събития според [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), така че не е нужно да се притеснявате за съвместимостта с различни браузъри. Вижте справочника [`SyntheticEvent`](/docs/events.html), за да научите повече.

Когато използвате React, обикновено не е нужно да се извиква `addEventListener`, за да добавите слушатели към DOM елемент след неговото създаване. Вместо това, просто осигурете слушател, когато елементът е първоначално визуализиран.

Когато дефинирате компонент чрез [ES6 клас](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), един често срещан модел е манипулаторът на събития да бъде дефиниран като метод на класа. Например, този `Toggle` компонент създава бутон, който позволява на потребителя да превключва между "ON" и "OFF" състояния:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor (props) {
    super(props);
    this.state = {isToggleOn: true};

    // Това свързване е необходимо, за да може `this` да работи в callback функцията
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </buton>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[** Опитайте в CodePen **](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Трябва да бъдете внимателни за значението на `this` в JSX callbacks. В JavaScript, методите на класа не са [обвързани](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) по подразбиране. Ако забравите да свържете метода `this.handleClick` и го подадете на `onClick`, `this` ще бъде `undefined`, когато методът е извикан.

Това не е специфично поведение на React; той е част от [как функционират функциите в JavaScript] (https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Като цяло, ако се отнасят до метод без `()` след него, като `onClick = {this.handleClick}`, трябва да свържете този метод.

Ако се обадите на "bind", това ви кара да се справите с два начина. Ако използвате експерименталния [синтаксис на публичните полета на класа] (https://babeljs.io/docs/plugins/transform-class-properties/), можете да използвате полетата на класа, за да свързвате правилно обратната връзка:

`` `JS {2-6}
class LoggingButton разширява React.Component {
  // Този синтаксис осигурява `this` е обвързан в handleClick.
  // Предупреждение: това е * експериментален * синтаксис.
  handleClick = () => {
    console.log ("това е:", това);
  }

  рендиране () {
    връщане (
      <button onClick = {this.handleClick}>
        Кликни ме
      </ Бутон>
    );
  }
}
`` `

Този синтаксис е активиран по подразбиране в [Create React App] (https://github.com/facebookincubator/create-react-app).

Ако не използвате синтаксис на полета на класа, можете да използвате функцията [arrow] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) в обратната връзка:

`` `JS {7-9}
class LoggingButton разширява React.Component {
  handleClick () {
    console.log ("това е:", това);
  }

  рендиране () {
    // Този синтаксис осигурява `this` е обвързан в handleClick
    връщане (
      <button onClick = {(e) => this.handleClick (e)}>
        Кликни ме
      </ Бутон>
    );
  }
}
`` `

Проблемът с този синтаксис е, че всеки път, когато се изобразява "LoggingButton", се създава различно обратно извикване. В повечето случаи това е добре. Обаче, ако това обратно извикване се предава като опора за по-ниски компоненти, тези компоненти биха могли да направят допълнително рендеринг. Обикновено препоръчваме свързване в конструктора или използвайки синтаксиса на полетата на класа, за да избегнете този проблем с производителността.

## Прехвърляне на аргументи към обработващи събития {# passing-arguments-to-event-handlers}

Вътре в цикъла е обичайно да искате да предавате допълнителен параметър на манипулатор на събития. Например, ако "id" е идентификатор на ред, едно от следните ще работи:

`` `JS
<button onClick = {(e) => this.deleteRow (id, e)}> Изтриване на ред </button>
<button onClick = {this.deleteRow.bind (this, id)}> Изтриване на ред </button>
`` `

Горните две линии са еквивалентни и използват [функции със стрелки] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) и [`Function.prototype.bind`] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) съответно.

И в двата случая, аргументът "е", представящ събитието Реактивно, ще бъде предаден като втори аргумент след идентификатора. С функция стрелка трябва да я преминем изрично, но с `bind` всички допълнителни аргументи се препращат автоматично.