import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewBlog(){
    const url = import.meta.env.VITE_API_URL;
    const {id} = useParams()
    const navigate = useNavigate()
    const [blog,setBlog] = useState([])
    const fetchSingleBlog = async() => {
        const response = await axios.get(url + id)
        setBlog(response.data.data)
    }
    const deleteBlog = async() => {
        const response = await axios.delete(url + id)
        if(response.status === 200){
            alert("Blog deleted successfully!")
            navigate("/")
        }
        else{
            alert("Something went wrong!")
        }
    }
    useEffect(()=>{
        fetchSingleBlog()
    },[])
    return(
        <>
        <Navbar />
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={blog.image} alt="Blog Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <Link to={`/edit/${blog._id}`}>
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 cursor-pointer dark:hover:bg-gray-700">Edit Blog</button>
                                </Link>
                            </div>
                            <div className="w-1/2 px-2">
                                <button onClick={deleteBlog} className="w-full bg-gray-200 dark:bg-red-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-600">Delete Blog</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Blog Title</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{blog.title}</p>
                        <h3 className="text-1xl font-bold text-gray-800 dark:text-white mb-2">Blog Subtitle</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{blog.subtitle}</p>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{blog.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}