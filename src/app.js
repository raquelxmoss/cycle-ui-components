import { div, button } from '@cycle/dom'
import { Observable } from 'rx'

import Notification from './notification'

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

  const props$ = Observable.of({
    message: 'hello',
    type: 'danger'
  })

  const notification = Notification({props: props$})

  return {
    DOM: state$.map(state =>
      div('.container',[
          state.notification ? notification.DOM : null,
          button('.trigger-notification', 'Click me')
        ]
      )
    )
  };
}
