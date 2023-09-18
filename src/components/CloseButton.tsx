import React from 'react'
import { CloseButtonStyle } from './1styles'

interface close {
    onClick: () => void
}

const CloseButton = (props: close) => {
  return (
    <div>
        <CloseButtonStyle onClick={props.onClick}>
            <h1>X</h1>
        </CloseButtonStyle>
    </div>
  )
}

export default CloseButton