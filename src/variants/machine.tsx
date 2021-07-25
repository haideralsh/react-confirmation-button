import { createMachine } from 'xstate'

const doubleClickMachine = createMachine({
  id: 'doubleClick',
  initial: 'initial',
  states: {
    initial: {
      on: {
        HOVER: 'initialHovered',
      },
    },
    initialHovered: {
      on: {
        CLICK: 'clickedHovered',
        LEAVE: 'initial',
      },
    },
    clicked: {
      on: {
        HOVER: 'clickedHovered',
      },
    },
    clickedHovered: {
      on: {
        CLICK: 'confirmed',
        LEAVE: 'clicked',
      },
    },
    confirmed: {
      on: {
        // Nothing to see here
      },
    },
  },
})

export default doubleClickMachine
