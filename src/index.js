import { applyMiddleware, createStore } from 'redux'
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions'
import { rootReducer } from './redux/rootReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import './styles.css'

const counter = document.getElementById('counter'),
    addBtn = document.getElementById('add'),
    subBtn = document.getElementById('sub'),
    asyncBtn = document.getElementById('async'),
    themeBtn = document.getElementById('theme')

// function logger(state) {
//     return function(next) {
//         return function(action) {
//             console.log('prev state:', state.getState())
//             console.log('action:', action)
//             const newState = next(action)
//             console.log('new state:', state.getState())
//             return newState
//         }
//     }
// }

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)

addBtn.addEventListener('click', () => {
   store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    //document.body.classList.toggle('dark')

    const newTheme = document.body.classList.contains('light') 
    ? 'dark'
    : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})

store.dispatch({type: 'INIT_APPLICATION'})