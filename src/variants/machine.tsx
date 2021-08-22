import { createMachine } from 'xstate'

interface Context {
  component?: any
  props?: {
    children?: string
    hovered?: boolean
  }
}

type Event = { type: 'HOVER' } | { type: 'LEAVE' } | { type: 'CLICK' }

type State =
  | 'idle'
  | 'hovered'
  | 'clicked'
  | 'clickedWithTooltip'
  | 'clickedAndHovered'
  | 'clickedAndHoveredWithTooltip'
  | 'confirmed'

export default createMachine({
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

// @todo: take a look at this: https://xstate.js.org/docs/guides/interpretation.html#interpreter
// and this: https://xstate.js.org/docs/guides/delays.html#delay-expressions
// for handling timeouts
