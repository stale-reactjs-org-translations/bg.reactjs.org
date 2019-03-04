---
id: lists-and-keys
title: Списъци и ключове
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Първо, нека да разгледаме как преобразувате списъците в JavaScript.

Взимайки кода по-долу, ние използваме функцията [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) за да обходим списъка `numbers` и да удвоим елементите в него. Присвояваме новия масив, върнат от `map()` на променливата `doubleled` и го принтираме:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Този код извежда `[2, 4, 6, 8, 10]` в конзолата.

В React преобразуването на масиви в списъци от [елементи](/docs/rendering-elements.html) е почти идентично.

### Рендериране на множество компоненти {#rendering-multiple-components}

Възможно е да създадете колекции от елементи и [да ги включите в JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx), използвайки фигурни скоби `{}`.

По-долу ние прелистваме списъка `numbers` чрез функцията [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Връщаме елемент `<li>` за всяко число. Накрая, присвояваме получения масив от елементи на `listItems`:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Добавяме целия `listItems` списък в `<ul>` елемент и го [рендерираме в DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Този код визуализира списък с числа от 1 до 5.

### Опростен List компонент {#basic-list-component}

Обикновено вие ще рендерирате списъци вътре в [компонент](/docs/components-and-props.html).

Може да рефакторирате предишния пример към компонент, който приема списък с числа `numbers` и връща списък с елементи.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Когато изпълните този код, ще получите предупреждение, че трябва да бъде предоставен ключ за елементите от списъка. Ключ ("key") е специален низ атрибут, който трябва да включите, когато създавате списъци с елементи. Ще обсъдим защо е важно това в следващия раздел.

Нека присвоим ключ (`key`) на елементите от списъка вътре в `numbers.map()` и решим проблема с липсващия ключ.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Ключове {#keys}

Ключовете помагат на React да определи кои елементи са променени, добавени или премахнати. Трябва да се предоставят ключове, за да се даде на елементите постоянна уникална идентичност:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Най-добрият начин да изберете ключ е да използвате низ, който уникално идентифицира елемент от списъка сред своите съседни такива. Най-често ще използвате идентификатори от данните си като ключове:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

В краен случай, ако нямате идентификатори за визуализираните елементи, може да използвате индекса на елемента като ключ:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

Не препоръчваме да използвате индекси за ключове, ако редът на елементите може да се промени. Това може да повлияе негативно на производителността и да предизвика проблеми със състоянието на компонента. Разгледайте статията на Робин Покорни за [подробно обяснение на отрицателните въздействия от използването на индекс като ключ](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Ако изберете да не присвоявате ключове, когато изброявате елементи, React ще използва по подразбиране индекси като ключове.

Ето [по-подробно обяснение защо са необходими ключове](/docs/reconciliation.html#recursing-on-children), ако се интересувате от повече информация.

### Извличане на компоненти с ключове {#extracting-components-with-keys}

Ключовете имат смисъл само в контекста на близкия масив.

Например, ако [извлечете](/docs/components-and-props.html#extracting-components) компонент `ListItem`, трябва да запазите ключа върху `<ListItem />` елементите в масива, а не върху елемента `<li>` в самия `ListItem`.

**Пример: неправилно използване на ключове**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Пример: правилно използване на ключове**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Добро правило е, че елементите в `map()` имат нужда от ключове.

### Kлючовете трябва да бъдат уникални само между съседни компоненти {#keys-must-only-be-unique-among-siblings}

Ключовете, използвани в масиви, трябва да бъдат уникални измежду съседни компоненти. Те не трябва да бъдат уникални за цялото приложение. Можем да използваме същите ключове, когато произвеждаме два различни масива:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Ключовете служат като подсказка за React, но те не се предават на компонентите ви. Ако се нуждаете от същата стойност във вашия компонент, я препратете изрично като prop с друго име:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

В примера по-горе компонентът `Post` може да чете `props.id`, но не и `props.key`.

### Вграждане на map() в JSX {#embedding-map-in-jsx}

В горните примери дефинирахме отделна променлива `listItems` и я включихме в JSX:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX позволява [да добавяме всякакви изрази](/docs/introducing-jsx.html#embedding-expressions-in-jsx) в къдрави скоби, така че може да добавим и резултата от `map()`.

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Опитай в CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Понякога това води до по-ясен код, но може и да прекалим с този стил. Както при JavaScript, зависи от вас да решите дали си струва да дефинирате променлива за по-добра четимост. Имайте предвид, че ако тялото на `map()` е твърде вложено, може да е добра идея да се [извлечете като отделен компонент](/docs/components-and-props.html#extracting-components).
