import React, { CSSProperties } from 'react'
import { useMachine } from '@xstate/react'
import doubleClickMachine, { State } from './machine'
import { Flex } from './components'

// {
//   meta: {
//     component: IntitialButton,
//     props: { children: 'Refund $42.00' },
//   },
//   meta: {
//     component: IntitialButton,
//     props: { children: 'Refund $42.00', hovered: true },
//   },
//   meta: {
//     component: ClickedButton,
//     props: { children: 'Refund $42.00', hovered: true },
//   },
//   meta: {
//     component: ClickedButton,
//     props: { children: 'Refund $42.00', hovered: true },
//   },
//   meta: {
//     component: ClickedButtonWithTooltip,
//     props: { children: 'Refund $42.00' },
//   },
//   meta: {
//     component: ClickedButtonWithTooltip,
//     props: { children: 'Refund $42.00', hovered: true },
//   },
//   meta: {
//     component: ConfirmedLabel,
//     props: { children: 'Successfully Refunded $42.00' },
//   }
// }

type Config = {
  text: string
  css: CSSProperties
  className: string
}

type WithoutTooltip = {
  withTooltip: false
}

type WithTooltip = {
  withTooltip: true
  tooltipDelay: number
  config: { tooltip: Config }
  components: { clickedButtonWithTooltip: JSX.Element }
}

type Tooltip = WithTooltip | WithoutTooltip

type Props = {
  resetDelay: number
  onConfirm: Function
  config: {
    intitialButton: Config
    clickedButton: Config
  }
  components: {
    intitialButton: JSX.Element // find a better name
    clickedButton: JSX.Element
  }
} & Tooltip

const DoubleClickButton: React.FC<Props> = props => {
  const [state, send] = useMachine(doubleClickMachine, {
    delays: {
      RESET_DELAY: props.resetDelay,
      ...(props.withTooltip && { TOOLTIP_DELAY: props.tooltipDelay }),
    },
    context: {
      withTooltip: props.withTooltip,
    },
  })

  const handleClick = () => send('CLICK')
  const handleMouseEnter = () => send('HOVER')
  const handleMouseLeave = () => send('LEAVE')

  const passedProps = {
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
