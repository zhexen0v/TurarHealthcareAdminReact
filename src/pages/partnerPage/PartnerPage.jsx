import { useState, useEffect } from "react";

import axios from '../../services/backendService';
import PartnerItem from "../../components/partnerItem/PartnerItem";

import './partnerPage.scss';

const PartnerPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [partners, setPartners] = useState([]);
     const [addedOrDeleted, setAddedOrDeleted] = useState(false);
     useEffect(() => {
          setAddedOrDeleted(false);
          axios.get('/partners')
               .then(res => setPartners(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, [addedOrDeleted]);
     return (
          <div className="partner">
               <h3 className="section__title">Партнеры</h3>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
                         <div className="partner__grid">
                              <PartnerItem
                                   key={1}
                                   setAddedOrDeleted={setAddedOrDeleted}
                                   id={"1"}
                                   image={null}
                                   ruTitle=""
                                   kzTitle=""
                                   enTitle=""
                                   create={true}
                                   />
                              {
                                   partners.map(obj => (
                                        <PartnerItem
                                             key={obj._id}
                                             setAddedOrDeleted={setAddedOrDeleted}
                                             id={obj._id}
                                             image={obj.imageUrl}
                                             ruTitle={obj.ruTitle}
                                             kzTitle={obj.kzTitle}
                                             enTitle={obj.enTitle}
                                             create={false}
                                             />
                                   ))
                              }
                         </div>
                    )
               }
          </div>
     )
}

export default PartnerPage;