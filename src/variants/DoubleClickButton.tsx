import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

enum State {
  Initial,
  InitialHovered,
  Clicked,
  ClickedHovered,
  Confirmed,
}

const Button = styled.button`
  padding: 6px 32px;
  border: none;
  border-radius: 4px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 13.3333px;
`

const IntitialButton = styled(Button)`
  background-color: #cbd1d5;
`

const IntitialButtonHovered = styled(Button)`
  background-color: #bbc2c7;
`

const ClickedButton = styled(Button)`
  background-color: #f57778;
`

const ClickedButtonHovered = styled(Button)`
  background-color: #dd6164;
`

const ConfirmedLabel = styled.span`
  font-size: 13.3333px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

const ConfirmationTooltip = styled.span`
  position: relative;
  background: #ffdd80;
  border-radius: 3px;
  padding: 0.3em 0.6em;
  margin-top: 2px;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.4em solid transparent;
    border-bottom-color: #ffdd80;
    border-top: 0;
    margin-left: -0.4em;
    margin-top: -0.4em;
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const ClickedButtonWithTooltip = (props: any) => {
  return (
    <Flex>
      <ClickedButton {...props} />
      <ConfirmationTooltip>Click again to confirm</ConfirmationTooltip>
    </Flex>
  )
}

const ClickedButtonHoveredWithTooltip = (props: any) => {
  return (
    <Flex>
      <ClickedButtonHovered {...props} />
      <ConfirmationTooltip>Click again to confirm</ConfirmationTooltip>
    </Flex>
  )
}

const map: Record<State, any> = {
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
  const [message, setMessage] = useState(map[State.Initial].message)

  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    setMessage(map[state].message)
  }, [state])

  useEffect(() => {
    switch (state) {
      case State.InitialHovered:
      case State.ClickedHovered:
        clearTimeout(timeout)
        break

      case State.Clicked:
        timeout = setTimeout(() => {
          setState(State.Initial)
        }, 2000 * 60)
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

  console.log(state)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {React.createElement(map[state].component, {
        ...props,
      })}
    </div>
  )
}

export default DoubleClickButton
