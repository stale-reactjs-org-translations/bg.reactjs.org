---
id: handling-events
title: Обработка на събития
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

<<<<<<< HEAD
Обработката на събития с React елементи е много подобна на обработката на събития на DOM елементи. Има някои синтактични разлики:
=======
Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

* Събитията в React се именуват в camelCase стил, а не с малки букви.
* При JSX подавате функция (а не низ), която се справя с обработката на събитията.

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

<<<<<<< HEAD
Друга разлика е, че като резултат от функцията не можете да върнете `false`, за да предотвратите поведението по подразбиране в React. Трябва изрично да извикате `preventDefault`. Например, с обикновен HTML, за да предотвратите поведението по подразбиране на връзка, която води към нова страница, можете да напишете:

```html
<a href="#" onclick="console.log('Кликнахте връзката.'); return false">
  Кликни ме
</a>
=======
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
```

В React това може да бъде:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    console.log ('Кликнахте връзката.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Кликни ме
    </a>
=======
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
  );
}
```

<<<<<<< HEAD
Тук `е` е синтетично събитие. React определя тези синтетични събития според [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), така че не е нужно да се притеснявате за съвместимостта с различни браузъри. Вижте документацията [`SyntheticEvent`](/docs/events.html), за да научите повече.
=======
Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don't need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the [`SyntheticEvent`](/docs/events.html) reference guide to learn more.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Когато използвате React, обикновено не е нужно да се извиква `addEventListener`, за да добавите слушатели(listeners) към DOM елемент след неговото създаване. Вместо това, просто осигурете слушател, когато елементът е първоначално визуализиран.

Когато дефинирате компонент чрез [ES6 клас](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), един често срещан модел е манипулаторът на събития да бъде дефиниран като метод на класа. Например, този `Toggle` компонент създава бутон, който позволява на потребителя да превключва между "ON" и "OFF" състояния:

```js{6,7,10-14,18}
class Toggle extends React.Component {
<<<<<<< HEAD
  constructor(props) {
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
      </button>
    );
  }
=======
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[** Опитайте в CodePen **](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Трябва да бъдете внимателни за значението на `this` в JSX callbacks. В JavaScript, методите на класа не са [обвързани](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) по подразбиране. Ако забравите да свържете(bind) метода `this.handleClick` и го подадете на `onClick`, `this` ще бъде `undefined`, когато методът е извикан.

Това не е специфично поведение в React; то е част от [как работят функциите в JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Като цяло, ако реферираме метод без `()` след него, като `onClick={this.handleClick}`, трябва да свържете този метод чрез `bind`.

Ако извикването на `bind` ви дразни, има два начина да се справите с това. Ако използвате експерименталния [синтаксис на публичните полета на класа](https://babeljs.io/docs/plugins/transform-class-properties/), можете да използвате полетата на класа, за да свържете правилно callback функциите:

```js{2-6}
class LoggingButton extends React.Component {
  // Този синтаксис осигурява `this` да е обвързан в handleClick.
  // Предупреждение: това е *експериментален* синтаксис.
  handleClick = () => {
    console.log('this е:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Кликни ме
      </button>
    );
  }
}
```

Този синтаксис е активиран по подразбиране в [Create React App](https://github.com/facebookincubator/create-react-app).

Ако не използвате синтаксис на полета на класа, можете да използвате [arrow функция](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) в callback:

```js{7-9}
class LoggingButton extends React.Component {
<<<<<<< HEAD
  handleClick() {
    console.log('this е:', this);
  }

  render() {
    // Този синтаксис осигурява `this` да е обвързан в handleClick
    return(
      <button onClick={(e) => this.handleClick(e)}>
        Кликни ме
      </button>
    );
  }
=======
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
}
```

Проблемът с този синтаксис е, че всеки път, когато се рендерира `LoggingButton`, се създава различна callback функция. В повечето случаи това е добре. Обаче, ако този callback се предаде като prop на по-долно ниво компоненти, тези компоненти биха могли да направят допълнително рендиране. Обикновено препоръчваме свързване в конструктора или използване на синтаксиса на полета на класа, за да се избегне този проблем.

## Подаване на аргументи към обработващи събития функции {#passing-arguments-to-event-handlers}

Често, искате да подадете допълнителен параметър на функция обработваща събития, която е вътре в цикъл. Например, ако `id` е идентификатор на ред, всеки един от следните примери ще работи:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Изтриване на ред</button>
<button onClick={this.deleteRow.bind(this, id)}>Изтриване на ред</button>
```

Горните два реда са еквивалентни и използват съответно [arrow функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) и [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

И в двата случая, аргументът `е`, представящ React събитието, ще бъде предаден като втори аргумент след `id`. С arrow функция трябва изрично да го подадем, но с `bind` всички допълнителни аргументи се препращат автоматично.
