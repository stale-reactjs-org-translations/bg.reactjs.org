---
id: test-renderer
title: Test Renderer
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**Използване**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 с npm
```

## Преглед {#overview}

Този пакет предоставя React рендер, който може да се използва да рендерира React компоненти до чисти JavaScript обекти, без да зависят от DOM-a или нейтив мобилни среди.

Или иначе казано, този пакет прави по-лесно взимането на snapshot от платформата на view йерархията (подобно на DOM дървото) рендерирана от React DOM или React Native компонент без да използваме браузър или [jsdom](https://github.com/tmpvar/jsdom).

Пример:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

Може да използвате snapshot тестването на Jest, за да запазите копие на JSON дървото автоматично във файл и да проверите във вашите тестове, че не са се променени snapshot-ите: [Научете повече за това](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html).

Също може да търсите в резултата и да намерите специфични елементи и да направите проверки за тях.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Здравейте</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Подкомпонент</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer инстанция {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Референция {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

Създайте `TestRenderer` инстанция като подадете React елемент. То не използва реален DOM, но все пак рендерира дървото на компонента напълно в паметта, което позволява да направите проверки за него. Върнатата инстанция има следните методи и свойства.
=======
Create a `TestRenderer` instance with the passed React element. It doesn't use the real DOM, but it still fully renders the component tree into memory so you can make assertions about it. Returns a [TestRenderer instance](#testrenderer-instance).
>>>>>>> de497e250340ff597ce4964279369f16315b8b4b

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Similar to the [`act()` helper from `react-dom/test-utils`](/docs/test-utils.html#act), `TestRenderer.act` prepares a component for assertions. Use this version of `act()` to wrap calls to `TestRenderer.create` and `testRenderer.update`.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root = root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Връща обект преставляващ рендерираното дърво. Това дърво съдържа само елементи специфични за платформата, като `<div>` или `<View>` и техните props, но не съдържа никакви компоненти написани от потребителя. Това е удобно за [тестване със snapshot-и](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Връща обект преставляващ рендерираното дърво. За разлика от `toJSON()`, представянето е по-детайлно от това на `toJSON()`, и включва компоненти написани от потребителя. Най-вероятно не се нуждаете от този метод, освен ако не пишете своя собствена библиотека за проверки върху test renderer.

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Презарежда записаното дърво с нов родител-елемент. Това симулира React обновяване на най-високо ниво. Ако новия елемент има същия тип и ключ като предишния елемент, дървото ще бъде обновено; иначе, ще бъде закачено ново дърво.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```
Разкачва записаното дърво, стартирайки съответния жизнен цикъл на компонента.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Връща инстанция на най-високия елемент, ако е достъпен. Това няма да работи, ако елемента е компонент-функция, защото те нямат инстанции.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Връща основния обект на "тест инстанцията", което е полезно за правенето на проверки относно специфични елементи в дървото. Може да го използвате и да търсите "тест инстанции" навътре в дървото.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Намира вътрешна тест инстанция за която `test(testInstance)` връща `true`. Ако `test(testInstance)` не върне `true` за точно една тест инстанция, то ще бъде хвърлена грешка.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Намира вътрешна тест инстанция от предоставения `type`. Ако няма точно една тест инстанция от предоставения `type`, ще бъде хвърлена грешка.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Намира вътрешна тест инстанция с предоставените `props`. Ако не бъде намерена тест инстанция с предоставените `props`, ще бъде хвърлена грешка.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Намира всички вътрешни тест инстанции за които `test(testInstance)` връща `true`.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Намира всички вътрешни тест инстанции от предоставения `type`.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Намира всички вътрешни тест инстанции с предоставените `props`.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

Инстанция на компонента отговарящ на тази тестова инстанция. Това е валидно само за клас компоненти, като компонентите функции нямат инстанции. Сравнението се извършва на базата на `this` стойнонстта в дадения компонент.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

Типът на компонента отговарящ на тази тестова инстанция. Например, `<Button />` компонент е от тип `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

Props отговарящи на тези от тестовата инстанция. Например, `<Button size="small" />` компонента има `{size: 'small'}` като props.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

Тест инстанция на родителя на тази тест инстанция.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

Тест инстанцията на децата на тази тест инстанция.

## Идеи {#ideas}

Може да подадете `createNodeMock` функцията на `TestRenderer.create` като опция, която ви позволява да използвате персонализирани имитиращи референции (`mocked refs`). `createNodeMock` приема текущия елемент и трябва да върне имитираща референция като обект.
Това е полезно, когато тествате компонент, който разчита на референции.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
