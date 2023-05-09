# Redux Essentials Tutorial Example

This project contains the setup and code from the "Redux Essentials" tutorial in the Redux docs ( https://redux.js.org/tutorials/essentials/part-1-overview-concepts ).

The `master` branch has a single commit that already has the initial project configuration in place. You can use this to follow along with the instructions from the tutorial.

The `tutorial-steps` branch has the actual code commits from the tutorial. You can look at these to see how the official tutorial actually implements each piece of functionality along the way.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

> **Note**: If you are using Node 17, this project may not start correctly due to a known issue with Webpack and Node's OpenSSL changes, which causes an error message containing `ERR_OSSL_EVP_UNSUPPORTED`.  
> You can work around this by setting a `NODE_OPTIONS=--openssl-legacy-provider` environment variable before starting the dev server.
> Details: https://github.com/webpack/webpack/issues/14532#issuecomment-947012063

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Объяснение концепции редакса из видео:
Есть UI (user interface) - наше приложение по сути, то с чем взаимодействует пользователь, то что пользователю видно (а все остальное не видно)
Есть Store - некое глобальное хранилище
Есть actions - какое-то событие, которое говорит reducer что произошло и с чем нужно работать. с тулкитом они создаются автоматически, руками ни один action создавать не нужно
и есть reducer, который с этими actions работает и обновляет состояния в store

Когда пользователь что-то делает (нажимает на кнопку), что должно приводить к изменению глобального состояния, -> это вызывает некие события так называемые actions. Actions приводят к тому что у нас должна отработать какая-то логика и по этой логике должны произойти изменения. Тут и нужны reducers - типа некий фильтр, который всегда знает текущее состояние нашего store и знает, какое событие произошло. Он представляет собой какую-то функцию, в этой функции смотрится: вот это событие берем текущее состояние и в зависимости от того, какое событие произошло обновляется это состояние, соответственно обновляется наш store и во всех местах в приложении (UI) где компоненты подписаны на то, что изменилось, и происходит автоматическая перерисовка. И дальше история повторяется: пользователь что-то нажал -> случилось событие, инициированное пользователем, -> отработала внутренняя логика (reducer), которая взяла текущее состояние, как-то его преобразовала и вернула в store новое состояние, которое снова повлияло на приложение (перерисовка в зависимости от изменений состояния), изменения могут быть в разных частях приложения

Как использовать базовая концепция:
благодаря скачиванию библиотеки react-redux все приложение оборачивается в Redux Provider, всему приложению будет доступен наш store, благодаря двум хукам, которые поставляются вместе с установленной библиотекой, - useDispatch & useSelector. Эти два хука доступны любому компоненту в приложении которые помогут доставать значения и вызывать события, которые будут приводить к изменениям нашего хранилища

Создаем папку store, там внутри файл index.js. Там будет сам store (хранилище)
Для создания store:

- импортируем из библиотеки
  import {ConfigureStore} from '@reduxjs/toolkit'
- экспортируем и настраиваем ConfigureStore. Он будет возвращать как раз то самое хранилище. Хранилище будет состоять из набора reducers. Reducer представляет собой объект,
  export default ConfigureStore ({})

/////////////////////////////////////////////////////////////////////////////////////////

Redux — это шаблон и библиотека для управления и обновления состояния приложения с использованием событий, называемых 'actions' = 'действия'.

Паттерны и инструменты, предоставляемые Redux, облегчают понимание того, когда, где, почему и как обновляется состояние в приложении, и как поведет себя логика приложения, когда произойдут эти изменения

Не всем приложениям нужен Redux

Redux ожидает, что все обновления состояния выполняются неизменямо - т.е через создание копий состояния и обновление уже самих копий

Terminology // терминология

!!! Actions

Action - простой объект JavaScript, у которого есть поле type. Можно воспринимать Action как событие, которое описывает что произошло в приложении.
Поле type должно быть строкой, которая дает этому объекту описывающее (descriptive) название например "todos/todoAdded". Обычно пишут такую строку типа "domain/eventName", где первая часть - это функция или категория, к которой принадлежит это действие, а вторая часть - конкретное событие, которое произошло

Объект action может иметь другие поля с дополнительной информацией что произошло. По соглашению эту информацию кладут в поле payload

Типичный объект action может выглядеть так:

const addTodoAction = {
type: 'todos/todoAdded',
payload: 'Buy milk'
}

!!! Action Creators

Action creator - функция, которая создает и возвращает action object (объект действия см выше что это)
Обычно используются они и не нужно вручную каждый раз писать объект action:

const addTodo = text => {
return {
type: 'todos/todoAdded',
payload: text
}
}

!!! Reducers

- это функция которая получает текущее состояние и action объект, решает, как обновить стейт если нужно, и возвращает новый стейт: (state, action) => newState

Про reducer можно думать как об event listener (прослушиватель событий), который обрабатывает события на основе полученного типа действия (события)

Правила reducer:

- они должны только рассчитывать новое значение стейта на основе передаваемых аргументов state и action
- им нельзя изменять существующий стейт. Вместо этого они должны делать неизменяемые обновления (immutable updates) - копировать существующий стейт и делать изменения в скопированных значениях
- они не должны делать какую-то ассинхронную логику, вычислять рандомные значения или вызывать другие побочные эффекты (side effects)

Логика внутри reducer функций обычно следует одинаковой последовательности шагов:

- проверка чтобы посмотреть имеет ли reducer функция отношение к этому action (Check to see if the reducer cares about this action)
- если да, сделать копию стейта, обновить копию с новыми значениями и вернуть его
- иначе вернуть существующий стейт без изменений

Ниже пример reducer показывающий шаги, которые каждый reducer должен пройти:

const initialState = {value: 0}

function counterReducer (state=initialState, action) {

// Check to see if the reducer cares about this action - проверка имеет ли reducer отношение к action
if (action.type === 'counter/increment') {

// если да, сделай копию стейта
return {
...state,

// и обнови копию с новым значением
value: state.value + 1
}
}

// иначе верни существующий стейт без изменений
return state
}

- Reducers могут использовать любую внутреннюю логику, чтобы решить каким должно быть новое состояние: if/else, switch, loops, and so on.

!!! Store

- текущий стейт находится в объекте, который называется store (хранилище)

- Store создается путем передачи reducerа и имеет метод getState, который возвращает текущее значение состояния:

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}

!!! Dispatch

у store есть метод Dispatch. Единственный способ обновить стейт - вызвать store.dispatch() и передать объект action. Store запустит свою функцию reducer и сохранит новое значение стейта внутри, и мы можем вызвать getState() для получения обновленного значения:

store.dispatch({type: 'counter/increment'})

console.log(store.getState())

//{value: 1}

Можно думать о Dispatch как о "запуске action (события) в приложении". Что-то случается и мы хотим, чтобы store знал про это. Reducers выступают как слушатели событий и когда они слышат событие, в котом они заинтересованы, в ответ они обновляют стейт

Обычно вызывают создателей действий (action creators см выше) для отправки нужного действия:

const increment = () => {
return {
type: 'counter/increment'
}
}

store.dispatch(increment())

console.log(store.getState())
// {value: 2}

!!! Selectors

- это функции, которые знают как извлечь определенные части информации из значения стейта в объекте store. Когда приложение становится больше, это поможет избежать повторения логики, поскольку разные части приложения должны считывать одни и те же данные:

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())

console.log(currentValue)
//2

!!! односторонний поток данных vs Redux сревнение последовательности шагов для обновления приложения

Односторонний:

1. Стейт описывает состояние приложения в определенный момент времени
2. Пользовательский интерфейс отображается на основе этого состояния
3. когда что-то происходит (напр пользователь нажимает на кнопку), состояние обновляется в зависимости от того, что произошло
4. пользовательский интерфейс перерисовывается на основе нового состояния

Redux:
первоначальная настройка:

1. с помощью корневой функции reducer создается redux store
2. Store вызывает корневой reducer единожды и сохраняет возвращаемое значение в качестве начального состояния
3. когда пользовательский интерфейс впервые рендерится, компоненты получают доступ текущему состоянию redux store и используют эти данные чтобы решить, что отображать. Они также подписываются на любые будущие обновления store чтобы знать, изменилось ли состояние

Обновления:

1. что-то происходит, напр пользователь нажимает на кнопку
2. код приложения отправляет action (действие) в Redux store(хранилище), например dispatch({type: 'counter/increment'}).
3. Store снова запускает функцию reducer с предыдущим состоянием и текущим action (действием) и сохраняет возвращаемое значение как новое состояние
4. Store уведомляет все части пользовательского интерфейса, которые подписаны, что store был обновлен
5. каждый компонент, которому нужны данные из store (хранилища), проверяет не изменились нужные ему части состояния
6. каждый компонент, который видит, что его данные изменились, выполяет повторный рендеринг с новыми данными, чтобы обновить то, что тображается на экране

Summary

Redux - это библиотека для управления глобальным состоянием приложения
Стандартно Redux используется с библиотекой React-Redux

Redux Toolkit - это рекомендуемый способ написания логики Redux

Redux использует структуру приложения "односторонний поток данных":

- стейт описывает состояние приложения в определенный момент времени, а пользовательский интерфейс обновляется на основе этого состояния

- Когда что-то происходит в приложении:

1. пользовательсий интерфейс передает/отправляет действие (dispatches an action)
2. Store запускает reducers и стейт обновляется на основании того, что произошло
3. Store оповещает пользовательский интерфейс, что стейт изменился
4. Пользовательский интерфейс перерендеривается в зависимости от изменений

В Redux используется несколько типов кода:

- Actions - простые объекты полем type, которые описывают, что изменилось в приложении
- Reducers - функции, которые высчитывают новое значение состояния, осонованное на предыдущем состоянии + action
- Store запускает корневой reducer при каждом отправленном действии (whenever an action is dispatched)

!!! Redux Toolkit App Structure

! Creating Redux Store

см файл store.js:

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
reducer: {
counter: counterReducer,
},
});

Redux Store создается с помощью функции configureStore из Redux Toolkit, она требует чтобы мы передали аргумент reducer

Приложение может состоять из множества различных функций и у каждой должна быть своя функция reducer. Когда мы вызываем configureStore, мы можем передать все возможные reducer в объекте. Имена ключей в объекте будут определять ключи в нашем конечном значении стейта

Есть файл features/counter/counterSlice.js который экспортирует функцию reducer для логики счетчика. Мы можем импортировать эту функцию counterReducer в файл store.js и включить ее при создании store

Когда мы передаем объект типа {counter: counterReducer}, это означает, что мы хотим иметь раздел state.counter (section) нашего объекта состояния и что мы хотим, чтобы функция counterReducer отвечала за принятие решения о том, обновлять ли и как обновлять state.counter при каждом отправленном действии (whenever an action is dispatched)

Редакс позволяет настройкам storа быть кастомизированными с помощью различных плагинов ("middleware" and "enhancers"),
configureStore автоматически добавляет несколько промежуточных программ к настройке store по дефолту, чтобы обеспечить хороший developer experience, а также настраивает store так, чтобы расширение Redux DevTools могло проверять его содержимое.

Redux Slices

Silce - это набор reducer логики и actions для одной функции приложения, обычно определяемой в одном файле. Название происходит от разделения корневого объекта на несколько "кусочков" состояния. (multiple "slices" of state.)

Например в приложении для блога настройка store может выглядеть следующим образом:

import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
reducer: {
users: usersReducer,
posts: postsReducer,
comments: commentsReducer
}
})

В этом примере state.users, state.posts и state.comments являются отдельными (срезами) 'slice' стейта. Поскольку usersReducer отвечает за обновление slice (среза) state.users, мы называем ее функцией "slice reducer".

!!! Creating Slice Reducers and Actions

файл counterSlice.js:

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
name: 'counter',
initialState: {
value: 0
},
reducers: {
increment: state => {
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
state.value += 1
},
decrement: state => {
state.value -= 1
},
incrementByAmount: (state, action) => {
state.value += action.payload
}
}
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

Ранее мы видели, что нажатие на кнопки в приложении dispatch 3 action types (отправляет 3 типа действий redux ):

{type: "counter/increment"}
{type: "counter/decrement"}
{type: "counter/incrementByAmount"}

Мы знаем, что это простые объекты с полем type, которое всегда является строкой и у нас стандартно есть "action creator" функции, которые создают и возвращают the action objects (объекты действия). Где определяются эти action objects, type strings, and action creators?

Мы можем их писать от руки каждый раз, но это утомительно. Кроме того, что действительно важно в Redux, так это функции редюсеры и логика, которую они имеют для вычисления нового состояния

У редакс тулкита есть функция createSlice, которая берет на себя работу по генерации action type strings, action creator functions, and action objects. Все, что нужно сделать - определить имя для этого slice (среза), написать объект, содержащий некоторые reducer functions, и он автоматически генерирует соответствующий action code (код действия)
Строка из опции name (name: 'counter',) используется в качестве первой части каждого action type (типа действия), а имя ключа каждой функции-редюсера используется как вторая часть (reducers: {increment: ..., decrement: ..., incrementByAmount:}). Таким образом the "counter" name + функция-редюсер "increment" генерируют action type of {type: "counter/increment"}

CreateSlice должен передать изначальное состояние для редюсеров (initialState:), чтобы при первом вызове было состояние. В данном случае у нас:
initialState: {
value: 0
}

Мы можем видеть, что здесь три функции-редюсера и это соответсвует трем различным action types, которые были отправлены при нажатии на различные кнопки

createSlice автоматически генерирует action creators с тем же именем, что и у функции-редюсера. Можно проверить в консоли:
console.log(counterSlice.actions.increment())
// {type: "counter/increment"}.

createSlice также генерирует функцию slice reducer, которая знзает как реагировать на все эти action types(типы действий):
const newState = counterSlice.reducer(
{ value: 10 },
counterSlice.actions.increment()
)
console.log(newState)
// {value: 11}

!!! Rules of Reducers

1. Они должны высчитывать новое состояние основываясь только на аргументах state и action
2. ВАЖНОЕ! Нельзя изменять существующий стейт, должны делать изменения делая копию существующего стейта и изменения именно в ней
   Если делаем редюсер с функцией createSlice редакс тулкита - там это делается само автоматически (тк внутри используется библиотека Immer)
3. не должны делать любую асинхронную логику или другие side effects

Почему эти правила важны?

1. Одна из задач редакса - сделать код предсказуемым. Когда выход функции (function's output) вычисляется только на основе входящих аргументов, легче понять, как работает код и протестировать его
2. С другой стороны, если функция зависит от переменных вне себя, или ведет себя случайным образом, никогда не известно что произойдет, когда ее запустить
3. Если функция изменяет другие значения, включая свои аргументы, это может неожиданно изменить работу приложения. Это может быть распространенным источником ошибок таких как - я обновил свое состояние, но теперь приложение (UI) не обновляется, когда должно
4. Некоторые возможности Redux DevTools зависят от того, насколько соблюдаются эти правила

В нашем примере функции-редюсеры increment, decrement добавляют / убирают 1 к state.value. Т.к immer знает, что мы внесли изменения в черновике объекта state, нам не нужно ничего возвращать здесь. В обоих редюсерах не нужно, чтобы код просматривал объект action. Он будет передан в любом случае, но посокльку нам не нужен, можем пропустить объявление action в качестве параметра для редюсера

С другой стороны редюсер incrementByAmount должен что-то знать - сколько добавить к значению счетчика. Поэтому мы объявляем редюсер с аргументами и state, и action. Так мы знаем, что сумма введенная в инпут будет помещена в поле
action.payload, поэтому мы можем добавить ее в state.value.

!!! Writing Async Logic with Thunks

Танк (a thunk) - специфический тип функции в редаксе, которая можем содежрать ассинхронную логику. Танки пишутся используя две функции:

- внутренняя thunk (танк) функция, которая получает dispatch и getState в качестве аргументов
- внешняя создающая функция(The outside creator function), которая создает и возвращает функцию thunk

Функция, экспортируемая из counterSlice, является примером thunk action creator:

// функция называется танк и позволяет делать ассинхронную логику.
Она может быть вызвана как обычный action: `dispatch(incrementAsync(10))`. Это вызовет танк с функцией dispatch в качестве первого аргумента. Затем можно выполнять ассинхронный код и диспетчеризировать другие действия
export const incrementAsync = amount => dispatch => {
setTimeout(() => {
dispatch(incrementByAmount(amount))
}, 1000)
}

Мы можем их использовать также как использвуем типичный Redux action creator:
store.dispatch(incrementAsync(5))

Однако использование thunks требует чтобы redux-thunk middleware (a type of plugin for Redux) было добавлено в редакс store при создании. К счастью функция configureStore редакт тулкита уже автоматически делает это, поэтому мы можем использовать thunks в данном случае

Когда нужен сделать AJAX запросы для получения данных с сервера, можно поместить этот вызов в thunk.
Пример:

// the outside "thunk creator" function
const fetchUserById = userId => {

// the inside "thunk function"
return async (dispatch, getState) => {
try {

      // make an async call in the thunk
      const user = await userAPI.fetchById(userId)

      // dispatch an action when we get the response back
      dispatch(userLoaded(user))
    } catch (err) {

      // If something went wrong, handle it here
    }

}
}

!!! хук UseSelector

позволяет нашему компоненту извлекать любые необходимые ему фрагменты данных из хранилища состояния редакс (the Redux store state)
всегда принимает функцию как параметр выглядит типа так - `useSelector((state) => state.counter.value)`

Ранее мы видели, что можно писать функции-селекторы, которые принимают состояние в качестве аргумента и возвращают некоторую часть значения состояния

В файле counterSlice.js внизу есть эта функция селектор:

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value

Если у нас есть доступ к редакс store, мы можем получить текущее значение как:
const count = selectCount(store.getState())
console.log(count)

Наши компоненты не могут напрямую общаться с редакс store, потому что нельзя импортировать его в файлы компонентов. но есть функция(хук?) useSelector которая позаботится о том, чтобы поговорить с Redux store за кулисами для нас. Если мы передаем функцию селектор, она вызывает someSelector(store.getState()) и возвращает результат

Таким образом мы можем получить текущее значение счетчика (current store counter) из стора так:
const count = useSelector(selectCount)

Мы не обязаны использовать только селекторы, которые уже экспортированы. Мы можем написать функцию селектора в качестве встроенного аргумента useSelector:
const countPlusTwo = useSelector(state => state.counter.value + 2)

Каждый раз, когда action был dispatched и redux store был обновлен, useSelector будет повторно запускать нашу функцию селектора. Если селектор вернет другое значение, чем в прошлый раз, useSelector проследит, чтобы наш компонент рендерился с новым значением

!!! хук useDispatch

Поскольку у нас нет доступа к редакс storу, нужен способ получить доступ к методу dispatch. Это делает хук useDispatch и дает фактический метод отправки из redux store:

const dispatch = useDispatch()

dispatch - функция, которая приводит к тому, что срабатывает тригер что какое-то событие случилось, пора какое-то событие передать в редюсер. Но нужно конкретизировать, какое именно событие(action) случилось, для этого его точечно импортировать из среза (slice)

Отсюда мы можем отправлять действия (dispatch actions), когда пользователь что-то делает (напр нажимает на кнопку):

<button
className={styles.button}
aria-label="Increment value"
onClick={() => dispatch(increment())}

>

- </button>

Все ли состояния приложения класть в redux store?

- Нет. Туда кладем только глобальные состояния, которые нужны в разных компонентах всего приложения. Стейты, которые нужны только в одном месте = локальные состояния - должны храниться в состоянии компонента

Если есть сомнения, класть ли в redux store или оставлять докально в компоненте, есть несколько правил для определения, куда поместить:

- заблотятся ли другие части приложения об этих данных?
- нужна ли возможность создавать дальнейшие производные данные на основе этих исходных данных?
- используются ли одни и те же данные для управления несколькими компонентами?
- есть ли ценность / необходимость возможность восстановить это состояние в определенный момент времени?
- хотите ли кешировать данные? (т.е. еспользовать то, что находится в состоянии, если оно уже есть, вместо повторного запроса)
- хотите ли вы сохранить эти данные неизменными при "горячей" загрузке компонентов приложения(которые могут потерять свое внутреннее состояние при переключении)?

Это также хороший пример того, как следует думать о формах в редаксе в целом. Большинство состояний формы не стоит хранить в редаксе. Вместо этого храните данные в компонентах формы по мере их редактирования, а затем dispatch Redux actions (отправляйте редакс действия) для обновления стора (хранилища), когда пользователь закончит

thunk (танк) incrementAsync из counterSlice.js мы используем точно также, как при диспетчиризации других обычных action creators. Компоненту все равно, отправляем ли мы обычное действие (normal action) или запускаем ассинхронную логику. Он только знает, что когда вы нажимаете на кнопку, он что-то отправляет

!!! Providing the Store (обеспечение стора/хранилища)

Чтобы наши хуки, такие как useSelector, работали правильно, нам нужно использовать компонент <Provider> для передачи хранилища Redux за сценой, чтобы они могли получить к нему доступ.
Для этого в файле App.js - импортируем:

- import store from './app/store' - из нами созданного файла
- import { Provider } from 'react-redux' - из библиотеки

и оборачиваем:  
<Provider store={store}>
<App />
</Provider>,

Теперь любые реакт-компоненты, которые лежат внутри <Provider> и вызывают useSelector или useDispatch, будут обращаться к redux store, который мы передали в <Provider store={store}>

!!!! Summary

1. Мы создаем redux store с помощью Redux Toolkit configureStore API (см файл store.js)

- configureStore принимает функцию-редюсер в качестве именованного аргумента
- configureStore автоматически настраивает store с хорошими настройками по умолчанию

2. логика редакса обычно организована в файлы, называемые slice (срезами)

- Slice содержит логику редюсера и actions (действия), связанные с конкретной функцией/секцией redux state (состояния redux)
- API createSlice в Redux Toolkit генерирует action creators & action types для каждой отдельной функции-редюсера, которую вы предоставляете

3. Redux reducers должны следовать определенным правилам:

- должны только высчитывать новое значение состояния на основании аргументов state & action
- должны копировать существуещее состояние и делать изменения там, а не в самом стейте
- не должны содержать ассинхронной логики или других side effects
- API createSlice Redux toolkit использует библиотеку Immer, чтобы позволить "мутировать" неизменяемые обновления

4. Ассинхронная логика обычно пишется в специальных функциях, которые называются "thunks"

- thunks получают dispatch and getState как аргументы
- редакс тулкит по умолчанию включает промежуточное redux-thunk middleware

5. React-redux позволяет компонентам реакт взаимодействовать с redux store

- обертка всего приложения в <Provider store={store}> позволяет всем компонентам использовать store
- Глобальное состояние должно находиться в redux store, локальные состояния должны оставаться в компонентах react

!!! 3. Redux Essentials, Part 3: Basic Redux Data Flow

Первый шаг - создание слайса (среза), который будет содержать данные для постов. После того, как получим эти данные в хранилище редакс, можно создать компоненты для отображения этих данных на странице

1. Внутри папки src создаем папку features, в ней папку posts и в ней файл postsSlice.js

Будем использовать функцию createSlice для создания функции-редюсера, которая знает, как обрабатывать данные наших постов. Функции-редюсеры должны иметь некоторые начальные данные, чтобы при запуске приложения в store были загружены эти значения

Пока что создадим массив с несколькими фальшивыми объектами post внутри, чтобы мы могли начать добавлять пользователький интерфейс.

2. В файле postsSlice.js мпортируем import { createSlice } from '@reduxjs/toolkit'
3. Создаем изначальное состояние:
   const initialState = [
   {id: '1', title: 'First Post!', content: 'Hello!'},
   {id: '2', title: 'Secons Post!', content: 'More text'},
   ]
4. создаем слайс с помощью createSlice, куда передаем имя (называем сами), начальное состояние и редюсеры (пока пустые)

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {}
})

5. экспортируем функцию-редюсер постов, которую сгенерировал createSlice:
   export default postsSlice.reducer

6. Каждый раз, когда мы создаем новый слайс (срез), нужно добавлять его функцию-редюсер в redux store (хранилище) - файл store.js Для этого в этом файле store.js импортируем postsReducer (просто так назвали, фактически это postsSlice.reducer из файла со слайсом - экспорт в последней строке):

import postsReducer from '../features/posts/postsSlice'

7. Кладем внутрь configureStore этот редюсер c ключом/именем posts

export default configureStore({
reducer: {
posts: postsReducer
}
})

Это говорит редаксу, что мы хотим, чтобы наш объект state верхнего уровня имел внутри поле с именем posts, а все данные для state.posts будут обновляться функцией postsReducer при выполнении действий

Можно убедиться, что это работает, открыв redux devtools и посмотрев на содержимое текущего состояния - там открыть вкладку state

8. Теперь когда есть данные о постах в нашем хранилище, можно создать компонент реакт, который отображает список постов
   Весь код должен быть в папке posts, где ! нужно создать файл PostsList.js !

Если мы планируем рендерить список постов, нужно откуда-то брать данные. Компоненты реакт могут брать данные из store с помощью хука useSelector из библиотеки React-Redux. Функции-селекторы("selector functions") будут вызываться со всем Redux state object (объектом состояния redux) в качестве параметра и должны возвращать конкретные данные, которые нужны этому компоненту из store

Наш первоначальный компонент PostsList будет считывать значение state.posts из redux store, затем в цикле пересматривать массив постов и показывать на экране каждый из них

9. В файле PostsList.js импортируем реакт и useSelector:

import React from 'react'
import { useSelector } from 'react-redux'

10. дальше:

export const PostsList = () => { // создаем компонент PostsList
const posts = useSelector(state => state.posts) // достаем из хранилища данные

const renderedPosts = posts.map(post => ( // пишем map, чтобы отрендерились все пункты списка

<article className="post-excerpt" key={post.id}>
<h3>{post.title}</h3>
<p className="post-content">{post.content.substring(0, 100)}</p>
</article>
))
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts} 
    </section>
  )
}

11. в главном компоненте App.js в рендер добавляем наш компонент <PostsList />
    <Route
    exact
    path="/"
    render={() => (
    <>
    <PostsList />
    </>
    )}
    />

Далее создадим форму для написания и добавления новых постов. Вначале создадим пустую форму и добавим на страницу. Потом соединим форму с redux store, чтобы посты добавлялись когда будем нажимать на кнопку "сохранить пост"

12. Создаем файл AddPostForm.js в папке posts, туда добавляем форму с текст инпутом для заголовка, текстэриа для тела поста и кнопкой для сохранения/добавления поста:

import React, { useState } from 'react'

export const AddPostForm = () => {
const [title, setTitle] = useState('')
const [content, setContent] = useState('')

const onTittleChanged = (e) => setTitle(e.target.value)
const onContentChanged = (e) => setContent(e.target.value)

return (

<section>
<h2>Add a new post</h2>
<form>
<label htmlFor="postTitle">Post Title: </label>
<input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTittleChanged}
        />
<label htmlFor="postContent">Content:</label>
<input
          type="textarea"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
<button type="button">Save post</button>
</form>
</section>
)
}

13. Импортируем этот компонент в App.js и вставляем после компонента с постами:

<>
<PostsList />
<AddPostForm />
</>

Теперь надо обновить слайс posts, чтобы добавлять новые записи/посты в редакс store
Наш слайс posts отвечает за обработку всех обновлений данных постов. внутри вызова createSlice есть объект reducers, сейчас он пуст. Нужно в него добавить функцию-редюсер, чтобы обрабатывать случаи добавления сообщения

14. в файле postsSlice.js внутри reducers добавляем функцию postAdded, которая принимает два аргумента - текущее state value & action object that was dispatched (объект действия, который был отправлен). Поскольку слайс posts знает только о тех данных, за которые он отвечает, аргументом state будет массив posts сам по себе, а не весь redux state object

Action object (объект действия) будет содержать нашу новую запись поста в качестве поля action.payload и мы поместим этот новый объект поста в массив state

reducers: {
postAdded(state, action) {
state.push(action.payload)
},
},

15. Когда мы пишем функцию-редюсер postAdded, createSlice автоматически генерирует action creator c тем же именем. Мы можем экспортировать этот action creator и использовать его в наших компонентах UI для dispatch the action (запуска события), когда пользователь нажимает на кнопку "сохранить пост"

Экспортируем:
export const { postAdded } = postsSlice.actions

В нашей AddPostForm кнопка пока ничего не делает. Нужно добавить обработчик нажатия, который будет dispatch the postAdded action creator (запускать создателя действия postAdded) и передавать новый объект поста, содержащий заголовок и содержимое, написанное пользователем.

16. Наши объекты постов также должны иметь id - нужно генерировать случайный уникальный с помощью функции nanoid редакс тулкита, импортируем:

import { nanoid } from '@reduxjs/toolkit'

17. Для того, чтобы to dispatch actions (отправлять действия) из компонента, нужен доступ к функции dispatch из store. Для этого есть хук useDispatch из React-Redux. Также нужно импортировать postAdded action creator в файл AddPostForm:
    import { useDispatch } from 'react-redux'
    import { postAdded } from './postsSlice'

18. После того, как мы импортировали useDispatch, пишем:

const dispatch = useDispatch()

Далее мы можем вызвать dispatch(postAdded()) в кликхендлере кнопки. title and content values можем взять из useState, id сгенерировать и объединить их в новых объект post, который мы передадим в postAdded().

19. Пишем обработчик на кнопку:

const onSavePostClicked = () => {
if (title && content) { // если пользователь ввел и название и контент
dispatch( // отправь экшн с такими данными
postAdded({
id: nanoid(), // сгенирируй
title, // что ввел пользователь
content, // что ввел пользователь
})
)
setTitle('') // сделай пустым состояние тайтл и контент
setContent('')
}
}

20. этот обработчик вешаем кнопке
    <button type="button" onClick={onSavePostClicked}>

Готово! Это показывает полный жизненный цикл потока данных Redux:

- наш список постов прочитал начальный набор постов из стора с помощью useSelector и отобразил и в UI (приложении)
- мы dispatched (отправили) postAdded action, содержащее данные для новой записи в посте
- posts редюсер увидел действие postAdded и обновил массив постов новой записью
- store сообщил UI (приложению) что некоторые данные изменились
- posts list считывает обновленный массив постов и перерисовывается, чтобы показать новое сообщение

Все новые функции, которые мы добавим после этого, будут следовать тем же основным шаблонам, которые мы видели здесь: добавление фрагментов состояния, написание функций-редюсеров, диспетчеризация действий (dispatching actions) и ренгеринг UI (приложения) на основе данных из redux store (хранилища редакс)

Можно проверить redux devtools чтобы увидеть dispatched action (действие, которое мы отправили) и посмотреть, как redux state был обновлен в ответ на этот action. Если мы нажмем на запись "posts/postAdded" в actions list, вкладка action будет выглядеть так:
type(pin):"posts/postAdded"

payload:
id(pin):"3J20alVGBtZ2HSyteH-oA"
title(pin):"м"
content(pin):"м"

И во вкладке state добавятся новые добавленные посты в posts, вкладка diff покажет изменения

Обратите внимание, что в компоненте AddPostForm есть реактовский хук useState для отслеживания значений заголовка и контента, вводимых пользователем. Редакс стор должен содержать только те данные, которые считаются глобальными для приложения. В данном случае только AddPostForm будет необходимо знать о последних значениях полей ввода, поэтому мы хотим сохранить эти данные в состоянии компонента реакт, а не пытаться сохранить в редакс сторе. Когда пользователь завершает работу с формой, мы dispatch the redux action для обновления редакс стора с окончательными значениями на основе пользовательского ввода

!!! Summary

1. Redux state обновляется функциями-редюсерами

- редюсеры всегда высчитывают новое состояние неизменно (immutably), копируя текущие значения состояния и обновляя копии новыми данными
- функция createSlice редакс тулкита создает функции "slice reducer" и позволяет писать "мутирующий" код (mutating), который превращается в безопасные неизменяемые обновления
- эти функции slice reducer добавляются в поле reducer в configureStore и это определяет имена полей данных и состояния в редакс store

2. компоненты реакт считывают данные из store с помощью хука useSelector

- функции селектора (Selector functions) получают полный state объект и должны возвращать значение
- селекторы будут запускаться заново при каждом обновлении хранилища редакс, и если данные, которые они возвращают, изменились, компонент будет перередериваться заново

3. Компоненты реакт dispatch actions (запускают действия) для обновления хранилища используя хук useDispatch

- createSlice генерирует функции action creator для каждого редюсера, который мы добавляем в слайс (срез)
- надо вызывать dispatch(someActionCreator()) в компоненте для отправки действия (to dispatch an action)
- редюсеры будут запущены, проверят, является ли это действие релевантным, а вернут новое состояние, если это необходимо
- временные данные, такие как значения ввода формы должны храниться как состояние компонента реакт. Необходимо отправить действие (dispatch an action) для обновления хранилища, когда пользователь закончит работу с формой

!!! 4. Redux Essentials, Part 4: Using Redux Data

Поскольку у нас есть возможность добавлять новые посты в хранилище редакс, мы можем добавить еще несколько функций, которые используют данные постов различными способами

В настоящее время записи постов отображаются на главной странице ленты, но если текст слишком длинный, мы показываем только выдержку из содержания, было бы полезно смотреть отдельную запись на отдельной странице.

1. нужно создать файл компонент SinglePostPage в папке posts. Мы будем использовать react router для показа этого компонента, когда url страницы выглядит как /posts/123, где часть 123 - должна быть id поста, который мы хотим показать

import React from 'react'
import { useSelector } from 'react-redux'

export const SinglePostPage = ({ match }) => {
const { postId } = match.params

const post = useSelector((state) =>
state.posts.find((post) => post.id === postId)
)

if (!post) {
return (

<section>
<h2>Post not found!</h2>
</section>
)
}

return (

<section>
<article className="post">
<h2>{post.title}</h2>
<p className="post-content">{post.content}</p>
</article>
</section>
)
}

React Router передаст match в качестве пропа, который содержит информацию об URL, которую мы ищем
Когда мы настроим маршрут для рендеринга этого компонента, мы скажем ему распрасить вторую часть URL как переменную с именем postId, и мы сможем прочитать это значение из match.params

Получив значение postId, мы можем использовать его в функции селектора, чтобы найти нужный объект post в хранилище redux. Мы знаем, что state.posts должен быть массивом всех объектов post, поэтому можем использовать функцию Array.find(), чтобы просмотреть массив и вернуть запись post с искомым ID

Важно отметить, что компонент будет перерисовываться каждый раз, когда значение, возвращаемое из useSelector, изменится.

Компоненты всегда должны стараться забирать из хранилища как можно меньшее кол-во данных, которые им нужны, что поможет обеспечить рендеринг только тогда, когда это действительно необходимо

Возможно в хранилище нет подходящей записи поста - возможно пользователь пытается ввести URL напрямую, или у нас нет нужных данных. Если это происходит, функция find() вернет underfined вместо фактического объекта post. Наш компонент должен проверить это и обработать, показав на странице сообщение "Пост не найден"

Если у нас есть нужный объект в хранилище, useSelector вернет его и мы можем его использовать для отображения заголовка и контента поста на странице

Можно заметить, что это выглядит довольно похоже на логику, которую мы имеем в теле компонента <PostsList>, где мы перебираем весь массив постов, чтобы показать выдержки из постов в основной ленте. Мы могли бы попытаться извлечь компонент <Post>, который могли бы использовать в обоих местах, но уже есть некоторые различия в том, как мы показываем выдержку из поста и весь пост. Обычно лучше некоторое время писать отдельно, даже если есть дублирование, а потом решить, достаточно ли похожи разные части кода, чтобы из них можно было извлечь компонент, пригодный для повторного использования

!! Adding the Single Post Route

Теперь, когда у нас есть компонент <SinglePostPage> мы можем определить маршрут для его показа и добавить ссылки на каждое сообщение в ленте основной страницы

2. импортируем SinglePostPage в App.js и добавим в маршрут:

import { SinglePostPage } from './features/posts/SinglePostPage'

<Route exact path="/posts/:postId" component={SinglePostPage} />

3. В файле компоненте <PostsList> обновим логику рендеринга списка, чтобы добавить <Link>, которая ведет на конкретный пост:

импортируем: import { Link } from 'react-router-dom'
добавляем в компонент:

<Link to={`/posts/${post.id}`} className="button muted-button">
View Post
</Link>

4. Поскольку теперь мы можем переходить на другую страницу, было бы полезно иметь ссылку на главную страницу сообщений в компоненте <Navbar>.

Для этого в файле компоненте <Navbar> импортируем: import { Link } from 'react-router-dom'
И вставляем сслыку на главную страницу:

<div className="navLinks">
<Link to="/">Posts</Link>
</div>

Updating Post Entries

5. Было бы полезно добавить возможность редактировать пост после того, как его создали.
   Создадим новый файл компонент <EditPostForm>, который способен принимать id существующего поста, считывать этот пост из стора, позволять пользователю редактировать заголовок и содержание поста, а затем сохранять изменения для обновления поста в хранилище

6. Прежде всего нужно обновить postsSlice, чтобы создать новую функцию редюсер и action, чтобы store знал, как обновлять посты. Внутри вызова createSlice() мы должны добавить новую функцию в объект reducers. Нужно помнить, что имя этого редюсера должно хорошо описывать что происходит, потому что мы увидим, что имя редюсера будет отображаться как часть action type string в Redux DevTools каждый раз, когда это действие будет dispatched (отправлено). Первый редюсер назывался postAdded, второй назовем postUpdated

Чтобы обновить объект post нам нужно знать:

- id обновляемого поста, чтобы мы могли найти нужный объект поста в состоянии
- новые поля заголовка и контента, которые ввел пользователь

Redux action оbjects должны иметь поле type, которое обычно представляет собой описательную строку, а также могут содержать другую информацию о том, что произошло. По соглашению, дополнительную информацию обычно кладут в поле
action.payload и мы можем сами решать, что будет содержать поле payload - это может быть строка, число, объект или массив или что-то другое. В данном случае, поскольку у нас есть три части информации, которая нам нужна, запланируем, что поле payload будет объектом с тремя полями внутри него.
Это означает, что action object будет выглядеть так: {type: 'posts/postUpdated', payload: {id, title, content}}.

По умолчанию action creators, генерируемые createSlice, ожидают что мы передадим один аргумент, и это значение будет помещено в action object как action.payload. Таким образом мы можем передать объект, содержащий эти поля в качестве аргумента postUpdated action creator (создателю действия postUpdated)

Мы также знаем, что редюсер отвечает за определение того, как состояние должно быть обновлено при выполнении действия. Учитывая это, мы должны заставить редюсера найти нужный post object на основе id и обновить поля title & content в этом post.

Наконец нам нужно экспортировать action creator function, которую сгенерировал createSlice, чтобы UI can dispatch the new postUpdated action (пользовательский интерфейс/приложение мог отправлять новое действие postUpdated) когда пользователь сохраняет сообщение

файл postsSlice должен выглядеть так:

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
postAdded(state, action) {
state.push(action.payload)
},
тут! postUpdated(state, action) {
const { id, title, content } = action.payload
const existingPost = state.find(post => post.id === id)
if (existingPost) {
existingPost.title = title
existingPost.content = content
}
}
}
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

! Creating an Edit Post Form

1. Наш компонент <EditPostForm> будет выглядеть похожим на компонент <AddPostForm>, но логика должна быть немного другая.
   Нам нужно получить нужный объект post из хранилища, затем использовать его для инициализации полей состояния в компоненте, чтобы пользователь мог вводить изменения. Мы сохраним змененные значения title и content обратно в хранилище после того, как пользователь закончит работу. Мы также используем API истории React Router (React Router's history API), чтобы переключиться на страницу одного поста и показать этот пост.

Так выглядит компонент <EditPostForm>:
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
const { postId } = match.params

const post = useSelector(state =>
state.posts.find(post => post.id === postId)
)

const [title, setTitle] = useState(post.title)
const [content, setContent] = useState(post.content)

const dispatch = useDispatch()
const history = useHistory()

const onTitleChanged = e => setTitle(e.target.value)
const onContentChanged = e => setContent(e.target.value)

const onSavePostClicked = () => {
if (title && content) {
dispatch(postUpdated({ id: postId, title, content }))
history.push(`/posts/${postId}`)
}
}

return (

<section>
<h2>Edit Post</h2>
<form>
<label htmlFor="postTitle">Post Title:</label>
<input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
<label htmlFor="postContent">Content:</label>
<textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
</form>
<button type="button" onClick={onSavePostClicked}>
Save Post
</button>
</section>
)
}

2. Компонент <EditPostForm> нужно импортировать в Арр и добавить маршрут, который будет рендерить этот компонент с postId в качестве параметра маршрута:

- импортируем в Арр - import { EditPostForm } from './features/posts/EditPostForm'
- добавляем маршрут - <Route exact path="/editPost/:postId" component={EditPostForm} />

3. В компонент с единичным постом <SinglePostPage> добавляем ссылку на компонент <EditPostForm>, чтобы был переход на страницу где можно редактировать

! Preparing Action Payloads

Мы видели, что action creators из createSlice обычно ожидают один аргумент, который становится action.payload. Это упрощает наиболее распространенную схему использования, но иногда нужно проделать больше работы, чтобы подготовить содержимое action objectа(объекта действия). В случае с нашим actionом postAdded нам нужно сгенерировать уникальный id для нового поста и убедиться, что payload - это объект, который имеет вид {id, title, content}

Сейчас мы генерируем id и создаем объект payload в реакт компоненте и передаем его в postAdded. Но что если нам нужно тправлять одно и то же действие из разных компонентов или логика подготовки payload сложна? Придется дублировать эту логику каждый раз, когда мы хотим dispatch an action (отправить действие) и мы вынуждаем компонент точно знать, как должно выглядеть payload для этого действия

Если бы мы писали руками action creator, то поместили бы в него логику настройки:
// hand-written action creator
function postAdded(title, content) {
const id = nanoid()
return {
type: 'posts/postAdded',
payload: { id, title, content }
}
}

Но createSlice редакс тулкита генерирует action creator за нас. Это делает код короче, потому что нам не нужно писать их самим, но все еще нужен способ настроить содержимое action.payload.

К счастью, createSlice позволяет нам определить "prepare callback" function, когда мы пишем редюсер. "prepare callback" function может принимать несколько аргументов, генерировать случайные значения, напр id, и выполнять любую другую синхронную логику, необходимую для принятия решения о том, какие значения войдут в action object (объект действия)
Затем она должен вернуть объект с полем payload внутри. (Возвращаемый объект может также содежрать поле meta, которое можно использовать для добавления дополнительных описательных значений к actionу, и поле error, которое должно представлять собой булево значение, указывающее, представляет ли данное действие каку-либо ошибку)

Внутри поля reducers в createSlice мы можем определить одно из полей как объект, который выглядит как {reducer, prepare}:
const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
postAdded: {
reducer(state, action) {
state.push(action.payload)
},
prepare(title, content) {
return {
payload: {
id: nanoid(),
title,
content
}
}
}
}
// other reducers here
}
})

Теперь наш компонент не должен заботиться о том, как выглядит обеъкт payload - action creator позаботиться о том, чтобы собрать его нужным образом. Поэтому мы можем обновить компонент так, чтобы он отправлял title и content в качестве аргументов when it dispatches postAdded (при отправке postAdded):

features/posts/AddPostForm.js:

const onSavePostClicked = () => {
if (title && content) {
dispatch(postAdded(title, content))
setTitle('')
setContent('')
}
}

!! Users and Posts

Пока у нас был только один слайс состояния. Логика определена в postsSlice.js, данные хранятся в state.posts в store, а все наши компоненты связаны с функцией posts. Реальные приложения будут иметь много slices of state (слайсов состояния) и несколько разных "feature folders" (папок функций) для логики редакс и реакт компонентов

Невозможно создать приложение соц сеть, если в нем не участвуют другие люди. Давайте добавим возможность отслеживать список пользователей в нашем приложении и обновим функциональность, связанную с постами, чтобы использовать эти данные.

! Adding a Users Slice

1. Поскольку концепции users (юзеров) и концепции posts (постов) разные, мы хотим, чтобы код и данные для юзеров были отделены от кода и данных для posts (постов)
   Добавим новую папку features/users и поместим в нее файл usersSlice. Также как и со slice (слайсом/срезом) posts, добавим туда несколько начальных записей, чтобы были данные для работы:

import { createSlice } from '@reduxjs/toolkit'

const initialState = [
{ id: '0', name: 'Tianna Jenkins' },
{ id: '1', name: 'Kevin Grant' },
{ id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
name: 'users',
initialState,
reducers: {}
})

export default usersSlice.reducer

Пока нам не нужно обновлять данные, поэтому оставим поле reducers пустым объектом - вернемся к нему позже

Как и раньше, импортируем usersReducer в файл store и добавим его врутрь:
app/store.js

import usersReducer from '../features/users/usersSlice'

reducer: {
posts: postsReducer,
users: usersReducer // вот тут
}

! Adding Authors for Posts

Каждый пост в нашем приложении был написан одним из наших юзеров, и каждый раз, когда мы добавляем новый пост, мы должны отслежить, кто из юзеров написал этот пост. В реальном приложении у нас будет что-то вроде поля state.currentUser, которое отслеживает текущего вошедшего пользователя и использует эту информацию всякий раз, когда он добавляет сообщение.

Чтобы сделать этот пример проще, мы обновим наш компонент <AddPostForm>, чтобы можно было выбрать пользователя из выпадающего списка, включим его id как часть сообщения. После того, как в post objects появится id пользователя, мы сможем использовать его для поиска имени пользователя и отображения его в каждом отдельном посте в UI (приложении)

Прежде всего нужно обновить postAdded action creator, чтобы он принимал id gользователя в качестве аргумента и включить его в action (действие) (Мы также обновим существующие записи поста в initialState, чтобы поле post.user содержало один из id пользователя из примера)

файл features/posts/postsSlice.js:

prepare(title, content, userId) {
return {
payload: {
id: nanoid(),
title,
content,
user: userId,
},
}
},

Теперь в компоненте <AddPostForm> мы можем прочитать список юзеров из store с помощью хука useSelector и показать в виде dropdown. Затем мы возьмем id выбранного пользователя и передадим его postAdded action creator (создателю действия postAdded). Пока мы здесь, мы можем добавить немного логики валидации в нашу форму, чтобы пользователь мог нажать на "сохранить сообщение" только в том случае, если в поле ввода title и content был введен реальный текст (if the title and content inputs have some actual text in them):
файл - features/posts/AddPostForm.js
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' // добавили импорт useSelector

import { postAdded } from './postsSlice'

export const AddPostForm = () => {
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [userId, setUserId] = useState('') // добавили состояние

const dispatch = useDispatch()

const users = useSelector(state => state.users) // достали из store

const onTitleChanged = e => setTitle(e.target.value)
const onContentChanged = e => setContent(e.target.value)
const onAuthorChanged = e => setUserId(e.target.value) // написали обработчик на кнопку

const onSavePostClicked = () => {
if (title && content) {
dispatch(postAdded(title, content, userId)) // добавили userId
setTitle('')
setContent('')
}
}

const canSave = Boolean(title) && Boolean(content) && Boolean(userId) // добавили проверку, что кнопка сохранить будет активна только если все 3 условия true

const usersOptions = users.map(user => ( // сделали перебор для вывода опций в дропдауне

<option key={user.id} value={user.id}>
{user.name}
</option>
))

return (

<section>
<h2>Add a New Post</h2>
<form>
<label htmlFor="postTitle">Post Title:</label>
<input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
<label htmlFor="postAuthor">Author:</label> // вставили дропдаун с лейблом
<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
<option value=""></option>
{usersOptions}
</select>
<label htmlFor="postContent">Content:</label>
<textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
<button type="button" onClick={onSavePostClicked} disabled={!canSave}> // добавили в кнопку проверку все ли поля заполнены, если нет то -  disabled={!canSave}
Save Post
</button>
</form>
</section>
)
}

Теперь нам нужен способ показать имя автора поста внутри элементов списка постов и в <SinglePostPage>. Поскольку мы хотим показывать одну и ту же информацию в нескольких местах, мы можем сделать компонент PostAuthor, который принимает id пользователя в качестве пропа, ищет нужный user object (объект пользователя) и форматирует имя пользователя(formats the user's name):

файл features/posts/PostAuthor.js

import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
const author = useSelector(state =>
state.users.find(user => user.id === userId)
)

return <span>by {author ? author.name : 'Unknown author'}</span>
}

Обратите внимание, что мы следуем одному и тому что шаблону в каждом из наших компонентов. Любой компонент, которому нужно прочитать данные из хранилища редакс, может использовать хук useSelector и извлечь конкретные фрагменты данных, которые ему нужны. Кроме того, многие компоненты могут одновременно обращаться к одним и тем же данным в хранилище редакс.

Теперь мы можем импортировать компонент PostAuthor в PostsList.js и SinglePostPage.js и отрендерить его как <PostAuthor userId={post.user} /> и каждый раз, когда мы добавляем запись в пост, имя выбранного пользователя должно отображаться в отрисованном посте.

!! More Post Features
! Storing Dates for Posts

Новости соц сетей обычно отсортированы по тому, когда были опубликованы и показывают время создания поста типа "5 часов назад". Чтобы это сделать, надо начать отслеживать поле дата для записей в наших постах

Как и в случае с полем post.user, мы обновим postAdded prepare callback, чтобы убедиться, что post.date всегда включается при отправке (dispatch) action. Но это не еще один параметр, который будет передаваться. Мы всегда хотим использовать точную временную метку с момента отправки действия (when action is dispatched), поэтому мы позволим the prepare callback обрабатывать это самостоятельно

Поскольку мы не можем просто посместить экземпляр класса Date в редакс store, мы будем отслеживать значение post.date как timestamp строку:

      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(), // тут добавили
            title,
            content,
            user: userId,
          },
        }
      },

Как и в случае с авторами постов, нам нужно показать описание относительной временной метки (the relative timestamp description) в компонентах <PostsList> и <SinglePostPage>. Мы создадим компонент <TimeAgo> в папке posts для обработки форматирования строки временной метки в виде относительного описания. Библиотеки типа date-fns имеют несколько полезных функций для разбора и форматирования дат, которые мы можем использовать здесь:

import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
let timeAgo = ''
if (timestamp) {
const date = parseISO(timestamp)
const timePeriod = formatDistanceToNow(date)
timeAgo = `${timePeriod} ago`
}

return (
<span title={timestamp}>
&nbsp; <i>{timeAgo}</i>
</span>
)
}

! Sorting the Posts List

Компонент <PostsList> показывает посты в таком порядке, в котором они хранятся в редакс хранилище. В нашем примере первым идет самый старый пост, и каждый раз, когда мы добавляем новый пост, он добавляется в конец массива posts. Это означает, что самый новый пост всегда находится внизу страницы.

Обычно соц сети первыми показывают самые свежие посты и ты прокручиваешь вниз для более старых постов. Несмотря на то, что в хранилище данные храняться по старшинству, мы можем изменить порядок данных в нашем компоненте <PostsList> так, чтобы самый новый пост был первым. Теоретически, если мы знаем, что массив state.posts уже отсортирован, мы можем просто reverse (сделать в обратном порядке) список. Но для уверенности лучше отсортировать его самостоятельно.

Поскольку array.sort() изменяет существующий массив, нам нужно сделать копию state.posts и отсортировать его копию. Мы знаем, что наши поля post.date хранятся как строки временных меток даты (date timestamp strings), и мы можем напрямую сравнить их, чтобы чтобы отсортировать посты в нужном порядке:

файл features/posts/PostsList.js:

const posts = useSelector((state) => state.posts)

const orderedPosts = posts.slice().sort((a, b) => b.date.localCompare(a.date)) // добавляем

const renderedPosts = orderedPosts.map((post) => ( // меняем posts на orderedPosts

<article className="post-excerpt" key={post.id}>
<h3>{post.title}</h3>
<PostAuthor userId={post.user} />
<p className="post-content">{post.content.substring(0, 100)}</p>
<Link to={`/posts/${post.id}`} className="button muted-button">
View post
</Link>
</article>
))

Нам также нужно добавить поле date в initialState в postsSlice.js. Здесь мы снова используем date-fns, чтобы вычесть минуты из текущей даты/времени, чтобы они отличались друг от друга.

файл features/posts/postsSlice.js:

import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns' // импортируем

const initialState = [
{
// omitted fields
content: 'Hello!',
date: sub(new Date(), { minutes: 10 }).toISOString() // добавляем
},
{
// omitted fields
content: 'More text',
date: sub(new Date(), { minutes: 5 }).toISOString() // добавляем
}
]

!! Post Reaction Buttons

Давайте добавим реакции эмоджи нашим постам. Мы добавим строку с эмоджи реакциями внизу каждого поста в <PostsList> и <SinglePostPage>. Каждый раз, когда пользователь будет нажимать на одну из кнопок реакции, нам нужно будет обновить соответствующее поле счетчика для этого поста в хранилище редакс. Поскольку данные счетчика реакции находятся в хранилище редакс, переключение между различными частями приложения должно последовательно отображать дни и те же значения в любом компоненте, использующем эти данные.

Как и в случае с post authors (авторами постов) и timestamps, мы хотим это использовать везде, где показываем посты, поэтому создадим компонент <ReactionButtons>, который принимает пост в качестве пропа. Для начала мы просто покажем кнопки внутри, с текущим количеством реакций для каждой кнопки:

файл features/posts/ReactionButtons.js:
import React from 'react'

const reactionEmoji = {
thumbsUp: '👍',
hooray: '🎉',
heart: '❤️',
rocket: '🚀',
eyes: '👀'
}

export const ReactionButtons = ({ post }) => {
const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
return (
<button key={name} type="button" className="muted-button reaction-button">
{emoji} {post.reactions[name]}
</button>
)
})

return <div>{reactionButtons}</div>
}

У нас еще нет поля post.reactions в наших данных, поэтому нам нужно будет обновить initialState post objects и postAdded prepare callback function, чтобы убедиться, что в каждом посте есть эти данные, такие как reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}

Теперь нам нужно создать новый редюсер, который будет обрабатывать обновление количества реакций для поста, когда пользователь нажимает кнопку реакции.

Как и при редактировании сообщений, нам нужно знать id сообщения и кнопку реакции, на которую нажал пользователь. action.payload будет объектом, который выглядит как {id, reaction}. Затем редюсер сможет найти нужный post object и обновить нужное поле реакции.

файл postsSlice.js:

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
reactionAdded(state, action) { // добавляем редюсер
const { postId, reaction } = action.payload
const existingPost = state.find(post => post.id === postId)
if (existingPost) {
existingPost.reactions[reaction]++
}
}
// other reducers
}
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions // добавляем в экспорт reactionAdded

createSlice позволяет писать мутирующую логику в наших редюсерах. Если бы мы не использовали createSlice библиотеку Immer, строка existingPost.reactions[reaction]++ действительно мутировала существующий объект post.reactions, и это вероятно вызвало бы ошибки в другом месте нашего приложения, поскольку мы не следовали правилам редюсеров. Но поскольку мы используем createSlice, мы можем написать эту более сложную логику обновления более простым способом и позволить Immer сделать работу по превращению этого кода в безопасное неизменяемое обновление.

Обратите внимание, что наш our action object содержит лишь минимальное кол-во информации, необходимой для описания произошедшего. Мы знаем, какой пост нам нужно обновить, и на каком имени реакции был сделан клик. Мы могли бы вычислить новое значение счетчика реакции и поместить его в action, НО! всегда лучше делать action objects чем меньше, тем лучше, а вычисления для обновления состояния выполнять в редюсере. Это также означает, что редюсеры могут содержать столько логики, сколько необходимо для вычисления нового состояния.

Наш последний шаг - обновить компонент <ReactionButtons> to dispatch the reactionAdded action, когда пользователь нажимает на реакцию:

файл features/posts/ReactionButtons.jsx:

import React from 'react'
import { useDispatch } from 'react-redux' // импортируем

import { reactionAdded } from './postsSlice' // импортируем

const reactionEmoji = {
thumbsUp: '👍',
hooray: '🎉',
heart: '❤️',
rocket: '🚀',
eyes: '👀'
}

export const ReactionButtons = ({ post }) => {
const dispatch = useDispatch() // запускаем

const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
return (
<button
key={name}
type="button"
className="muted-button reaction-button"
onClick={() => // вешаем обработчик
dispatch(reactionAdded({ postId: post.id, reaction: name }))
} >
{emoji} {post.reactions[name]}
</button>
)
})

return <div>{reactionButtons}</div>
}

Теперь каждый раз, когда мы нажимаем кнопку реакции, счетчик должен увеличиваться. Если мы перейдем в разные части приложения, мы должны увидеть правильные значения счетчика, отображаемые каждый раз, когда мы смотрим на это сообщение, даже если мы нажмем кнопку реакции в <PostsList>, а затем посмотрим сообщение само по себе на <SinglePostPage>.

!!! Summary

1. Каждый реакт компонент может использовать данные из хранилища редакс, когда необходимо

- любой компонент может прочитать ЛЮБЫЕ данные, которые находятся в хранилище редакс
- несколько компонентов могут считывать один и те же данные даже в одно и то же время
- компоненты должны извлекать наименьшее кол-во данных, необходимых для их рендеринга
- компоненты могут комбинировать значения из пропсов, состояния и хранилища редакс, чтобы определить, какой UI им нужно отрендерить. Они могут считывать несколько частей данных из хранилища и изменять их форму, необходимую для отображения.
- любой компонент может dispatch actions для обновления состояния

2. Redux action creators могут prepare action objects (готовить объекты действий) с нужным содержимым
