"use client"
import ToDo from "@/components/ToDo";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {


  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData({ ...formData, [name]: value })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      const response = await axios.post('/api', formData)
      toast.success(response.data.msg)
      setFormData({
        title: '',
        description: ''
      })
      await fetchData()

    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  const [toDoData,setToDoData] = useState([])

  const fetchData = async () => {

    try {
      const response = await axios.get('/api')
      setToDoData(response.data.data)

    } catch (error) {
      console.log(error);
      toast.error('Error For Getig')
    }
  }

  const deleteToDo = async (id) => {
    try {
      const response = await axios.delete('/api',{
        params:{
          mongoId:id
        }
      })

      toast.success(response.data.msg)
      fetchData()
      
    } catch (error) {
      console.log(error);
    }
  }

  const CompleteToDo = async (id) => {
    try {
      
      const response = await axios.put('/api',{},{
        params:{
          mongoId:id
        }
      })

      toast.success(response.data.msg)
      fetchData()
      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchData()
  },[])


  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col mt-24 gap-2 w-[80%] max-w-[600px] px-2 mx-auto">
        <input value={formData.title} onChange={(event) => onChangeHandler(event)} type="text" name="title" placeholder="Enter the title"
          className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={(event) => onChangeHandler(event)} name="description" placeholder="Enter description"
          className="px-3 py-2 border-2 w-full" />
        <button type="submit" className="bg-orange-600 px-11 py-3 text-white">Add Todo</button>
      </form>


      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {toDoData.map((item,index)=> {
              return <ToDo key={index} title={item.title} 
                                description={item.description} 
                                complete={item.iscompleted} 
                                mongoId={item._id}
                                id={index}
                                deleteToDo={deleteToDo}
                                CompleteToDo={CompleteToDo}/>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
