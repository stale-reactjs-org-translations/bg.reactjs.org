---
id: state-and-lifecycle
title: State и Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Тази страница представя концепцията за state и lifecycle в React компонентите. Можете да намерите [подробна информация за API(програмния интерфейс на приложението) на компонент тук](/docs/react-component.html).

Вземайки в предвид пример на часовник [в един от предишните раздели](/docs/rendering-elements.html#updating-the-rendered-element). В [Рендериране на елементи](/docs/rendering-elements.html#rendering-an-element-into-the-dom), до сега научихме само един начин да актуализираме потребителския интерфейс. Ние извикваме `ReactDOM.render()` за да актуализираме резултата от рендерирането:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

В този раздел, ще научим как да направим `Clock` компонента преизползваем и капсулиран. Ще създаде собствен таймер и ще го актуализира на всяка секунда.

Можем да започнем с капсулирането на това как часовника е визуализиран:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Въпреки това, в примера липсва едно съществено изискване което е че: `Clock` създава таймер и актуализира потребителският интерфейс всяка секунда, но това трябва да бъде имплементирано в самия `Clock`.

В идеалния случай ние бихме искали да напишем това само веднъж и `Clock` да се актуализира сам:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

За да имплементираме това, ще трябва да добавим "state" към компонента `Clock`.

`State` e подобен на `props`, но е частен за компонента и се контролира напълно от самия него.

Както споменахме в [предишния раздел](/docs/components-and-props.html#functional-and-class-components) компонентите които са дефинирани като класове имат допълнителни свойства. Локалния state е пример за това: свойство което имат само класовете.

## Преобразуване от Функция към Клас {#converting-a-function-to-a-class}

Можете да преобразувате функционален компонент като `Clock` на клас в пет стъпки:

1. Създаване на [ES6 клас](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), със същото име, което наследява `React.Component`.

2. Добавяне на празен метод наречен `render()`.

3. Преместване на тялото на функцията вътре в `render()` метода.

4. Заменяне на `props` с `this.props` вътре в тялото на `render()` метода.

5. Изтриване на останалата празна част от функцията.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` сега е дефиниран като клас вместо като функция.

Методът `render` ще бъде извикван всеки път когато се актуализара, но докато `<Clock />` се рендерира към същото DOM елемент, само една единствена инстанция на класа `Clock` ще бъде използвана. Това ни позволява на използване допълнителни свойства като локален state и lifecycle методи.

## Добавяне на локален State към Клас {#adding-local-state-to-a-class}

Ще преместим `date` от props в state с три стъпки:

1) Заменяме `this.props.date` с `this.state.date` в `render()` метода:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Добавяме в класа [constructor метод](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor), който ще присвои `this.state` за първи път:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Забележете как подаваме `props` към базовия constructor метод:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Компонентите които са дефинирани като класове трябва винаги да извикват базовия constructor с `props`.

3) Изтриваме `date` prop от `<Clock />` елемент:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

По-късно ние ще добавим кода на таймера обратно към самия компонент.

Резултата от промените би изглеждал по този начин:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

В следващата стъпка, ще направим, така че `Clock` да настройва сам свой собствен таймер и да го актуализа сам на всяка секунда.

## Добавяне на Lifecycle методи към Клас {#adding-lifecycle-methods-to-a-class}

В уеб приложения, които съдържат много компоненти е много важно да се освобождават резурсите заети от компонентите, когато те бъдат премахнати.

Искаме [да настроиваме таймер](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) всеки път, когато `Clock` е рендериран в DOM дървото за първи път. Това се нарича "mounting" (закачане) в React.

Също така искаме да [зачистваме таймера](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) всеки път, когато от DOM дървото `Clock` бъде премахнат. Това се нарича "unmounting" (разкачане) в React.

Можем да декларираме специални методи в компонент клас, за да изпълним определен код, когато компонента се закача или разкача:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Тези методи се наричат "lifecycle методи".

Метода `componentDidMount()` се изпълнява след като компонента се рендърне в DOM дървото. Това е добро място, на което да настройваме таймера:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Забележете че запазваме ID-то на таймера директно в `this`.

Докато `this.props` се дефинират от самия React, `this.state` има специална употреба, имаме възможността да добавяме допълнителни полета към класа ръчно ако имаме нужда да съхраняваме неща, които не участват в потока от данни (например ID-то на таймера).

Ще зачистим таймера в lifecycle метода `componentWillUnmount()`:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

И накрая ще имплементираме метода `tick()`, който компонента `Clock` ще изпълнява всяка секунда.

Той ще използва `this.setState()`, за да актуализира локалния state на компонента:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Сега вече часовникът ще се актуализира на всяка секунда.

Нека на кратко да резюмираме какво се случва и реда, в който методите се изпълняват:

1) Когато `<Clock />` се подаде на `ReactDOM.render()`, React извиква конструктор метода на компонента `Clock`. Тъй като `Clock` трябва да визуализира текущото време, той инициализира `this.state` с обект съдържащ текущото време. В по-късен етап ще актуализираме `this.state`.

2) React извиква метода `render()` на компонента `Clock`. По този начин React разбира, какво трябва да бъде визуализирано на екрана. След това React актуализира DOM дървото, така че да съответства на резултата от рендерирането на `Clock`.

3) Когато резултата на `Clock` бъде добавен към DOM дървото, React извиква lifecycle метода `componentDidMount()`. Вътре в него, компонента `Clock` казва на browser-а да настройва таймера да извиква метода `tick()` на всяка секунда.

4) Всяка секунда browser-а извиква метода `tick()`. Вътре в него, компонента `Clock` насрочва промяна в потребителският интерфейс като извиква метода `setState()` с обект съдържащ текущото време. Когато `setState()` бъде извикан, React разбира че state-а е променен, и извиква `render()` метода отново за да разбере както трябва да се визуализира на екрана. Този път, `this.state.date` намиращ се в `render()` метода ще бъде различен, и така резултата от render метода ще съдържа актуализираното време. Съответно React ще актуализира DOM дървото.

5) Ако компонента `Clock` бъде изтрит от DOM дървото, React ще извика lifecycle метода `componentWillUnmount()` и така таймерът ще спре.

## Как да използваме правилно State {#using-state-correctly}

Има три неща които трябва да знаете относно `setState()`.

### State-а не трябва да бъде променян директно {#do-not-modify-state-directly}

Следния пример няма да рендерира компонента наново:

```js
// Wrong
this.state.comment = 'Hello';
```

Вместо това използвайте `setState()`:

```js
// Correct
this.setState({comment: 'Hello'});
```

Единственото място в което `this.state` може да бъде присвоен е в конструктора.

### Актуализирането на State-а може да бъде асинхронно {#state-updates-may-be-asynchronous}

React може да групира множество извиквания на `setState()` в една единствена актуализация, за да подобри производителността.

Тъй като `this.props` и `this.state` може да бъдат актуализирани асинхронно, не трябва да разчитате на текущите им стойностти, когато пресмятате бъдещият state.

Например следният примерен код, може да не успее да актуализира таймера коректно:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

За да поправите това, използвайте друга форма на `setState()`, която приема като аргумент функция вместо обект. Тази функция ще получи предишният state-а като първи аргумент и props като втори аргумент в момента в който е имало актуализация.

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

В горния пример използваме [arrow функция](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions), но също така може да бъде използвана и обикновенна такава:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Промените на State-а се сливат {#state-updates-are-merged}

Когато извикате `setState()`, React слива обекта, който подавате в настоящия state.

Например, state-а може да съдържа няколко независими променливи:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Така те могат да бъдат актуализирани по отделно с отделни извиквания на `setState()`:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Сливането е "повърхностно", така че `this.setState({comments})` не променя `this.state.posts`, но пък замества напълно `this.state.comments`.

## Потокът на данни е надолу към компонентите деца {#the-data-flows-down}

Нито родителските, нито компонентите деца могат да знаят дали даден компонент е "stateful" или "stateless" и също така не знаят дали той е дефиниран като функция или клас.

Поради тази причина често state-а е наричан локален или капсулиран. Той не е достъпен от никой друг компонент освен този, в който е дефиниран и променян.

Компонентът може да подаде своят state като prop към компонентите, които са му деца.

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

Това също важи за дефинирани от потребителя компоненти:

```js
<FormattedDate date={this.state.date} />
```

Компонентът `FormattedDate` ще получи `date` в своите props и няма да знае, дали е дошъл от state-а на `Clock`, от props на `Clock` или е подаден ръчно.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Този поток от данни често е наричан "отгоре-надолу" или "еднопосочен". Всеки state винаги се притежава от специфичен компонент и всякакви данни или потребителски интерфейс получени от state-а може само да афектира компонентите, които са "надолу" в дървото от компоненти.

Представете си дървото от компоненти като водопад от props, като state-а на всеки компонент е допълнителен водоизточник, който се присъединява в даден момент, но също така изтича надолу.

За видим, че всички компоненти са наистина изолирани, можем да създадем `App` компонент, който рендерира три `<Clock>` компонента.

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Всеки `Clock` създава свой таймер и го актуализира независимо от другите.

В React-ските уеб приложения, дали даден компонент е "stateful" или "stateless" се счита за детайл на самата имплементация на компонента и тя може да се променя във времето. Можете да използвате "stateless" компоненти вътре в "stateful" компоненти и обратното.
