import { div, button, p } from '@cycle/dom'
import { Observable } from 'rx'

export default function Notification(sources) {
  const vtree$ = sources.props.map(props =>
    div('.notification', [
      p('.message', props.message),
      p(props.type)
    ])
  )

  return {
    DOM: vtree$
  }
}

