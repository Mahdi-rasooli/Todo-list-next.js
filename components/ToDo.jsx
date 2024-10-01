import React from 'react'

const ToDo = ({ title, description, complete, id, mongoId, deleteToDo, CompleteToDo }) => {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id + 1}
            </th>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
                {description}
            </td>
            <td className="px-6 py-4">
                {complete ? "Completed" : "Pending"}
            </td>
            <td className="px-6 py-4 flex gap-2">
                    <button  onClick={() => deleteToDo(mongoId)} className='bg-red-500 py-2 px-4 text-white'>Delete</button> 
                    {complete ? `` 
                              : <button onClick={() => CompleteToDo(mongoId)} className='bg-green-500 py-2 px-4 text-white'>Done</button>}
            </td>
        </tr>
    )
}

export default ToDo