---
id: add-react-to-a-website
title: Добавете React в уебсайт
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Използвайте толкова React, колкото ви е нужно.

От самото начало React е проектиран за постепенно интегриране, и **може да използвате толкова React, колкото ви е нужно**. Може би искате да добавите "капка интерактивност" на вече съществуваща страница. React компонентите са чудесен начин да го направите.

По-голямата част от уебсайтовете не са, и няма нужда да бъдат, single-page applications. С **няколко реда код и без building инструменти**, пробвайте React в малка част от Вашия уебсайт. След това, може постепенно да го използвате в цялото приложение или само в няколко динамични компонента.

---

- [Добавете React за една минута](#add-react-in-one-minute)
- [Незадължително: Пробвайте React с JSX](#optional-try-react-with-jsx) (не се изисква bundler!)

## Добавете React за една минута {#add-react-in-one-minute}

В този раздел, ще ви покажем как да добавите React компонент към съществуваща HTML страница. Може да следвате стъпките с Вашия собствен уебсайт или да създадете празен HTML файл, за да се упражнявате.

Няма да има сложни инструменти или изисквания за инсталиране -- **за да изпълните стъпките, Ви трябва интернет връзка и минута от Вашето време.**

Незадължително: [Изтеглете целия пример (2KB архивиран)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Стъпка 1: Добавете DOM контейнер в HTML-a {#step-1-add-a-dom-container-to-the-html}

Първо, отворете HTML страницата, която искате да редактирате. Добавете празен `<div>` таг, за да отбележите мястото, на което искате да визуализирате нещо с React. Например:

```html{3}
<!-- ... съществуващ HTML ... -->

<div id="like_button_container"></div>

<!-- ... съществуващ HTML ... -->
```

Сложихме на този `<div>` уникален `id` HTML атрибут. По-късно, това ще ни позволи да го намерим с JavaScript код и да визуализираме React компонент в него.

>Съвет
>
>Може да поставите "контейнер" `<div>`, като този, **навсякъде** в `<body>` тага. На една страница може да имате толкова независими DOM контейнера, колкото Ви трябват. Те обикновено са празни -- React ще замести вече съществуващо съдържание в DOM контейнерите.

### Стъпка 2: Добавете Script таговете {#step-2-add-the-script-tags}

След това, добавете три `<script>` тага в HTML страницата веднага преди затварящия `</body>` таг:

```html{5,6,9}
  <!-- ... друг HTML ... -->

  <!-- Зареждаме React. -->
  <!-- Внимание: когато deploy-вате, заменете "development.js" с "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Зареждаме нашия React компонент. -->
  <script src="like_button.js"></script>

</body>
```

Първите два тага зареждат React. Третият ще зареди Вашия компонент.

### Съпка 3: Създайте React компонент {#step-3-create-a-react-component}

Създайте файл с име `like_button.js` на нивото на Вашата HTML страница.

Отворете **[този стартов код](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** и поставете съдържанието му във файла, който създадохте.

>Съвет
>
>Този код дефинира React компонент, наречен `LikeButton`. Не се притеснявайте, ако все още не го разбирате -- ще говорим по-задълбочено за принципите на разработка с React, по-късно, в нашия [практически урок](/tutorial/tutorial.html) и [урок за основните понятия](/docs/hello-world.html). Засега, нека просто го визуализираме!

След **[стартовия код](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)**, добавете два реда в края на `like_button.js` файла:

```js{3,4}
// ... стартовия код, който добавихте ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

Тези два реда код намират `<div>` елемента, който добавихме в първата стъпка и, след това, визуализират `LikeButton` React компонента в него. 

### Готово! {#thats-it}

Няма четвърта стъпка. **Вие току-що добавихте първия си React компонент във Вашия уебсайт.**

Посетете и другите раздели за още съвети за интегриране на React.

**[Вижте целия примерен код](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Изтеглете целия пример (2KB архивиран)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Съвет: Преизползвайте компонент {#tip-reuse-a-component}

Често може да искате да покажете React компоненти на няколко места във Вашата HTML страница. Ето един пример, който показва "Харесва ми" бутон, три пъти, и му подава данни:

[Вижте целия примерен код](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Изтеглете целия пример (2KB архивиран)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Внимание
>
>Този метод е най-полезен за страници, съдържащи няколко изолирани части код, написани на React. В чист React код е по-лесно да използваме [композиране на компоненти](/docs/components-and-props.html#composing-components).

### Съвет: Минифицирайте JavaScript за Production {#tip-minify-javascript-for-production}

Преди да deploy-нете Вашия уебсайт на production, трябва да знаете, че неминифициран JavaScript може драстично да забави страницата за Вашите потребители.

Ако вече минифицирате скриптовете на приложението, се уверете, че зареждате production версиите на React, завършващи на `production.min.js`. **Вашият сайт е готов за production**:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

Ако не сте настроили минифициране на Вашите скриптове, [ето един начин да го направите](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Незадължително: Пробвайте React с JSX {#optional-try-react-with-jsx}

В примерите по-горе, разчитахме само на функционалностите, които се поддържат от браузъра. Затова използвахме JavaScript функция, за да кажем на React какво да визуализира:

```js
const e = React.createElement;

// Визуализирай "Харесва ми" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Харесва ми'
);
```

Но React ни позволява да използваме [JSX](/docs/introducing-jsx.html):

```js
// Визуализирай "Харесва ми" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Харесва ми
  </button>
);
```

Тези две парчета код са еквивалентни. Докато **JSX е [незадължителен](/docs/react-without-jsx.html)**, много хора го намират за полезен за писане на код за потребителски интерфейс -- заедно с React и други библиотеки.

Може да пробвате JSX с [този онлайн конвертор](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).

### Набързо пробвайте JSX {#quickly-try-jsx}

Най-бързият начин да пробвате JSX във Вашия проект, е да добавите този `<script>` таг във Вашата страница:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Вече може да ползвате JSX във всеки `<script>` таг, добавяйки `type="text/babel"` атрибут. Това е [примерен HTML файл с JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), който можете да свалите и да тествате.

Този метод е подходящ за упражняване и създаване на прости примери. Но прави уебсайта Ви бавен и **не е подходящ за production**. Когато сте готови да продължите напред, премахнете този нов `<script>` таг и `type="text/babel"` атрибутите, които добавихте. Вместо това, в следващия раздел, ще направим JSX препроцесор, който да конвертира `<script>` таговете автоматично.

### Добавете JSX в проект {#add-jsx-to-a-project}

Не са нужни сложни инструменти, като bundler или сървър за разработка, за да добавим JSX към проект. Всъщност, добавянето на JSX **е като добавяне на CSS препроцесор.** Единственото изискване е да имате инсталиран [Node.js](https://nodejs.org/) на Вашия компютър.

Отворете папката на проекта в терминал и поставете тези две команди:

1. **Съпка 1:** Изпълнете `npm init -y` (ако не успеете, [ето решение](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Стъпка 2:** Изпълнете `npm install babel-cli@6 babel-preset-react-app@3`

>Съвет
>
>Ние **използваме npm тук само за да инсталираме JSX препроцесора;** няма да Ви трябва за нищо друго. React и кодът на приложението могат да останат `<script>` тагове.

Поздравления! Току-що добавихте, **готова за production, JSX структура** във Вашия проект.


### Изпълнете JSX препроцесора {#run-jsx-preprocessor}

Създайте папка с име `src` и изпълнете тази команда в терминала:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>Внимание
>
>`npx` не е правописна грешка -- то е [инструмент за изпълнение на пакети, който идва заедно с npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>Ако получавате съобщение за грешка, което казва "You have mistakenly installed the `babel` package", може да сте пропуснали [предишната стъпка](#add-jsx-to-a-project). Изпълнете я в същата папка и опитайте отново.

Не чакайте да приключи -- тази команда стартира автоматизиран наблюдател за JSX.

Ако сега създадете файл с име `src/like_button.js` с този **[JSX стартов код](https://gist.github.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, наблюдателят ще създаде предварително обработен `like_button.js` с чист JavaScript код, готов за браузъра. Когато редактирате файла с JSX, трансформацията ще се изпълни автоматично.

Като бонус, това Ви позволява да използвате съвременни JavaScript синтактични свойства, като класове, без да се притеснявате, че кодът Ви няма да се поддържа от по-стари браузъри. Инструмента, който използвахме се нарича Babel, може да научите повече за него от [неговата документация](https://babeljs.io/docs/en/babel-cli/).

Ако забелязвате, че ставате по-добри с използването на building инструменти и искате да се възползвате от по-голяма част от техните функционалности, [следващият раздел](/docs/create-a-new-react-app.html) описва някои от най-популярните начини. Ако не -- тези script тагове ще Ви свършат чудесна работа!
