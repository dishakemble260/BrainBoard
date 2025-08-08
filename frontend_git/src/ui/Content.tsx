import { useParams } from "react-router-dom";
import { LinkCard } from "./LinkCard";
import { NavBar } from "./NavBar";
import { CreateContentModal } from "./CreateContentModal";
import { useState, useEffect } from "react";
import axios from "axios";

export const Content = () => {
  interface ContentItem {
    _id:string,
    type:string,
    title:string,
    link:string,
    tags?: string[]
  }
  const [content, setContent] = useState<ContentItem[]>([]);
  const token = localStorage.getItem('token');
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const { page } = useParams();

  const pageTitleMap: Record<string, string> = {
    tweets: "Twitter/X Links",
    youtube: "Youtube Links",
    linkedin: "Linkedin Links",
    // fallback
    default: "All Links",
  };

  const pageTitle = pageTitleMap[page || ""] || pageTitleMap.default;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const url =
        page && page !== "undefined"
          ? `http://localhost:8000/api/v1/content/${page}`
          : `http://localhost:8000/api/v1/content`;
     
        const response = await axios.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContent(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, [page]);


  const addContent = () => {
    SetIsModalOpen(true);
  };

  return (
    <div className="py-4 px-8">

      <CreateContentModal
        open={isModalOpen}
        onClose={() => SetIsModalOpen(false)}
      />

      <NavBar title={pageTitle} onAddContent={addContent} />
      <div className="flex justify-left gap-4 items-center flex-wrap">
        {content.map((link) => (
          <div key={link._id}>
          <LinkCard
          contentId={link._id}
            type={link.type}
            link={link.link}
            title={link.title}
            tags={link.tags}
          />
          </div>

        ))}
      </div>
    </div>
  );
};
