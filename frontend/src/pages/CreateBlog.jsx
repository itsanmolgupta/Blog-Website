import Navbar from "../components/Navbar"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function CreateBlog() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        title : "",
        subtitle : "",
        image : "",
        description : ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name] : name === "image" ? e.target.files[0] : value
        })
    }

    const createBlog = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:3000/blog", data, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(response.status === 200){
            alert("Blog Created Successfully!")
            navigate("/")
        }else{
            alert("Something went wrong!")
        }
    }

    return (
        <>
            <Navbar />
            <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
                <div className="mt-10 text-center font-bold">Wanna Create a Blog?</div>
                <div className="mt-3 text-center text-4xl font-bold">Create Blog</div>
                <form onSubmit={createBlog}>
                    <div className="p-8">
                    <div className="flex gap-4">
                        <input type="text" name="title" className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Title *" onChange={handleChange} />
                        <input type="text" name="subtitle" className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Subtitle *" onChange={handleChange} />
                    </div>
                    <div className="my-6 flex gap-4">
                        <input type="file" name="image" className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" onChange={handleChange}/>
                    </div>
                    <div>
                        <p className="text-gray-700 py-2">Description*</p>
                        <textarea name="description" id="description" cols="30" rows="10" className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-500" onChange={handleChange}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="block w-full cursor-pointer rounded-lg bg-blue-700 px-8 py-5  text-sm font-semibold text-white">Create Blog</button>
                    </div>
                </div>
                </form>
                
            </div>
        </>
    )
}
export default CreateBlog