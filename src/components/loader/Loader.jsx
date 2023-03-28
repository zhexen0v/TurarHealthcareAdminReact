import './loader.scss';

const Loader = ({height}) => {
     return (
          <div className="spinner-container" style={{'height': `${height}px`}}>
            <div className="loading-spinner">
            </div>
          </div>
        );
}

export default Loader;