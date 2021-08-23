import React from 'react'
import { useMachine } from '@xstate/react'
import doubleClickMachine, { State } from './machine'
import {
  ConfirmedLabel,
  IntitialButton,
  ClickedButtonWithTooltip,
  Flex,
  ClickedButton,
} from './components'

const stateContent: Record<State['value'], { component: any; props: any }> = {
  idle: {
    component: IntitialButton,
    props: { children: 'Refund $42.00' },
  },
  hovered: {
    component: IntitialButton,
    props: { children: 'Refund $42.00', hovered: true },
  },
  clicked: {
    component: ClickedButton,
    props: { children: 'Refund $42.00', hovered: true },
  },
  clickedWithTooltip: {
    component: ClickedButtonWithTooltip,
    props: { children: 'Refund $42.00' },
  },
  clickedAndHovered: {
    component: ClickedButton,
    props: { children: 'Refund $42.00', hovered: true },
  },
  clickedAndHoveredWithTooltip: {
    component: ClickedButtonWithTooltip,
    props: { children: 'Refund $42.00', hovered: true },
  },
  confirmed: {
    component: ConfirmedLabel,
    props: { children: 'Successfully Refunded $42.00' },
  },
}

const DoubleClickButton = () => {
  const [state, send] = useMachine(doubleClickMachine)

  const handleClick = () => send('CLICK')

  const handleMouseEnter = () => send('HOVER')

  const handleMouseLeave = () => send('LEAVE')

  const props = {
    ...stateContent[state.value as keyof typeof stateContent].props,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <Flex justifyContent="flex-start">
      {React.createElement(
        stateContent[state.value as keyof typeof stateContent].component,
        {
          ...props,
        },
      )}
    </Flex>
  )
}

export default DoubleClickButton
