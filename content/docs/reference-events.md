---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Това ръководство документира контейнера `SyntheticEvent`, който е част от системата за събития на React. Вижте ръководството [Handling Events](/docs/handling-events.html), за да научите повече.

## Преглед {#overview}

<<<<<<< HEAD
Вашите слушатели на събития ще приемат инстанции на `SyntheticEvent`, cross-browser контейнер около оригиналното събитие на браузъра. Той има същия интерфейс като оригиналното събитие, включително `stopPropagation()` и `preventDefault()`, с тази разлика че събитията работят във всички браузъри.

Ако установите, че се нуждаете от оригиналното браузър събитие по някаква причина, просто използвайте атрибута `nativeEvent`, за да го достъпите. Всеки обект `SyntheticEvent` има следните атрибути:
=======
Your event handlers will be passed instances of `SyntheticEvent`, a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. 

If you find that you need the underlying browser event for some reason, simply use the `nativeEvent` attribute to get it. The synthetic events are different from, and do not map directly to, the browser's native events. For example in `onMouseLeave` `event.nativeEvent` will point to a `mouseout` event. The specific mapping is not part of the public API and may change at any time. Every `SyntheticEvent` object has the following attributes:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

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
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Бележка:
>
<<<<<<< HEAD
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
=======
> As of v17, `e.persist()` doesn't do anything because the `SyntheticEvent` is no longer [pooled](/docs/legacy-event-pooling.html).
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

> Бележка:
>
<<<<<<< HEAD
> Ако искате да получите достъп до свойствата на събитието по асинхронен начин, трябва да извикате `event.persist()`, което ще премахне синтетичното събитие от pool-a и ще позволи референциите към събитието да се запазят във вашия код.
=======
> As of v0.14, returning `false` from an event handler will no longer stop event propagation. Instead, `e.stopPropagation()` or `e.preventDefault()` should be triggered manually, as appropriate.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

## Събития, които React поддържа {#supported-events}

React нормализира събитията, така че да имат едни и същи свойства в различните браузъри.

Следните слушатели на събития се задействат от оригиналните събития в bubbling фазата. За да регистрирате слушател на събитие за capture фазата, добавете `Capture` към името на събитието; например, вместо да използвате `onClick`, използвайте `onClickCapture`.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
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

Имена на събитията:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Свойства:

```javascript
string data

```

* * *

### Keyboard Events {#keyboard-events}

Имена на събитията:

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

Имена на събитията:

```
onFocus onBlur
```

Тези събития за фокус работят върху всички елементи в React DOM, а не само на елементи във форми.

Свойства:

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Form Events {#form-events}

Имена на събитията:

```
onChange onInput onInvalid onReset onSubmit 
```

За повече информация относно onChange събитието, прегледайте [Forms](/docs/forms.html).

* * *

### Generic Events {#generic-events}

Имена на събитията:

```
onError onLoad
```

* * *

### Mouse Events {#mouse-events}

Имена на събитията:

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

Имена на събитията:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Събитията `onPointerEnter` и `onPointerLeave` се разпространяват от елемента, който напускаме, а не от този който посочваме. Те нямат capture фаза.

Свойства:

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

Имена на събитията:

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

<<<<<<< HEAD
Свойства:
=======
>Note
>
>Starting with React 17, the `onScroll` event **does not bubble** in React. This matches the browser behavior and prevents the confusion when a nested scrollable element fires events on a distant parent.

Properties:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

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

Имена на събитията:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Image Events {#image-events}

Имена на събитията:

```
onLoad onError
```

* * *

### Animation Events {#animation-events}

Имена на събитията:

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
