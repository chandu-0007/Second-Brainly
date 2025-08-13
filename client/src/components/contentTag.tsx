import { useEffect, useState } from "react";
import axios from "axios";
import { ContentCard } from "./ContentCard";
import type { ContentProps } from "./ContentCard";

type ContentsTagProps = {
  tag: string;
};

const token = localStorage.getItem("token");

export const ContentsTag: React.FC<ContentsTagProps> = ({ tag }) => {
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
        const res = await axios.get(`https://second-brainly-8343.onrender.com/users/api/content/tags/${tag}`, {
          headers: { authorization: token },
        });
        setContents(res.data.contents);
      } catch (error) {
        showMessage("Failed to load content", "error");
      }
    };

    fetchData();
  }, [tag]); // include tag in dependency list

  const showMessage = (text: string, type: "success" | "error") => {
    setMsg({ text, type, visible: true });
    setTimeout(() => setMsg((prev) => ({ ...prev, visible: false })), 3000);
  };

  const deleteContent = async (_id: string) => {
    const originalContents = [...contents];
    setContents((prev) => prev.filter((item) => item._id !== _id));

    try {
      const res = await axios.delete(`https://second-brainly-8343.onrender.com/users/api/content/${_id}`, {
        headers: { authorization: token },
      });

      if (!res.data.success) {
        setContents(originalContents);
        showMessage("Deletion failed", "error");
      } else {
        showMessage("Deleted successfully", "success");
      }
    } catch (error) {
      setContents(originalContents);
      showMessage("Error deleting content", "error");
    }
  };
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
