import React from 'react'
import { useHistory } from 'react-router-dom'

const Zelda = ({ href, children , ...rest}) => { 
    const history = useHistory()
    const handleClick = () => history.push(href)
    return (<a href='#' onClick={handleClick} {...rest}>{children}</a>)
}

export default Zelda