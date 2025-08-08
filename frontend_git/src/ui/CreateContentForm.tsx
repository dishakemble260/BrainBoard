import axios from "axios";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";

export const CreateContentForm = ({ contentId }: { contentId?: string }) => {
  const token = localStorage.getItem("token");
  const [currentTag, setCurrentTag] = useState("");
  const [formData, setFormData] = useState<{
    type: string;
    title: string;
    link: string;
    tags: string[];
  }>({
    type: "",
    title: "",
    link: "",
    tags: [],
  });

  useEffect(() => {
    const fetchContent = async () => {
      if (contentId) {
        console.log(`http://localhost:8000/api/v1/content/id/${contentId}`);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/content/id/${contentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const { type, title, link, tags } = response.data;
          setFormData({
            type: type || "",
            title: title || "",
            link: link || "",
            tags: tags || [],
          });
        } catch (error) {
          console.log(error);
          alert("Failed to load content");
        }
      }
    };
    fetchContent();
  }, [contentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    const finalTags = [...formData.tags];
    const trimmedTag = currentTag.trim();

    if (trimmedTag && !finalTags.includes(trimmedTag)){
      finalTags.push(trimmedTag);
    }

    const finalFormData = {
      ...formData,
      tags: finalTags,
    }

    console.log(finalFormData);
    try {
      if (contentId) {
        // Edit existing content
        await axios.put(
          `http://localhost:8000/api/v1/content/${contentId}`,
          finalFormData ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Content updated successfully");
  window.location.reload();
      } else {
        await axios.post("http://localhost:8000/api/v1/content", finalFormData , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Content added successfully");
          window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add content");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {contentId ? "Edit Content" : "Add New Content"}
      </h2>
      <div className="flex flex-col space-y-4">
        <select
          name="type"
          onChange={handleChange}
          value={formData.type}
          className={`
    border border-gray-300 rounded-lg px-4 py-2 focus:outline focus:outline-[#A084E8] 
    ${formData.type ? "text-black" : "text-gray-500"}
  `}
        >
          <option value="" className="p-1">
            Select content platform{" "}
          </option>
          <option value="youtube">Youtube</option>
          <option value="linkedin">Linkedin</option>
          <option value="twitter/x">Twitter/X</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="Enter title of your content"
          onChange={handleChange}
          value={formData.title}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline focus:outline-[#A084E8]"
        />
        <input
          type="url"
          name="link"
          placeholder="Enter URL"
          onChange={handleChange}
          value={formData.link}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline focus:outline-[#A084E8]"
        />
        {/* Tag Input Field */}
        <input
          type="text"
          placeholder="Enter tag and press Enter"
          onChange={(e)=> setCurrentTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const tag = currentTag.trim();
              if (tag && !formData.tags.includes(tag)) {
                setFormData((prevData) => ({
                  ...prevData,
                  tags: [...prevData.tags, tag],
                }));
              }
              setCurrentTag("");
            }
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline focus:outline-[#A084E8]"
        />

        {/* Tag Display */}
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#A084E8] text-white px-3 py-1 rounded-full flex items-center space-x-2"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    tags: prevData.tags.filter((_, i) => i !== index),
                  }));
                }}
                className="ml-2 text-white hover:text-red-200 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <Button
          variant="primary"
          size="md"
          text={contentId ? "Update Content" : "Add New Content"}
          startIcon={<PlusIcon />}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
