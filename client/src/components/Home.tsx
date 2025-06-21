import { useEffect, useState } from "react"
import axios from "axios"
import { ContentCard } from "./ContentCard"
import type { contentProps } from "./ContentCard"
interface resProps {
    message: string,
    contents: contentProps[],
    success: boolean
}

export const Home = () => {
    const [contents, Setcontents] = useState<contentProps[]>([])
    const [ShowMsg , SetShowMsg]  = useState<string>("")
    useEffect(() => {
        const fecthData = async () => {
            // const token = localStorage.getItem("token")
            const res = await axios.get<resProps>("http://localhost:3003/users/api/content", {
                headers: {
                  authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUwNTI0N2E1NmNjMGUxNjA0MmY0ODgiLCJpYXQiOjE3NTA0ODU1OTMsImV4cCI6MTc1MDQ4OTE5M30.yvgl5beZChINpPJwMQJeiSAmT-beQxLL2WEzw8no5DA"
                }
            })
            Setcontents(res.data.contents)
        }
        fecthData()
    }, [])

async function DeleteProps(id: string) {
  try {
    const res = await axios.delete(`http://localhost:3003/users/api/content/${id}`, {
      headers: {
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUwNTI0N2E1NmNjMGUxNjA0MmY0ODgiLCJpYXQiOjE3NTA0ODU1OTMsImV4cCI6MTc1MDQ4OTE5M30.yvgl5beZChINpPJwMQJeiSAmT-beQxLL2WEzw8no5DA"
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
            <div className="flex flex-row m-4 items-center gap-4 ">
                {contents?.map((content) => {
                    return <ContentCard OnDeleteFun={DeleteProps} content={content}/>
                })}
            </div>
        </>
    )
}