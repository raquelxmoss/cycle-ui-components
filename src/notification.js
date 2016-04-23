import { div, button, p } from '@cycle/dom'
import { Observable } from 'rx'

export default function Notification(sources) {
  const dismiss$ = sources.DOM
    .select('.dismiss')
    .events('click')
    .map(_ => true)

  const vtree$ = sources.props.map(props =>
    div('.notification', { className: props.type }, [
      p('.message', props.message),
      button('.dismiss', 'X')
    ])
  )

  return {
    DOM: vtree$,
    dismiss: dismiss$
  }
}

