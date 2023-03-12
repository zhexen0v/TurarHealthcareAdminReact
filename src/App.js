import SidebarLink from './components/sidebarLink/sidebarLink';
import GeneralPage from './pages/generalPage/GeneralPage';

import './App.scss';

function App() {
     return (
          <div className="main__wrapper">
               <div className="main__sidebar">
                    <SidebarLink link="/general" name="Общая информация"/>
               </div>
               <div className="main__content">
                    <GeneralPage/>
               </div>
          </div>
     )
}

export default App;
