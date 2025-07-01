import { ShareIcon } from "../Icons/ShareIcon"
import { DeleteIcon } from "../Icons/DeleteIcon"
import { TweetsIcon } from "../Icons/TweetsIcon"
import { DocumentIcon } from "../Icons/DocumentIcon"
import { VedioIcon } from "../Icons/VedioIcon"
import { LinkIcon } from "../Icons/LInkIcon"
import React, { useState } from "react";
export interface contentProps {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: string[];
  Description: string;
  userId: string;
}

interface cardPorps {
  content: contentProps;
  OnDeleteFun: (id: string) => void;
}

type ContentType = "youtube" | "document" | "link" | "tweet";

const starticon: Record<ContentType, React.FC> = {
  youtube: VedioIcon,
  document: DocumentIcon,
  link: LinkIcon,
  tweet: TweetsIcon,
};

const TagsComponent = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap mt-2">
    {tags.map((tag, index) => (
      <div
        key={index}
        className="bg-indigo-100 px-2 m-1 flex gap-1 rounded-3xl h-6 text-indigo-500 text-sm items-center"
      >
        <span>#</span>
        {tag}
      </div>
    ))}
  </div>
);

export const ContentCard = ({ content, OnDeleteFun}: cardPorps) => {
  const [showModal, setShowModal] = useState(false);

  const typeKey = content.type.toLowerCase().trim() as ContentType;
  const IconComponent = starticon[typeKey];

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    OnDeleteFun(content._id);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white flex  rounded-md flex-col shadow-2xl p-4 w-70 h-max-50 text-black">
        <div className="flex justify-between items-center mb-2">
          <a href={content.link} target="_blank">
            {IconComponent && <IconComponent />}
          </a>
          <span className="text-lg font-bold truncate">{content.title}</span>
          <div className="flex gap-2 h-6 cursor-pointer">
            <span>
              <ShareIcon />
            </span>
            <span onClick={handleDeleteClick}>
              <DeleteIcon />
            </span>
          </div>
        </div>
        <span className="text-sm mb-1">{content.Description}</span>
        <span className="text-xs text-gray-500">{`type: ${content.type}`}</span>
        <TagsComponent tags={content.tags} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{content.title}</strong>?</p>
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
    </>
  );
};
