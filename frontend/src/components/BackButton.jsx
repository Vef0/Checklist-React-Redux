import {FaChevronCircleLeft} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const BackButton = ({url}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
      <FaChevronCircleLeft/> Atras
    </Link>
  );
};

export default BackButton;