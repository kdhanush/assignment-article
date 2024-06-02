import React from 'react'
import './styles.scss'

interface Props {
    text: string,
    customClassname?: string,
    handleClick?: () => void,
}


const Button: React.FC<Props> = ({text,customClassname, handleClick}) => {
  return (
    <button className= {`button-wrap ${customClassname}`} onClick={handleClick}>
      {text}
    </button>
  )
}

export default Button