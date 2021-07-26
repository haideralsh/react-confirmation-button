import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 6px 32px;
  border: none;
  border-radius: 4px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 13.3333px;
`

export const IntitialButton = styled(Button)`
  background-color: ${p => (p.hovered ? '#bbc2c7' : '#cbd1d5')};
`

export const ClickedButton = styled(Button)`
  background-color: ${p => (p.hovered ? '#dd6164' : '#f57778')};
`

export const ConfirmedLabel = styled.span`
  font-size: 13.3333px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

export const Tooltip = styled.span`
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

// @todo: dirty abstraction
export const Flex = styled.div<any>`
  display: flex;
  flex-direction: ${p => p.direction};
  align-items: ${p => p.alignItems};
  justify-content: ${p => p.justifyContent};
`

const ConfirmationTooltip = () => <Tooltip>Click again to confirm</Tooltip>

export const ClickedButtonWithTooltip = (props: any) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    timeout = setTimeout(() => {
      setShowTooltip(true)
    }, 250)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Flex direction="column" alignItems="center">
      <ClickedButton {...props} />
      {showTooltip && <ConfirmationTooltip />}
    </Flex>
  )
}
