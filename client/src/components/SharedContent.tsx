import { useEffect, useState } from "react";
import axios from "axios";
import { ContentCard } from "./ContentCard";
import type { ContentProps } from "./ContentCard";

const token = localStorage.getItem("token");

export const SharedContent = () => {
  
  // const [contents, setContents] = useState<ContentProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/users/content/share`, {
          headers: { authorization: token },
        });
        console.log(res.data);
      } catch (error) {
        alert("Failed to load content");
      }
    };

    fetchData();
  },); 


  return (
    <>shared content</>
  );
};
