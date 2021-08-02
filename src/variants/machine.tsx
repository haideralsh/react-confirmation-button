import { createMachine } from 'xstate'

interface Context {
  component?: any
  props?: {
    children?: string
    hovered?: boolean
  }
}

type EventType<S> = { type: S }

type Event =
  | EventType<'HOVER'>
  | EventType<'LEAVE'>
  | EventType<'CLICK'>
  | EventType<'RESET'> // Something feels wrong about this uninvocable event

type StateContext<S, T = {}> = { value: S; context: Context & T }

type State =
  | StateContext<'idle', { props: { hovered: false } }>
  | StateContext<'hovered', { props: { hovered: true } }>
  | StateContext<'clicked', { props: { hovered: false } }>
  | StateContext<'clickedAndHovered', { props: { hovered: true } }>
  | StateContext<'confirmed'>

export default createMachine<Context, Event, State>({
  id: 'Double Click Confirmation Button',
  initial: 'idle',
  context: {
    component: undefined,
    props: {
      children: '',
      hovered: undefined,
    },
  },
  states: {
    idle: {
      on: {
        HOVER: 'hovered',
      },
    },
    hovered: {
      on: {
        CLICK: 'clickedAndHovered',
        LEAVE: 'idle',
      },
    },
    clicked: {
      on: {
        HOVER: 'clickedAndHovered',
        RESET: 'idle',
      },
    },
    clickedAndHovered: {
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clicked',
      },
    },
    confirmed: {
      // Nothing to do
    },
  },
})
