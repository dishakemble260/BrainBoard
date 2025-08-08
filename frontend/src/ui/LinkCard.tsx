import { useEffect, useRef, useState } from "react";
import "../App.css";
import { MenuIcon } from "./icons/MenuIcon";
import axios from "axios";
import { CreateContentModal } from "./CreateContentModal";

interface Link {
  contentId: string;
  type: string;
  link: string;
  title: string;
  tags?: Array<string>;
}

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => Promise<void>;
      };
    };
  }
}

export const LinkCard = (props: Link) => {
    const token = localStorage.getItem('token');
  const { contentId, type, link, title, tags } = props;

  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true)
  };

  const handleDelete = () => {
    console.log(`http://localhost:8000/api/v1/content/${contentId}`);
    try {
      axios.delete(`http://localhost:8000/api/v1/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  let linkCode = "";
  let xLinkCode = "";
  let linkedinCode = "";

  if (type === "youtube") {
    const match = link.match(/v=([^&]+)/);
    if (match) {
      linkCode = match[1];
    }
  } else if (type === "twitter/x") {
    const match = link.match(/x\.com\/(.+)/);
    if (match) {
      xLinkCode = match[1];
    }
  } else if (type === "linkedin") {
    const match = link.split(".com/");
    if (match) {
      linkedinCode = match[1];
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (type === "twitter/x" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load().then(() => {
        setIsLoading(false);
      });
    } else {
      // fallback loader timeout for other content
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [type]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    // <a href={link} target="_blank" rel="noopener noreferrer">
    <div>
      {isModalOpen && (
        <CreateContentModal         
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        contentId={contentId}
        />
      )}
      <div
        className={`flex flex-col justify-between p-2 h-60 w-60 mt-4 bg-[#222831]
          text-white rounded-xl border-1 transition-transform duration-200 transform 
          hover:scale-105 hover:shadow-lg relative`}
      >
        <div className="flex flex-col justify-between h-full mb-2 mt-2 overflow-auto custom-scrollbar">
          <div className="flex justify-between w-full mb-2">
            <h2 className="font-semibold text-sm">{title}</h2>
            <div className="relative" ref={menuRef}>
              <button
                className="hover:text-[#A084E8] cursor-pointer"
                onClick={toggleMenu}
              >
                <MenuIcon />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md z-10 w-24">
                  <button
                    onClick={() => {
                      handleEdit();
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#E5D9F2] rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#E5D9F2] rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skeleton Loader */}
          {isLoading && (
            <div className="skeleton-loader w-full h-48 rounded-md mb-2"></div>
          )}

          {/* YouTube */}
          {type === "youtube" && linkCode && (
            <iframe
              className={`w-full ${isLoading ? "hidden" : ""}`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${linkCode}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={handleIframeLoad}
            ></iframe>
          )}

          {/* Twitter/X */}
          {type === "twitter/x" && xLinkCode && (
            <div
              className={`w-full overflow-scroll custom-scrollbar ${
                isLoading ? "hidden" : ""
              }`}
            >
              <blockquote className="twitter-tweet" data-width="100%">
                <a href={`https://twitter.com/${xLinkCode}`}>
                  Click to view on Twitter
                </a>
              </blockquote>
            </div>
          )}

          {/* LinkedIn */}
          {type === "linkedin" && linkedinCode && (
            <div
              className={`w-full mb-8 ${isLoading ? "hidden" : ""}`}
              style={{ minHeight: "180px", position: "relative" }}
            >
              <div
                style={{
                  transform: "scale(0.7)",
                  transformOrigin: "top left",
                  width: "143%", // 1 / 0.7
                  height: "200px", // adjust as needed
                  cursor: "pointer",
                }}
              >
                <iframe
                  src={`https://www.linkedin.com/embed/${linkedinCode}?collapsed=1`}
                  width="100%"
                  height="300"
                  title="Embedded post"
                  onLoad={handleIframeLoad}
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          )}

          <div className="flex flex-row flex-wrap justify-start items-center">
            {tags &&
              tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-[#6F61C0] rounded-full mr-2 mt-2 py-0.5 px-1.5 text-white text-xs"
                >
                  #{tag}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
