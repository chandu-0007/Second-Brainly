import { useEffect, useState } from "react";
import axios from "axios";
import { ContentCard } from "./ContentCard";
import type { ContentProps } from "./ContentCard";

const token = localStorage.getItem("token");
export const SharedContent = () => {
  const [content , Setcontet] = useState<ContentProps[]>([]) ;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://second-brainly-8343.onrender.com/users/content/share`, {
          headers: { authorization: token },
        });
        console.log(res.data.contents);
        Setcontet(res.data.contents.map((items :any)=>({
           ...items.contentId , 
            shareBy :items.shareBy.username
        })))
        console.log(content)
      } catch (error) {
        alert("Failed to load content");
      }
    };

    fetchData();
  },[]); 

 function deleteContent(){
  console.log("deleting the contents")
 }
  return (
            <div className="relative  m-4">
      <div className="flex flex-wrap snap-y snap-start overflow-auto gap-x-8 gap-y-4">
        {content.map((con) => (
          <ContentCard key={con._id} content={con} onDelete={deleteContent} />
        ))}
      </div>
      </div>
  );
};
