import React from 'react'

const ErrorComponent = ({ error }) => {
    console.log(error)
    const {info} =  error.originalError
    console.log(info)
    return (
        <div>
            <h2>{info.name}</h2>
            <div>
                {info.message} at line {info.lineNumber}
            </div>
        </div>
    )
}

export default ErrorComponent