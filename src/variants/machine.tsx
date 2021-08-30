import { createMachine } from 'xstate'

// Helper Types
type StateContext<T> = { value: T; context: Context }
type EventType<T> = { type: T }

// Machine Types
type Context = {}

export type State =
  | StateContext<'idle'>
  | StateContext<'hovered'>
  | StateContext<'clicked'>
  | StateContext<'clickedWithTooltip'>
  | StateContext<'clickedAndHovered'>
  | StateContext<'clickedAndHoveredWithTooltip'>
  | StateContext<'confirmed'>

type Event = EventType<'HOVER'> | EventType<'LEAVE'> | EventType<'CLICK'>

const TOOLTIP_DELAY = 250
const RESET_DELAY = 1500

export default createMachine<Context, Event, State>({
  id: 'double-click-confirmation-button',
  initial: 'idle',
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
      after: {
        RESET_DELAY: { target: 'clickedWithTooltip' },
      },
      on: {
        HOVER: { target: 'clickedAndHovered' },
      },
    },
    clickedAndHovered: {
      after: {
        TOOLTIP_DELAY: { target: 'clickedAndHoveredWithTooltip' },
      },
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clicked',
      },
    },
    clickedWithTooltip: {
      after: {
        RESET_DELAY: { target: 'idle' },
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
      type: 'final',
    },
  },
})
