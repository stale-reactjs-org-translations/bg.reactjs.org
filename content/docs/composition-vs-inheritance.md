---
id: composition-vs-inheritance
title: Композиция срещу наследяване
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React има силен модел за композиции и препоръчваме да се използва композиция вместо наследяване, за да се преизползва код между компонентите.

В този раздел ще разгледаме няколко проблема, при които разработчиците, които са нови в React, често избират наследяване. Ще покажем и как можем да ги разрешим с композиция.

## Ограничения {#containment}

Някои компоненти не познават децата си предварително. Това е особено често срещано за компоненти като "Sidebar" или "Dialog", които представляват "кутии" с общо предназначение.

Препоръчваме тези компоненти да използват специалния `children` prop, за да прехвърлят елементите на децата си директно в техния резултат:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Това позволява на други компоненти да прехвърлят произволни деца към тях чрез влагане с JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[Опитай в CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Всичко в JSX `<FancyBorder>` тагa преминава в компонента `FancyBorder` като `children` prop. Тъй като `FancyBorder` рендерира `{props.children}` в `<div>`, подадените елементи се появяват в крайния резултат.

Макар че това е по-рядко, понякога може да ви трябват няколко "дупки" в даден компонент. В такива случаи можете да измислите своя собствена конвенция, вместо да използвате `children`:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React елементи като `<Contacts />` и `<Chat />` са просто обекти, така че можете да ги подадете като props като всички други данни. Този подход може да ви напомни за "slots" в други библиотеки, но няма ограничения за това, което може да прехвърлите като props в React.

## Специални случаи {#specialization}

Понякога ние мислим за компонентите като за "специални случаи" на други компоненти. Например, можем да кажем, че `WelcomeDialog` е специален случай на `Dialog`.

В React, това се постига и чрез композиция, където по-специфичен компонент рендерира "по-общ" и го конфигурира с props:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Композиция работи еднакво добре и за компоненти дефинирани като класове:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## А какво ще кажем за наследяването? {#so-what-about-inheritance}

Във Facebook използваме React в хиляди компоненти и не сме намерили случаи на употреба, в които да препоръчаме създаването на йерархии за наследяване на компоненти.

Props и композиция ви дават цялата гъвкавост, от която се нуждаете, за да персонализирате вида и поведението на компонента по ясен и безопасен начин. Не забравяйте, че компонентите могат да приемат произволни props, включително примитивни стойности, React елементи или функции.

Ако искате да използвате повторно функционалността извън потребителския интерфейс между компонентите, предлагаме да го извлечете в отделен JavaScript модул. Компонентите могат да го import-нат и да използват тази функция, обект или клас, без да го разширяват.
