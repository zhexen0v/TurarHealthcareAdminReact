import './submitBlock.scss';

const SubmitBlock = ({message, paddingDisable}) => {
     return (
          <div 
               className="field__block-submit"
               style={paddingDisable && {'padding': '0'}}>
               <input 
                    type="submit" 
                    value="Сохранить" 
                    className="field__submit"/>
               <h5>{message}</h5>
          </div>
     )
}

export default SubmitBlock;