import { createMachine } from 'xstate'

// Helper Types
type StateContext<T> = { value: T; context: Context }
type EventType<T> = { type: T }

interface Context {
  component?: any
  props?: {
    children?: string
    hovered?: boolean
  }
}

export type State =
  | StateContext<'idle'>
  | StateContext<'hovered'>
  | StateContext<'clicked'>
  | StateContext<'clickedWithTooltip'>
  | StateContext<'clickedAndHovered'>
  | StateContext<'clickedAndHoveredWithTooltip'>
  | StateContext<'confirmed'>

type Event = EventType<'HOVER'> | EventType<'LEAVE'> | EventType<'CLICK'>

export default createMachine<Context, Event, State>({
  id: 'double-click-confirmation-button',
  initial: 'idle',

  // Context is unused for now
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
        HOVER: {
          target: 'hovered',
        },
      },
    },
    hovered: {
      on: {
        CLICK: 'clickedAndHovered',
        LEAVE: 'idle',
      },
    },
    clicked: {
      after: {
        250: { target: 'clickedWithTooltip' },
      },
      on: {
        HOVER: { target: 'clickedAndHovered' },
      },
    },
    clickedAndHovered: {
      after: {
        250: { target: 'clickedAndHoveredWithTooltip' },
      },
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clicked',
      },
    },
    clickedWithTooltip: {
      after: {
        1500: { target: 'idle' },
      },
      on: {
        HOVER: { target: 'clickedAndHoveredWithTooltip' },
      },
    },
    clickedAndHoveredWithTooltip: {
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clickedWithTooltip',
      },
    },
    confirmed: {
      // Nothing to do
    },
  },
})
