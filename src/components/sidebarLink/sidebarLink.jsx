import { Link } from 'react-router-dom';

import './sidebarLink.scss';


const SidebarLink = ({link, name}) => {
     return (
          <Link to={link} className="main__link">
               <div className="main__link-border"></div>
               {name}
          </Link>
     )
}

export default SidebarLink;