import { div, button } from '@cycle/dom';
import { Observable } from 'rx';

function displayNotification (state) {
  if(!state.notification) { return }

  return (
    div('.notification', 'I\'m a notification')
  )
}

function toggleNotification (state) {
  return Object.assign(
    {},
    state,
    { notification: !state.notification }
  )
}

export default function App ({DOM}) {
  const click$ = DOM
    .select('.trigger-notification')
    .events('click')

  const action$ = Observable.merge(
    click$.map(_ => toggleNotification)
  )

  const initialState = {
    notification: false
  }

  const state$ = action$
    .scan((state, action) => action(state), initialState)
    .startWith(initialState)

  return {
    DOM: state$.map(state =>
      div('.container',[
          displayNotification(state),
          button('.trigger-notification', 'Click me')
        ]
      )
    )
  };
}
