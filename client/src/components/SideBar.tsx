import { Logo } from "../assets/Logo";
import { DocumentIcon } from "../Icons/DocumentIcon"
import { HasTagIcon } from "../Icons/HasTagIcon"
import { LinkIcon } from "../Icons/LInkIcon"
import { TweetsIcon } from "../Icons/TweetsIcon";
import { VedioIcon } from "../Icons/VedioIcon"
import { Link } from "react-router-dom";
export const SideBar  =  ()=> {

  return (
  <div className="flex flex-col m-2 px-2 gap-y-4">
     <Link className="text-3xl mt-4 flex gap-x-1.5 font-bold mb-8" to="/courses">
      {Logo(32, 32)}
      <span>Second Brain</span>
     </Link>
      <Link id="Tweets" to="/content/tweets" className="sidebar-com">
       <TweetsIcon/>
       <span>Tweets</span>
      </Link>
      <Link id="Videos" to="/content/youtube" className="sidebar-com">
       <VedioIcon/>
       <span>Videos</span>
      </Link>
      <Link id="Documents" to="/content/documents" className="sidebar-com">
       <DocumentIcon/>
       <span>Documents</span>
      </Link>
      <Link id="Links" to="/content/link" className="sidebar-com">
       <LinkIcon/>
       <span>LInks</span>
      </Link>
      
  </div>
  )    
}
