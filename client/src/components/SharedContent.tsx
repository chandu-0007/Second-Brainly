import { useEffect, useState } from "react";
import axios from "axios";
import { ContentCard } from "./ContentCard";
import type { ContentProps } from "./ContentCard";

const token = localStorage.getItem("token");

export const SharedContent = () => {
  const [contents, setContents] = useState<ContentProps[]>([]);
  const [msg, setMsg] = useState<{
    text: string;
    type: "success" | "error" | "";
    visible: boolean;
  }>({
    text: "",
    type: "",
    visible: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/users/content/share`, {
          headers: { authorization: token },
        });
        setContents(res.data.contents);
      } catch (error) {
        showMessage("Failed to load content", "error");
      }
    };

    fetchData();
  },); 

  const showMessage = (text: string, type: "success" | "error") => {
    setMsg({ text, type, visible: true });
    setTimeout(() => setMsg((prev) => ({ ...prev, visible: false })), 3000);
  };

  function deleteContent(){
    
  }

  return (
    <div className="relative m-4">
      <div className="flex flex-wrap gap-4">
        {contents.map((content) => (
          <ContentCard 
            key={content._id}
            content={content}
            onDelete={deleteContent}
          />
        ))}
      </div>

      {/* Toast Message */}
      {msg.visible && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md ${
            msg.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {msg.text}
        </div>
      )}
    </div>
  );
};
