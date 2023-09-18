import React from 'react'
import { AddProjeto } from './1styles'

interface button {
    onClick: () => void
}

const AddProjetoButton = (props: button) => {
  return (
    <div>
        <AddProjeto onClick={props.onClick}>
            +
        </AddProjeto>
    </div>
  )
}

export default AddProjetoButton