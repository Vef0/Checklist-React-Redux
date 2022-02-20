import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from '../features/auth/authSlice'

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>Proyecto Ordenes</Link>
        </div>
        <ul>
          {user
            ? (
              <li>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt/> Cerrar sesión - {user.name}
                </button>
              </li>
            )
            : (
              <>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt/>
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <FaUser/>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
        </ul>
      </header>
    </div>
  );
}

export default Header;