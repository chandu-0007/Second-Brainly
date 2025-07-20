import { ShareIcon } from "../Icons/ShareIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { TweetsIcon } from "../Icons/TweetsIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { VedioIcon } from "../Icons/VedioIcon";
import { LinkIcon } from "../Icons/LInkIcon";
import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";

export interface ContentProps {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: string[];
  Description: string;
  userId: string;
  shareBy?:string;
}

interface CardProps {
  content: ContentProps;
  onDelete: (id: string) => void;
}

type ContentType = "youtube" | "document" | "link" | "tweet";

const startIcon: Record<ContentType, React.FC> = {
  youtube: VedioIcon,
  document: DocumentIcon,
  link: LinkIcon,
  tweet: TweetsIcon,
};

const TagsComponent = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap mt-2">
    {tags.map((tag) => (
      <div
        key={tag}
        className="bg-indigo-100 px-2 m-1 flex gap-1 rounded-3xl h-6 text-indigo-500 text-sm items-center"
      >
        <span>#</span>
        {tag}
      </div>
    ))}
  </div>
);

export const ContentCard = ({ content, onDelete }: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [username, setUsername] = useState("");
  const [showMsg, setShowMsg] = useState({
    message: "",
    show: false,
    success: false,
  });

  const typeKey = content.type as ContentType;
  const IconComponent = startIcon[typeKey] || DocumentIcon;

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(content._id);
    setShowModal(false);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  async function shareContent() {
  if (!username || username.trim() === "") {
    setShowMsg({
      message: "Username is required to share.",
      show: true,
      success: false,
    });
    return;
  }
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
  "http://localhost:3003/users/content/share",
  {
    shareTo: username,
    contentId: content._id,
  },
  {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }
);
    const data = res.data;
    if (data) {
      setShowMsg({
        message: data.message,
        show: true,
        success: data.success,
      });
    }
  } catch (error: any) {
    console.error(error);

    // if server gives error details, show them:
    if (error.response?.data?.message) {
      setShowMsg({
        message: error.response.data.message,
        show: true,
        success: false,
      });
    } else {
      setShowMsg({
        message: "Something went wrong while sharing.",
        show: true,
        success: false,
      });
    }
  }
}
  return (
    <>
      <div className="bg-white flex flex-col rounded-md shadow-2xl p-4 w-70 h-max-50 text-black">
        <div className="flex justify-between items-center mb-2">
          <a href={content.link} target="_blank" rel="noopener noreferrer">
            {IconComponent && <IconComponent />}
          </a>
          <span className="text-lg font-bold truncate">{content.title}</span>
          <div className="flex gap-2 h-6">
            <button onClick={handleShareClick} aria-label="Share">
              <ShareIcon />
            </button>
            <button onClick={handleDeleteClick} aria-label="Delete">
              <DeleteIcon />
            </button>
          </div>
        </div>
        <span className="text-sm mb-1">{content.Description}</span>
        <span className="text-xs text-gray-500">{`type: ${content.type}`}</span>
        {content.shareBy && <span>{`shareBy :${content.shareBy}`}</span>}
        <TagsComponent tags={content.tags} />
      </div>

      {/* delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete <strong>{content.title}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* share modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex bg-opacity-80 bg-white items-center justify-center z-50">
          <div className="bg-gray-50 rounded-2xl w-100 flex flex-col p-6 h-50">
            <label className="m-2 text-2xl text-indigo-600 font-semibold">
              Share Content
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter the username here ..."
              className="border rounded-lg p-2 mt-3 border-gray-300 focus:border-blue-500 focus:outline-none text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex gap-2 justify-between mt-6">
              <Button
                varaient="primary"
                size="lg"
                text="Share"
                OnClickHandler={shareContent}
              />
              <Button
                varaient="secondary"
                size="lg"
                text="Cancel"
                OnClickHandler={() => setShowShareModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* user feedback */}
      {showMsg.show && (
        <div
          className={`fixed flex top-4 right-4 p-2 rounded z-50 text-white ${
            showMsg.success ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {showMsg.message}
          <span
            className="px-2 text-white text-xl cursor-pointer  "
            onClick={() => {
              setShowMsg({ message: "", show: false, success: false });
            }}
          >
          <Cancel/>
          </span>
        </div>
      )}
    </>
  );
};


function Cancel(){
  return<>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
  </>
}