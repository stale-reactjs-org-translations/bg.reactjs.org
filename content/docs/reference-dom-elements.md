---
id: dom-elements
title: DOM Елементи
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

React внедрява независима от браузъра DOM система целяща постигането на производителност и съвместимост с различните браузъри. Възползвахме се от отдалата се възможност
за да 'изчистим' някои несъответствия в употребата на DOM дървото от различните браузъри.

В React наименованията на всички свойства и атрибути (включително и манипулаторите на събития) се изписват в camelCase конвенцията. Например, HTML атрибута `tabindex` отговаря
на атрибута `tabIndex` когато бива използван в React. Изключения са атрибутите `aria-*` и `data-*`, които задължително трябва да бъдат изписани с малки букви. Например можете да оставите атрибута `aria-label` като `aria-label`.

## Разлики в Атрибутите {#differences-in-attributes}

There are a number of attributes that work differently between React and HTML:
Редица атрибути работят по различен начин в React и в HTML:

### checked {#checked}

Атрибута `checked` се поддържа от `<input>` компоненти от тип `checkbox` или `radio`. Използва се за да зададете дали компонента е отбелязан. Това е полезно при изграждането на контролирани компоненти. Неконтролирания еквивалент на атрибута е `defaultChecked`, като това залага дали компонента е отбелязан при първоначалното му закачане.

### className {#classname}

За да зададете CSS клас използвайте атрибута `className`. Това се отнася за всички стандартни DOM и SVG елементи като `<div>`, `<a>`, т.н.

Ако използвате React съвместно с Web Components (което е необичайно и рядко срещано), то тогава използвайте атрибута `class`.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

React замества използването на `innerHTML` в DOM-а на браузъра с `dangerouslySetInnerHTML`. Като цяло задавайки HTML от код е рисковано, тъй като е лесно да
изложите потребителите си на [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) атака по невнимание. Така че, въпреки възможността да зададете HTML директно от React, ще ви се наложи да изпишете `dangerouslySetInnerHTML` и да подадете обект с `__html` ключ, напомняйки ви, че това е опасна операция. Например: 

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Тъй като `for` е запазена дума в JavaScript, React елементите изпозлват `htmlFor` като заместител.

### onChange {#onchange}

`onChange` събитието има поведение, което бихте очаквали: когато поле на форма е променено, това събитие бива извикано. Умишлено не използваме вече съществуващото браузър поведение, тъй като `onChange` е погрешно название за поведението което описва, докато React разчита това събитие да манипулира въведените от потребителя данни в реално време.

### selected {#selected}

Атрибута `selected` се използва от `<option>` компоненти. Използва се за да зададете дали компонента е избран. Това е полезно при изграждането на контролирани компоненти.

### style {#style}

>Забележка
>
>Някои примери в документацията използват `style` за удобство, но **използването на атрибута `style` като основен начин за стилизация на елементи обикновено не се препоръчва.** В повечето случаи се препоръчва използването на [`className`](#classname) за референции към класове дефинирани във външен CSS документ. `style` най-често се използва в React приложения за да се добавят стилове, които са динамично-генерирани по време на самото рендериране. Вижте също [FAQ: Стилизиране и CSS](/docs/faq-styling.html).

Атрибутът `style` приема JavaScript обект с наименования на ключовете изписани в camelCase вместо като CSS низ. Това е в съответствие с DOM `style` Javascript атрибута, повишава ефикасноста и предотвратява дупки в XSS сигурноста. Например:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

Обърнете внимание, че стиловете не получават автоматично префикс. За подръжка на по-стари браузъри е нужно да предоставите съответните стилови свойства:

```js
const divStyle = {
  WebkitTransition: 'all', // обърнете внимание на главното 'W'
  msTransition: 'all' // 'ms' е единствения префикс за производител изписван с малки букви
};

function ComponentWithTransition() {
  return <div style={divStyle}>Това би следвало да работи с различни браузъри</div>;
}
```

Стиловите ключове се изписват в camelCase с цел консистентност с достъпа до свойства на DOM nodes от JS (например `node.style.backgroundImage`). Префиксите за производители [с изключение на `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) трябва да започват с главна буква. Това е причината `WebkitTransition`да се изписва главно W.

React автоматично ще добави 'px' наставка до определени числови стилови свойства изписани в ред. Ако искате да използвате мерни единици различни от 'px', въведете стойността като низ заедно с желаната мерна единица. Например:

```js
// Резултат style: '10px'
<div style={{ height: 10 }}>
  Hello World!
</div>

// Резултат style: '10%'
<div style={{ height: '10%' }}>
  Hello World!
</div>
```
Не всички стилови свойства се преобразуват до низове с пиксел наставка. Определени такива ще бъдат запазени без мерна единица (например `zoom`, `order`, `flex`). Пълен лист на свойствата без мерни единици могат да бъдат намерени [тук](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Обикновено се изписва предупредително съобщение когато елемент, който има деца, е маркиран като `contentEditable`, защото няма да сработи. Този атрибут заглушава това предупреждение. Не го използвайте освен ако не разработвате библиотека подобна на [Draft.js](https://facebook.github.io/draft-js/), която ръчно управлява `contentEditable`.

### suppressHydrationWarning {#suppresshydrationwarning}

При използването на server-side React рендериране се изписва предупредително съобщение в случаите когато сървъра и клиента рендерират различно съдържание. Въпреки това, в някои редки случаи гарантирането на пълно съвпадение е много трудно или дори невъзможно. Например, очаква се да има разлика между времевите клейма на сървъра и клиента.

Ако зададете стойност `true` на `suppressHydrationWarning`, React няма да ви предупреждава за разлики в атрибутите и съдържанието на въпросния елемент. Това работи само едно ниво надолу и е предназначено да се използва като авариен изход. Не прекалявайте с употребата му. Може да прочетете повече за хидрадацията в [`документацията на ReactDOM.hydrate()`](/docs/react-dom.html#hydrate).

### value {#value}
Атрибута `value` се поддържа от `<input>` и `<textarea>` компоненти. Можете да го използвате за да заложите стойността на въпросния компонент. Това е полезно при изгражането на контролирани компоненти. `defaultValue` е неконтрилируемия еквивалент, който задава стойността на компонента при първоначалното му закачане.

## All Supported HTML Attributes {#all-supported-html-attributes}

Към React 16 всички стандартни [или персонализирани](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM атрибути се поддържат изцяло.

React винаги е предоставял JavaScript-ориентирано API към DOM дървото. Тъй като React компонентите често приемат едновременно както персонализирани, така и свързани с DOM дървото props, React използва `camelCase` конвенцията, водейки се по примера на DOM API:

```js
<div tabIndex="-1" />      // Също като node.tabIndex в DOM API
<div className="Button" /> // Също като node.className в DOM API
<input readOnly={true} />  // Също като node.readOnly в DOM API
```

Тези props работят подобно на съответстващите им HTML атрибути, с изключение на специалните случаи документирани по-горе.

Някои от DOM атрибутите които се поддържат от React включват:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Също така, всички SVG атрибути се поддържат изцяло:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Вие също може да използвате персонализирани атрибути стига те да са изцяло изписани с малки бутви.
