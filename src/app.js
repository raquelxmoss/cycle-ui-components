import { div, button } from '@cycle/dom'
import isolate from '@cycle/isolate'
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
  const props$ = Observable.of({
    message: 'This is a notification',
    type: 'danger'
  })

  let DangerNotification = isolate(Notification, 'danger')
  let notification = DangerNotification({props: props$, DOM})

  const click$ = DOM
    .select('.trigger-notification')
    .events('click')

  const action$ = Observable.merge(
    click$.map(_ => toggleNotification),
    notification.dismiss.map(_ => toggleNotification)
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
          state.notification ? notification.DOM : null,
          button('.trigger-notification', 'Click me')
        ]
      )
    )
  };
}
