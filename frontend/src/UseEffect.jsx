import { useEffect, useState } from "react"

export default function UseEffect(){
    const [like, setLike] = useState(0)
    const increaseLike = () => {
        setLike(like + 1)
    }
    useEffect(()=>{
        // Logic to update like nos. into backend
    }, [like])
    return(
        <>
            <h1>Hello UseEffect</h1>
            <h2>Likes: {like}</h2>
            <button onClick={increaseLike}>Like Me</button>
        </>
    )
}