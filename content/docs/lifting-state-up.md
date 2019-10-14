---
id: lifting-state-up
title: Изнасяне на state-а
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Често множество от компоненти трябва да отразяват едни и същи тип данни. Препоръчваме тези данни да бъдат "изнесени" в state-а на близкият им общ родителски компонент. Нека видим пример за това.

В тази секция, ще създадем температурен калкулатор, който ще пресмята дали водата ще кипне при дадена температура.

Започваме с компонент който ще наречем `BoilingVerdict`. Той ще приема температурата в prop-а `celsius` и ще рендерира дали температурата е достатъчна висока, за да може водата да заври:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

В следващата стъпка, ще създадем компонента `Calculator`. Той ще рендерира `<input>`, в който ще можем да въвеждаме температурата и ще съхранява въведената стойност в  `this.state.temperature`.

Също така ще рендерира и компонента `BoilingVerdict` с въведената стойност.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Добавяне на втори Input {#adding-a-second-input}

Имаме ново изискване, към input-а за температурата по Целзий, ще добавим и такъв за Фаренхайт и те ще трябва да бъдат синхронизирани.

Може да започнем като извлечем нов компонент `TemperatureInput` от `Calculator`. Добавяме нов prop `scale` към него, който ще приема `"c"` или `"f"`:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Сега вече `Calculator` може да рендерира два отделни температурни input-а:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Вече имаме два отделни input-а, но когато въвеждаме температурата в един, другия няма да се промени. Това е в противоречие с нашето изискване, да държим двата input-а синхронизирани.

Също така не можем да рендерираме `BoilingVerdict` директно от `Calculator`. `Calculator` няма контрол над въведената температура, защото тя се съхранява в `TemperatureInput`.

## Създаване на преобразуващи функции {#writing-conversion-functions}

Първо ще създадем две функции, които ще преобразуват температурата от Целзий към Фаренхайт и обратното:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Тези две функции преобразуват само числа. Ще напишем друга, която ще приема два аргумента, низа `temperature` и преобразуващата функция, и като резултат функцията ще връща низ. Ще използваме тази функция, за да пресмятаме стойността на единият input, спрямо другият.

Също така ще връща празен низ при невалидна въведена `temperature`, и ще закръгля резултата до третия знак след запетайката:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Например, `tryConvert('abc', toCelsius)` ще върне празен низ, а `tryConvert('10.22', toFahrenheit)` ще върне като резултат `'50.396'`.

## Изнасяне на State-а {#lifting-state-up}

В момента и двата компонента `TemperatureInput`, независимо един от друг съхраняват стойностите си в собствения си локален state:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

Въпреки това, ние искаме двата да бъдат синхронизирани един с друг. Когато променяме стойността на input-а показващ температурата по Целций, input-а показващ температурата по Фаренхайт, трябва да показва преобразуваната температура, и обратното.

В React, споделянето на общ state, може да бъде постигнато като преместим state-а в най-близкият общ родителски компонент. Това наричаме "Изнасяне на State-а". Ще премахнем локалния state от `TemperatureInput` и ще го преместим в `Calculator`.

Ако `Calculator` притежава общият state, той вече е единствения източник на информация за температурата и за двата `TemperatureInput` компонента. Така `Calculator` може да ги инструктира да имат консистентни стойности един спрямо друг. Тъй като props и на двата `TemperatureInput` компонента са контролирани от един и същи родителски компонент `Calculator`, двата input-а винаги ще бъдат синхронизирани един с друг.

Нека видим как това би сработило стъпка по стъпка.

Първо ще заменим `this.state.temperature` с `this.props.temperature` в компонента `TemperatureInput`. Нека за момент да предположим че `this.props.temperature` вече съществува, въпреки че трябва да бъде подаден от `Calculator`:

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Вече знаем че [props са read-only](/docs/components-and-props.html#props-are-read-only). Докато `temperature` беше в локалния state, `TemperatureInput` можеше просто да извика `this.setState()` за да промени `temperature`. Но сега вече `temperature` се подава като prop от родителския компонент и `TemperatureInput` няма контрол над него.

В React, това се постигне като направим компонента да бъде "контролиран". Също както `<input>` приема и `value` и `onChange` prop, така и `TemperatureInput` приема `temperature` и `onTemperatureChange` props от родителския си компонент `Calculator`.

И от сега нататък, когато `TemperatureInput` трябва да промени температурата, ще извика `this.props.onTemperatureChange`:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Забележка:
>
>В имената на props `temperature` и `onTemperatureChange` не влагаме никакво специално значение. Можеше да ги кръстим по всякакъв друг начин, като например `value` и `onChange` което е често срещана практика.

`onTemperatureChange` и `temperature` ще бъдат подадени заедно от родителският компонент `Calculator`. Той ще се погрижи промяната да бъде отразена като промени локалния си state, по този начин ще рендериран наново и двата input-а с новите им стойностти. В една от следващите стъпки ще разгледаме новата имплентация на `Calculator`.

Преди да променим `Calculator`, нека накратко да резюмираме промените по компонента `TemperatureInput`. Премахнахме локалният му state, и вместо `this.state.temperature` използва `this.props.temperature`. Също така вместо да извиква `this.setState()`, когато трябва да бъде направена промяна, ще извика `this.props.onTemperatureChange()`, който се подава от `Calculator`:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Сега нека да преправим компонента `Calculator`.

Ще съхраняваме `temperature` и `scale` на input-ите в локалния state на `Calculator`. Това е state-а който "изнесохме" от двата `TemperatureInput`, и това ще бъде единствения източник на информация и за двата. Това е мининума информация, от която се нуждаем за да ги рендерираме.

Например, ако въведем 37 в Целзий input-а, state-а на `Calculator` ще бъде:

```js
{
  temperature: '37',
  scale: 'c'
}
```

И ако променим Фаренхайт input-а да бъде 212, state-а на `Calculator` ще бъде:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Можем да съхраняваме стойността и на двата input-а, но това всъщност не е нужно. Достатъчно е да запазим само стойността на последно промененият input, и вида на температурната скала. И така можем да пресметнем стойността на другият input вземайки сегашните стойностти на `temperature` и `scale`.

И така двата input-а вече са синхронизирани, защото стойностите им се пресмятат от един и същи state:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Сега вече няма значение кой от двата input-а ще променим, `this.state.temperature` и `this.state.scale` в `Calculator` ще бъдат актуализирани. Единия от input-ите получава стойността такава каквато е, така че входните данни на потребителя ще се запазят, и на база него другият input винаги ще се прекалкулира.

Нека резюмираме какво се случва, когато някой от input-ите бъде променен:

* React извиква подадената на `onChange` фукцията. В нашият случай това е метода `handleChange` в компонента `TemperatureInput`.
* Метода `handleChange` в компонента `TemperatureInput` извиква `this.props.onTemperatureChange()` с новоподадената стойност. Неговите props, включително и `onTemperatureChange`, се подават от родителският му компонент `Calculator`.
* При рендерирането си компонента `Calculator`, подава метода `handleCelsiusChange` на prop-a `onTemperatureChange` в Целзий `TemperatureInput` компонента, също така подава и метода `handleFahrenheitChange` на prop-а `onTemperatureChange` във Фаренхайт `TemperatureInput` компонента. Така че всеки от двата метода на `Calculator`, ще бъде извикан в зависимост от това кой input бъде променен.
* Вътре в тези методи, компонента `Calculator` изисква от React да бъде рендериран наново, като извиква `this.setState()` с нововъведените стойностти за температура и температурна скала.
* React извиква render метода на `Calculator`, така разбира как трябва да изглежда потребителският интерфейс. Стойностите на двата input-а се пресмятат на база на наличните температурата и температурната скала. Тук се случва и преобразуването на температурата от едната скала в другата.
* React извиква `render` метода на всеки от `TemperatureInput` компонентите с подадените от `Calculator` props. И така разбира как трябва да изглежда потребителският интерфейс.
* React извиква `render` метода на компонента `BoilingVerdict`, подавайки температурата по Целзий в props.
* React актуализира DOM дървото в съответствие с въведениете стойностите. Последно промененият input ще получи стойността си и другият input ще получи новата си стойност след преобразуването на температура.

След всяка промяна преминава през тези стъпки, така че input-ите ще са винаги синхронизирани.

## Заключение {#lessons-learned}

Във всяка React аппликация, за определен тип данни които могат да бъдат променяни, трябва да има само един "източник на информация". Обикновенно, state се добава първо в компонентите, които имат нужда от него за да се рендерират. После ако и други компоненти се нуждаят от същия state, той може да бъде "изнесен" в най-близкият общ родителски компонент. Вместо да се опитваме да синхронизираме state-а на различни компоненти, би трябвало да разчитаме на [потокът на данни от родител към деца](/docs/state-and-lifecycle.html#the-data-flows-down).

За да бъде "изнесен" даден state често това изисква повече код, спрямо подхода с друпосочен поток на данните, но като ползи получаваме, по-лесно изолиране и намиране на грешки в кода. Тъй като всеки state "живее" в конкретент компонент и само този компонент може да го променя, по този начин местата в кода в които може да има грешки свързани със съответния state значително намаляват. Също така може да бъде имплементирана всякаква логика, която да модифицира входните данни от потребителя.

Ако някакви данни могат да бъдат извлечени от props вместо от state, най-вероятно не би трябвало да са в state. Например, вместо да съхраняваме `celsiusValue` и `fahrenheitValue`, ние съхраняваме само последните промени на `temperature` и `scale`. Стойността за другата температурна скала винаги може да бъде изчислена от `render()` метода. Това ни позволява да приложим закръгляване на другото поле без да губим точността на входните данни от потребителя.

<<<<<<< HEAD
Когато видите грешка в потребителския интерфейс, можете да използвате [React Developer Tools](https://github.com/facebook/react-devtools), за да анализирате props и да търсите нагоре в дървото от компоненти, докато не намерите компонента отговорен за промяната на state-а. Това ще ви позволи да проследявате грешките в кода до техния първоизточник:
=======
When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:
>>>>>>> 81124465ac68335b2e3fdf21952a51265de6877f

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">

