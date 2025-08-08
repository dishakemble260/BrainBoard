import type { ReactElement } from "react";
import brainboard from "../assets/brainboard.png";
import { LogoutIcon } from "./icons/LogoutIcon";

interface SidebarProps {
  width: "sm" | "md",
  name?: string,
links: Array<{
  startIcon: ReactElement;
  text: string;
  linkTo: string;
}>;

}

export const SideBar = (props: SidebarProps) => {

  const baseClass =
    "flex flex-col justify-start items-start h-[100vh] bg-[#222831] pl-8 py-4 rounded-xl";

  const widthClass = {
    sm: "w-[16%]",
    md: "w-[30%]"
  };

  const linkClass = "flex flex-row justify-start items-center py-2 px-4 rounded-xl text-white mb-2 hover:bg-[#393E46] "

  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <div className={`${baseClass} ${widthClass[props.width]}`}>

      {/* header */}
      <div className="flex flex-row justify-center items-center mb-8  ">
        <img src={brainboard} alt="BrainBoard Logo" className="w-12" />
        <div className="font-semibold text-md text-white">{props.name}</div>
      </div>  

    {/* content */}
      <div>
        {props.links.map((link,index)=>(
          <a
          key={index}
          href={link.linkTo}
          className={linkClass}
          >
            {link.startIcon}
            <span className="ml-2">{link.text}</span>
          </a>
        ))}
      </div>

    {/* footer */}
    <div className="mt-auto">
        {/* add user details here */}
         <a
          href="/"
          onClick={handleLogout}
          className={linkClass}
          >
            <LogoutIcon/>
            <span className="ml-2">Logout</span>
          </a>
    </div>
    </div>
  );
};
