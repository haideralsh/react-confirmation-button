import React, { useState, useEffect } from 'react'
import {
  ConfirmedLabel,
  IntitialButton,
  IntitialButtonHovered,
  ClickedButtonHoveredWithTooltip,
  ClickedButtonWithTooltip,
  Flex,
} from './components'

enum State {
  Initial,
  InitialHovered,
  Clicked,
  ClickedHovered,
  Confirmed,
}

const stateContent: Record<State, { component: any; message: string }> = {
  [State.Initial]: {
    component: IntitialButton,
    message: 'Refund $42.00',
  },
  [State.InitialHovered]: {
    component: IntitialButtonHovered,
    message: 'Refund $42.00',
  },
  [State.Clicked]: {
    component: ClickedButtonWithTooltip,
    message: 'Refund $42.00',
  },
  [State.ClickedHovered]: {
    component: ClickedButtonHoveredWithTooltip,
    message: 'Refund $42.00',
  },
  [State.Confirmed]: {
    component: ConfirmedLabel,
    message: 'Successfully Refunded $42.00',
  },
}

const DoubleClickButton = () => {
  const [state, setState] = useState(State.Initial)
  const [message, setMessage] = useState(stateContent[State.Initial].message)

  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    setMessage(stateContent[state].message)
  }, [state])

  useEffect(() => {
    switch (state) {
      case State.Clicked:
        timeout = setTimeout(() => {
          setState(State.Initial)
        }, 1500)
        break

      case State.InitialHovered:
      case State.ClickedHovered:
        clearTimeout(timeout)
        break
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [state])

  const handleClick = () => {
    switch (state) {
      case State.Initial:
      case State.InitialHovered:
        setState(State.ClickedHovered)
        break

      case State.Clicked:
      case State.ClickedHovered:
        setState(State.Confirmed)
        break
    }
  }

  const handleMouseEnter = () => {
    switch (state) {
      case State.Initial:
        setState(State.InitialHovered)
        break

      case State.Clicked:
        setState(State.ClickedHovered)
        break
    }
  }

  const handleMouseLeave = () => {
    switch (state) {
      case State.InitialHovered:
        setState(State.Initial)
        break

      case State.ClickedHovered:
        setState(State.Clicked)
        break
    }
  }

  const props = {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    children: message,
  }

  return (
    <Flex justifyContent="flex-start">
      {React.createElement(stateContent[state].component, {
        ...props,
      })}
    </Flex>
  )
}

export default DoubleClickButton
