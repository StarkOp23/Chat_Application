import React from 'react'

const MessageSelf = () => {
    var props2 = { name: "You", message: "Simple message" }
    return (
        <div className='self-message-container'>
            <div className='messageBox'>
                <p>{props2.message}</p>
                <p className='self-timeStamp'>12.00 am</p>
            </div>
        </div>
    )
}

export default MessageSelf
