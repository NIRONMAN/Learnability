
import React from 'react'

type Props = {
    title:string,
    placeholder:string,
    type:string
}

const LableComponent = ({title,placeholder,type}: Props) => {
  return (
<div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
            {title}
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type={type} placeholder={placeholder} />
      </div>  )
}

export default LableComponent