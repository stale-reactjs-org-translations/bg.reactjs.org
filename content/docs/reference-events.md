---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Това ръководство документира контейнера `SyntheticEvent`, който е част от системата за събития на React. Вижте ръководството [Handling Events](/docs/handling-events.html), за да научите повече.

## Преглед {#overview}

Вашите слушатели на събития ще приемат инстанции на `SyntheticEvent`, cross-browser контейнер около оригиналното събитие на браузъра. Той има същия интерфейс като оригиналното събитие, включително `stopPropagation()` и `preventDefault()`, с тази разлика че събитията работят във всички браузъри.

Ако установите, че се нуждаете от оригиналното браузър събитие по някаква причина, просто използвайте атрибута `nativeEvent`, за да го достъпите. Всеки обект `SyntheticEvent` има следните атрибути:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> Бележка:
>
> След версия v0.14, връщайки `false` от слушател на събития не спира event propagation-a. Вместо това, `e.stopPropagation()` или `e.preventDefault()` трябва да бъдат извикани ръчно, там където е нужно.

### Event Pooling {#event-pooling}

`SyntheticEvent` се преизползва. Това означава, че обектът `SyntheticEvent` ще бъде използван отново и всички свойства ще бъдат анулирани след извикване на събитието.
Това е във връзка с производителността.
Заради това не можете да получите достъп до събитието по асинхронен начин.

```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> Бележка:
>
> Ако искате да получите достъп до свойствата на събитието по асинхронен начин, трябва да извикате `event.persist()`, което ще премахне синтетичното събитие от pool-a и ще позволи референциите към събитието да се запазят във вашия код.

## Събития, които React поддържа {#supported-events}

React нормализира събитията, така че да имат едни и същи свойства в различните браузъри.

Следните слушатели на събития се задействат от оригиналните събития в bubbling фазата. За да регистрирате слушател на събитие за capture фазата, добавете `Capture` към името на събитието; например, вместо да използвате `onClick`, използвайте `onClickCapture`.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)

* * *

## Описание {#reference}

### Clipboard Events {#clipboard-events}

Име на събитията:

```
onCopy onCut onPaste
```

Свойства:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Composition Events {#composition-events}

Име на събитията:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Свойства:

```javascript
string data

```

* * *

### Keyboard Events {#keyboard-events}

Име на събитията:

```
onKeyDown onKeyPress onKeyUp
```

Свойства:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

Свойството `key` може да приеме всяка от стойностите, документирани в [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Focus Events {#focus-events}

Име на събитията:

```
onFocus onBlur
```

Тези събития за фокус работят върху всички елементи в React DOM, а не само на елементи във форми.

Свойства:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Form Events {#form-events}

Име на събитията:

```
onChange onInput onInvalid onSubmit
```

За повече информация отностно onChange събитието, прегледайте [Forms](/docs/forms.html).

* * *

### Mouse Events {#mouse-events}

Име на събитията:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Събитията `onMouseEnter` и `onMouseLeave` се разпространяват от елемента, който напускаме, а не от този в който въвеждаме. Те нямат capture фаза.

Свойства:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Pointer Events {#pointer-events}

Име на събитията:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Събитията `onPointerEnter` и `onPointerLeave` се разпространяват от елемента, който напускаме, а не от този който посочваме. Те нямат capture фаза.

Свойства:

As defined in the [W3 spec](https://www.w3.org/TR/pointerevents/), pointer events extend [Mouse Events](#mouse-events) with the following Свойства:

Както е дефинирано в спецификацията [W3](https://www.w3.org/TR/pointerevents/), събития за посочване наследяват [Mouse Events](#mouse-events) със следните Свойства:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Бележка за поддръжка в различните браузъри:

Събитията за посочване все още не се поддържат във всеки браузър (към момента на писане на тази статия браузъри с поддръжка са: Chrome, Firefox, Edge и Internet Explorer). React умишлено не предлага polyfill за други браузъри, тъй като стандартния polyfill значително ще увеличи размера на пакета `react-dom`.

Ако приложението ви изисква събития за посочване, препоръчваме да добавите polyfill допълнително.

* * *

### Selection Events {#selection-events}

Име на събитията:

```
onSelect
```

* * *

### Touch Events {#touch-events}

Име на събитията:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Свойства:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI Events {#ui-events}

Име на събитията:

```
onScroll
```

Свойства:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Events {#wheel-events}

Име на събитията:

```
onWheel
```

Свойства:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Events {#media-events}

Име на събитията:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Image Events {#image-events}

Име на събитията:

```
onLoad onError
```

* * *

### Animation Events {#animation-events}

Име на събитията:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Свойства:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Transition Events {#transition-events}

Име на събитията:

```
onTransitionEnd
```

Свойства:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Other Events {#other-events}

Име на събитията:

```
onToggle
```
