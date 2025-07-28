import { useEffect, useState } from "react"
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import axios from "axios"

const Home = () => {
    const url = import.meta.env.VITE_API_URL;
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
        const response = await axios.get(url)
        setBlogs(response.data.data)
    }
    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <>
            <Navbar />
            <div className="flex flex-wrap">
                {blogs.map((blog) => (
                    <Card key={blog._id} blog={blog} />
                ))}
            </div>
        </>
    )
}

export default Home