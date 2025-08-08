import { Outlet } from "react-router-dom";

import { TweetIcon } from "./icons/tweetIcon";
import { YoutubeIcon } from "./icons/youtubeIcon";

import { SideBar } from "../ui/SideBar";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { HomeIcon } from "./icons/HomeIcon";

export const DashboardLayout = () => {
  const links = [
    {
      startIcon: <HomeIcon />,
      text: "Home",
      linkTo: "/content",
    },
    {
      startIcon: <TweetIcon />,
      text: "Tweets",
      linkTo: "/links/tweets",
    },
    {
      startIcon: <YoutubeIcon />,
      text: "Youtube",
      linkTo: "/links/youtube",
    },
    {
      startIcon: <LinkedinIcon />,
      text: "Linkedin",
      linkTo: "/links/linkedin",
    },
  ];

  return (
    <div className="flex flex-row h-screen w-screen bg-[#393E46]">
      <SideBar width="sm" name="BrainBoard" links={links} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
