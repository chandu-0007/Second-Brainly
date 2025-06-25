import { useEffect, useState } from "react";
import axios from "axios";
import { ContentCard } from "./ContentCard";
import type { contentProps } from "./ContentCard";

const token = localStorage.getItem("token");

export const Home = () => {
  const [contents, setContents] = useState<contentProps[]>([]);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" | ""; visible: boolean }>({
    text: "",
    type: "",
    visible: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3003/users/api/content", {
          headers: { authorization: token },
        });
        setContents(res.data.contents);
      } catch (error) {
        showMessage("Failed to load content", "error");
      }
    };

    fetchData();
  }, []);

  const showMessage = (text: string, type: "success" | "error") => {
    setMsg({ text, type, visible: true });
    setTimeout(() => setMsg((prev) => ({ ...prev, visible: false })), 3000);
  };

  const deleteContent = async (_id: string) => {
    const originalContents = [...contents];
    // Optimistically update UI
    setContents((prev) => prev.filter((item) => item._id !== _id));

    try {
      const res = await axios.delete(`http://localhost:3003/users/api/content/${_id}`, {
        headers: { authorization: token },
        data: {},
      });

      if (!res.data.success) {
        // Rollback if deletion failed
        setContents(originalContents);
        showMessage("Deletion failed", "error");
      } else {
        showMessage("Deleted successfully", "success");
      }
    } catch (error) {
      // Rollback on error
      setContents(originalContents);
      showMessage("Error deleting content", "error");
    }
  };

  return (
    <div className="relative m-4">
      <div className="flex flex-wrap gap-4">
        {contents.map((content) => (
          <ContentCard key={content._id} content={content} OnDeleteFun={deleteContent} />
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

