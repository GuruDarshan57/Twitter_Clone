import React from 'react'

const page = ({ params }) => {
    return (
        <div className="w-full flex flex-col">{params.id}</div>
    )
}

export default page