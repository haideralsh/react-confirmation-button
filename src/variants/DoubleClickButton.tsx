import React from 'react'
import { useMachine } from '@xstate/react'
import doubleClickMachine, { State } from './machine'
import { Flex } from './components'

const DoubleClickButton = () => {
  const [state, send] = useMachine(doubleClickMachine)

  const handleClick = () => send('CLICK')

  const handleMouseEnter = () => send('HOVER')

  const handleMouseLeave = () => send('LEAVE')

  const props = {
    ...state.meta[`double-click-confirmation-button.${state.value}`].props,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <Flex justifyContent="flex-start">
      {React.createElement(
        // @todo: This is an *absolutely* filthy hack to get the meta associated
        // to the state object
        state.meta[`double-click-confirmation-button.${state.value}`].component,
        {
          ...props,
        },
      )}
    </Flex>
  )
}

export default DoubleClickButton
