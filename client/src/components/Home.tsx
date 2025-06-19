import { useEffect, useState } from "react"
import axios from "axios"
type contentProps = {
    id: string,
    link: string,
    type: string,
    title:string,
    tags: string[],
    description : string , 
    userId: string
}
interface resProps {
    message : string , 
    contents : contentProps[],
    success :boolean
}
export const Home = () => {
    const [contents, Setcontents] = useState<contentProps[]>([])
    useEffect(() => {
        const fecthData = async() => {
            // const token = localStorage.getItem("token")
            const res = await  axios.get<resProps>("http://localhost:3003/users/api/content",{
                headers: {
                    authorization :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUwNTI0N2E1NmNjMGUxNjA0MmY0ODgiLCJpYXQiOjE3NTAzNTQ3OTksImV4cCI6MTc1MDM1ODM5OX0.h31KxIWzXhbWBq5EedIYMAeKcThXMcQ9PpN5tdpeEQE"
                }
            })   
            Setcontents(res.data.contents)
            console.log(contents)
        }
      fecthData()
    },[])
    type tagsType = {tags :string[] }
    const TagsComponent = ( props : tagsType )=>{
        const tags = props.tags ; 
        return <div>{tags.map( tag => {
            return <div className="bg-indigo-100 flex gap-1 rounded-3xl w-auto h-auto p-1  text-indigo-500 ">
                <span>#</span>
                {tag}
            </div>
        })}</div>
    }

    return (
        <>
        <div className="flex flex-row m-4 items-center gap-4 ">
                 {contents?.map((content) =>{
                    return <div key={content.id} className="bg-white flex inline-biock  rounded-md flex-col shadow-2xl p-4 w-60   
                     text-black  ">
                        <span className="text-lg font-bold ">{content.title}</span>
                        <span>{content.description}</span>
                        <span>{`type : ${content.type}`}</span>
                        <TagsComponent tags={content.tags}></TagsComponent>
                        <span>{`By: ${content.userId}`}</span>
                        </div>
                 })}
        </div>
        </>
    )
}