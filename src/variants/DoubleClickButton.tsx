import React, { useState, useEffect } from 'react'
import {
  ConfirmedLabel,
  IntitialButton,
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

const stateContent: Record<State, { component: any; props: any }> = {
  [State.Initial]: {
    component: IntitialButton,
    props: { children: 'Refund $42.00' },
  },
  [State.InitialHovered]: {
    component: IntitialButton,
    props: { children: 'Refund $42.00', hovered: true },
  },
  [State.Clicked]: {
    component: ClickedButtonWithTooltip,
    props: { children: 'Refund $42.00' },
  },
  [State.ClickedHovered]: {
    component: ClickedButtonWithTooltip,
    props: { children: 'Refund $42.00', hovered: true },
  },
  [State.Confirmed]: {
    component: ConfirmedLabel,
    props: { children: 'Successfully Refunded $42.00' },
  },
}

const delay = 1500

const DoubleClickButton = () => {
  const [state, setState] = useState(State.Initial)

  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    switch (state) {
      case State.Clicked:
        timeout = setTimeout(() => {
          setState(State.Initial)
        }, delay)
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
    ...stateContent[state].props,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
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
