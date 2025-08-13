import { useState } from "react";
import Button from "./Button";
import { DeleteIcon } from "../Icons/DeleteIcon";
import axios from "axios";

interface contentType {
  link: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  OnClickHandler: () => void;
}

export const AddcontentForm = ({ OnClickHandler }: Props) => {
  const [form, setForm] = useState<contentType>({
    link: "",
    type: "",
    title: "",
    description: "",
    tags: [],
  });

  const OnFormFill = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Convert comma-separated tags string to array
    if (name === "tags") {
      const tagArray = value.split(",").map((tag) => tag.trim());
      setForm({ ...form, tags: tagArray });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  async function AddContent() {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const res = await axios.post(
        "https://second-brainly-8343.onrender.com/users/api/content",
        {
          link: form.link,
          type: form.type,
          title: form.title,
          description: form.description,
          tags: form.tags,
        },
        {
          headers: { authorization: token },
        }
      );

      if (res.data.success) {
        alert("successfully addded")
        setForm({
          link: "",
          type: "",
          title: "",
          description: "",
          tags: [],
        })
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="flex gap-2 p-2 flex-col bg-white w-[400px] justify-center">
      <h2 className="flex items-center justify-between rounded-t-2xl bg-indigo-200 font-bold p-2 text-indigo-600">
        Add Content Here
        <button onClick={OnClickHandler}>
          <DeleteIcon />
        </button>
      </h2>

      {/* Title */}
      <label className="text-black font-semibold text-center">Title</label>
      <input
        name="title"
        value={form.title}
        onChange={OnFormFill}
        placeholder="E.g. The passwords are leaked"
        className="rounded-lg border-2 border-indigo-200 shadow-2xl focus:border-indigo-600 focus:outline-none px-2 py-1"
      />

      {/* Type as Select */}
      <label className="text-black font-semibold text-center">Type</label>
      <select
        name="type"
        value={form.type}
        onChange={OnFormFill}
        className="rounded-lg border-2 border-indigo-200 shadow-2xl focus:border-indigo-600 focus:outline-none px-2 py-1"
      >
        <option value="">Select a type</option>
        <option value="tweet">Tweet</option>
        <option value="youtube">YouTube</option>
        <option value="document">Document</option>
        <option value="link">Link</option>
      </select>

      {/* Description */}
      <label className="text-black font-semibold text-center">Description</label>
      <input
        name="description"
        value={form.description}
        onChange={OnFormFill}
        placeholder="About the topic less than 300 words "
        className="rounded-lg border-2 border-indigo-200 shadow-2xl focus:border-indigo-600 focus:outline-none px-2 py-1"
      />

      {/* Link */}
      <label className="text-black font-semibold text-center">Add URL</label>
      <input
        name="link"
        value={form.link}
        onChange={OnFormFill}
        className="rounded-lg border-2 border-indigo-200 shadow-2xl focus:border-indigo-600 focus:outline-none px-2 py-1"
        placeholder="url : https:.. "
      />

      {/* Tags */}
      <label className="text-black font-semibold text-center">Tags</label>
      <input
        name="tags"
        value={form.tags.join(", ")}
        onChange={OnFormFill}
        className="rounded-lg border-2 border-indigo-200 shadow-2xl focus:border-indigo-600 focus:outline-none px-2 py-1"
        placeholder="Education, News..."
      />

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <Button varaient="primary" size="lg" text="ADD" OnClickHandler={AddContent} />
      </div>
    </div>
  );
};
