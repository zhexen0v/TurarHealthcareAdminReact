import './submitBlock.scss';

const SubmitBlock = ({message}) => {
     return (
          <div className="field__block-submit">
               <input 
                    type="submit" 
                    value="Сохранить" 
                    className="field__submit"/>
               <h5>{message}</h5>
          </div>
     )
}

export default SubmitBlock;