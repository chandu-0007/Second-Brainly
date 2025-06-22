import { useEffect, useState } from "react"
import axios from "axios"
import { ContentCard } from "./ContentCard"
import type { contentProps } from "./ContentCard"
interface resProps {
    message: string,
    contents: contentProps[],
    success: boolean
}
const token = localStorage.getItem("token")
export const Home = () => {
    const [contents, Setcontents] = useState<contentProps[]>([])
    const [ShowMsg , SetShowMsg]  = useState<string>("")
    useEffect(() => {
        const fecthData = async () => {
            const res = await axios.get<resProps>("http://localhost:3003/users/api/content", {
                headers: {
                  authorization:token
                }
            })
            Setcontents(res.data.contents)
        }
        fecthData()
    }, [])
 useEffect(() => {
  if (ShowMsg) {
    const timeout = setTimeout(() => SetShowMsg("112"), 3000);
    return () => clearTimeout(timeout);
  }
}, [ShowMsg]);

async function DeleteProps(id: string) {
  try {
    const res = await axios.delete(`http://localhost:3003/users/api/content/${id}`, {
      headers: {
          authorization:token 
      }
    });

    if (res.data?.success) {
      SetShowMsg("Successfully deleted");
    } else {
      SetShowMsg("Failed to delete");
    }

  } catch (error) {
    console.error("Delete error:", error);
    SetShowMsg("An error occurred while deleting");
  }
}

    
    return (
        <>
            <div className="flex flex-row m-4 items-center gap-4  relative">
                {contents?.map((content) => {
                    return <ContentCard OnDeleteFun={DeleteProps} content={content}/>
                })}
               {ShowMsg != "" && <div className=" absolute  top-0 right-0  w-60 h-8 bg-red-400 border text-black ">{ShowMsg}</div> } 
            </div>
        </>
    )
}