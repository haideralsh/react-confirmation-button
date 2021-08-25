import { createMachine } from 'xstate'
import {
  ClickedButton,
  ClickedButtonWithTooltip,
  ConfirmedLabel,
  IntitialButton,
} from './components'

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

export default createMachine<Context, Event, State>({
  id: 'double-click-confirmation-button',
  initial: 'idle',
  states: {
    idle: {
      on: {
        HOVER: 'hovered',
      },
      meta: {
        component: IntitialButton,
        props: { children: 'Refund $42.00' },
      },
    },
    hovered: {
      meta: {
        component: IntitialButton,
        props: { children: 'Refund $42.00', hovered: true },
      },
      on: {
        CLICK: 'clickedAndHovered',
        LEAVE: 'idle',
      },
    },
    clicked: {
      meta: {
        component: ClickedButton,
        props: { children: 'Refund $42.00', hovered: true },
      },
      after: {
        250: { target: 'clickedWithTooltip' },
      },
      on: {
        HOVER: { target: 'clickedAndHovered' },
      },
    },
    clickedAndHovered: {
      meta: {
        component: ClickedButton,
        props: { children: 'Refund $42.00', hovered: true },
      },
      after: {
        250: { target: 'clickedAndHoveredWithTooltip' },
      },
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clicked',
      },
    },
    clickedWithTooltip: {
      meta: {
        component: ClickedButtonWithTooltip,
        props: { children: 'Refund $42.00' },
      },
      after: {
        1500: { target: 'idle' },
      },
      on: {
        HOVER: { target: 'clickedAndHoveredWithTooltip' },
      },
    },
    clickedAndHoveredWithTooltip: {
      meta: {
        component: ClickedButtonWithTooltip,
        props: { children: 'Refund $42.00', hovered: true },
      },
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clickedWithTooltip',
      },
    },
    confirmed: {
      meta: {
        component: ConfirmedLabel,
        props: { children: 'Successfully Refunded $42.00' },
      },
      type: 'final',
    },
  },
})
