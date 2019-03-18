---
id: conditional-rendering
title: Условно рендериране
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

В React можете да създадете отделни компоненти, които капсулират необходимото ви поведение. Можете да рендерирате само някои от тях в зависимост от state-а на вашата аппликация.

Условното рендериране в React може да бъде използвано по същия начин, по който се използват условните изрази в JavaScript. Използвайте JavaScript оператори като [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) или [условния оператор](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), за да създадете елементи, които отразяват текущия state и React ще актуализира потребителския интерфейс.

Използвайки следните два компонента:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

Ще създадем `Greeting` компонент, който ще рендерира един от двата компонента в зависимост дали потребителя е идентифициран:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Горният пример ще рендерира различен поздрав в зависимост от стойността на `isLoggedIn` prop-а.

### Съхраняване на елементи в променливи {#element-variables}

Можете да използвате променливи за да съхранявате React елементи. Това би ви помогнало условно да рендерирате само част от компонента, докато другата част на компонента остава непроменена.

Следните два компонент изобразяват Logout и Login бутони:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

В следния пример, ще създадем [stateful компонент](/docs/state-and-lifecycle.html#adding-local-state-to-a-class), който ще наречем `LoginControl`.

Той ще рендерира `<LoginButton />` или `<LogoutButton />`, в зависимост моментния си state. Също така ще рендерира компонента `<Greeting />` от предишния пример:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Използвайки `if` оператора, за да декларираме променлива е добър начин условно да рендерираме компонент, но понякога бихме искали да използваме по-кратък синтаксис за това. Има няколко начина за използване на условни оператори в JSX, които ще покажем в следните примери.

### Логически оператор && {#inline-if-with-logical--operator}

Можете да [добавяме всякакви изрази в JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx), като ги заградите с фигурни скоби. Същото важи и за логическия оператор `&&`. Това може да бъде много удобен начин за условно рендериране на различни компоненти:

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Горният пример работи, защото в JavaScript, резултатът от `true && expression` винаги е `expression`, а резултатът от `false && expression` винаги е `false`.

Следователно ако условието е равно на `true`, елементът който е след `&&` винаги ще се рендерира. А ако е `false`, React ще го игнорира и няма да бъде рендериран.

### If-Else използвайки "Условния Оператор" {#inline-if-else-with-conditional-operator}

Друг начин за условно рендериране на елементи е да използвате "условния оператор" от JavaScript  [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

В следния пример, го използваме за да рендерираме малка част текст.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Също така може да бъде използван и в по-големи изрази, въпреки че кода не е толкова четим:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

Също както в JavaScript, зависи от вас да изберете най-подходящия начин, в зависимост от това какво вие и вашият екип смятате за най-четимо. Не забравяйте, че когато условията станат твърде сложни, може би е добра идея да [разделите компонентът на по-малки компоненти](/docs/components-and-props.html#extracting-components).

### Предотвратяване рендерирането на даден компонент {#preventing-component-from-rendering}

В рядки случаи може да искате даден компонент да бъде скрит дори, когато бъде рендериран от друг компонент. За да постигнете това, компонента трябва да върне `null` вместо да рендерира себе си.

В следния пример, рендерирането на `<WarningBanner />` зависи от стойността на prop-а `warn`. Ако е `false`, тогава компонента няма да бъде рендериран:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Опитайте примера в CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Не зависимо дали `render` ще върне `null`, това не би повлияло по никакъв начин на извикването на lifecycle методите на компонента. Например `componentDidUpdate` все пак ще бъде извикан.
