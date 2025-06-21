import { Logo } from "../assets/Logo";
import { DocumentIcon } from "../Icons/DocumentIcon"
import { HasTagIcon } from "../Icons/HasTagIcon"
import { LinkIcon } from "../Icons/LInkIcon"
import { TweetsIcon } from "../Icons/TweetsIcon";
import { VedioIcon } from "../Icons/VedioIcon"
 type OnClickHandler = (value: string) => void;
import { Link } from "react-router-dom";
interface SidebarProps {
  funcall: OnClickHandler;
}
export const SideBar  = ({funcall}:SidebarProps) => {
  return (
  <div className="flex flex-col m-2 px-2 gap-y-4">
     <Link className="text-3xl mt-4 flex gap-x-1.5 font-bold mb-8" to="/courses">
      <Logo/> 
      <span>Second Brain</span>
     </Link>
      <div id="Tweets" onClick={(e)=>funcall(e.currentTarget.id)} className="sidebar-com">
       <TweetsIcon/>
       <span>Tweets</span>
      </div>
      <div id="Videos" onClick={(e)=>funcall(e.currentTarget.id)} className="sidebar-com">
       <VedioIcon/>
       <span>Videos</span>
      </div>
      <div id="Documents" onClick={(e)=>funcall(e.currentTarget.id)} className="sidebar-com">
       <DocumentIcon/>
       <span>Documents</span>
      </div>
      <div id="Links" onClick={(e)=>funcall(e.currentTarget.id)} className="sidebar-com">
       <LinkIcon/>
       <span>LInks</span>
      </div>
      <div id="HashTag" onClick={(e)=>funcall(e.currentTarget.id)} className="sidebar-com">
       <HasTagIcon/> 
      <span>Tags</span>
      </div>
  </div>
  )    
}