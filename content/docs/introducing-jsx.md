---
id: introducing-jsx
title: Представяне на JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Разгледайте тази декларация на променлива:

```js
const element = <h1>Здравей, свят!</h1>;
```

Този забавен синтаксис не е нито низ, нито HTML.

Той се нарича JSX и е синтактично разширение на JavaScript. Препоръчваме да го използвате с React, когато описвате как трябва да изглежда потребителският интерфейс. JSX може да ви напомня за шаблонен език, но идва с всички възможности на JavaScript.

JSX произвежда React "елементи". Ще разгледаме рендирането им в DOM в [следващия раздел](/docs/rendering-elements.html). По-долу можете да намерите основите на JSX, необходими за да започнете.

### Защо JSX? {#why-jsx}

React приема факта, че логиката за рендирането е без съмнение в съчетание с друга логика на потребителския интерфейс: как се обработват събитията, как се променя състоянието във времето и как се подготвят данните за показване.

Вместо изкуствено разделяне на *технологии* чрез поставяне на markup и логика в отделни файлове, React [разделя *отговорностите*](https://en.wikipedia.org/wiki/Separation_of_concerns) чрез свободно свързани единици, наречени "компоненти", които съдържат и двете. Ще се върнем към компонентите в [следващата секция](/docs/components-and-props.html), но ако все още не ви е удобно да поставяте markup в JS, [тази презентация](https://www.youtube.com/watch?v=x7cQ3mrcKaY) може да ви убеди в това.

React [не изисква](/docs/react-without-jsx.html) използването на JSX, но повечето хора го намират за полезен като визуална помощ при работа с потребителски интерфейс в JavaScript код. Той също така позволява на React да показва по-полезни предупреждения и съобщения за грешки.

След като уточнихме това, нека да започнем!

### Вграждане на изрази в JSX {#embedding-expressions-in-jsx}

В примера по-долу, ние декларираме променлива, наречена `name`, и след това я използваме в JSX, като я обгърнем във фигурни скоби:

```js{1,2}
const name = 'Иван Атанасов';
const element = <h1>Здравей, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Можете да поставите всeки валиден [JavaScript израз](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) в къдравите скоби в JSX. Например, `2 + 2`, `user.firstName` или `formatName(user)` са валидни JavaScript изрази.

В примера по-долу вграждаме резултата от извикването на JavaScript функцията `formatName (user)` в елемент `<h1>`.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Иван',
  lastName: 'Атанасов'
};

const element = (
  <h1>
    Здравей, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

Разделяме JSX на няколко реда за четливост. Въпреки че не е необходимо, когато правите това, препоръчваме да го заградите в скоби, за да избегнете проблемите с [автоматичното въвеждане на точка и запетая](http://stackoverflow.com/q/2846283).

### JSX също е израз {#jsx-is-an-expression-too}

След компилирането, JSX изразите стават обикновени JavaScript извиквания на функции и връщат JavaScript обекти.

Това означава, че можете да използвате JSX вътре в `if` изрази и `for` цикли, да го присвоите на променливи, да го приемете като аргументи и да го върнете от функции:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Здравей, {formatName(user)}!</h1>;
  }
  return <h1>Здравей, Непознат.</h1>;
}
```

### Указване на атрибути с JSX {#specifying-attributes-with-jsx}

Можете да използвате кавички, за да укажете атрибути чрез низове:

```js
const element = <div tabIndex="0"></div>;
```

Можете също да използвате фигурни скоби, за да вградите JavaScript израз в атрибут:

```js
const element = <img src={user.avatarUrl}></img>;
```

Не поставяйте кавички около фигурни скоби, когато вграждате JavaScript израз в атрибут. Трябва да използвате кавички (за стойности на низове) или фигурни скоби (за изрази), но не и двете в един и същ атрибут.

>**Внимание:**
>
>Тъй като JSX е по-близо до JavaScript, отколкото до HTML, React DOM използва конвенцията за именуване "camelCase" за имената на атрибутите вместо HTML имената на атрибутите.
>
>Например `class` става [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) в JSX, а `tabindex` става [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### Указване на деца с JSX {#specifying-children-with-jsx}

Ако даден таг е празен, можете да го затворите незабавно с `/>`, като в XML:

```js
const element = <img src={user.avatarUrl} />;
```

JSX таговете могат да съдържат деца:

```js
const element = (
  <div>
    <h1>Здравей!</h1>
    <h2>Хубаво е че си тук.</h2>
  </div>
);
```

### JSX предотвратява атаки чрез инжектиране {#jsx-prevents-injection-attacks}

В JSX е безопасно да се вгради входяща информация от потребител:

```js
const title = response.potentiallyMaliciousInput;
// Това е безопасно:
const element = <h1>{title}</h1>;
```

По подразбиране, React DOM [избягва](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) всички стойности, вградени в JSX, преди да ги рендира. По този начин се гарантира, че никога не можете да инжектирате нещо, което не е изрично написано във вашето приложение. Всичко се преобразува в низ, преди да се визуализира. Това помага да се предотвратят [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) атаки.

### JSX представя обекти {#jsx-represents-objects}

Babel компилира JSX до `React.createElement()` повиквания.

Тези два примера са идентични:

```js
const element = (
  <h1 className="greeting">
    Здравей, свят!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Здравей, свят!'
);
```

`React.createElement()` извършва няколко проверки, за да ви помогне да пишете безпроблемен код, но в крайна сметка създава обект като този:

```js
// Забележка: тази структура е опростена
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Здравей, свят!'
  }
};
```

Тези обекти се наричат ​​"React елементи". Можете да ги мислите като за описания на това, което искате да видите на екрана. React чете тези обекти и ги използва, за да построи DOM и да го поддържа актуализиран.

Ще разгледаме визуализирането на React елементи в DOM в следващия раздел.

>**Съвет:**
>

>Препоръчваме ви да използвате ["Babel" езикова дефиниция](http://babeljs.io/docs/editors) за редактора който сте избрали, така че и ES6 и JSX кодът да е с правилен syntax highlighting. Този уебсайт използва цветовата схема [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/), която е съвместима с тази дефиниция.
