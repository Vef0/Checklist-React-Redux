import {Link} from 'react-router-dom';
import {FaPlusCircle ,FaTicketAlt} from 'react-icons/fa';

function Home(props) {
  return (
    <>
      <section className="heading">
        <h1>Bienvenido a Proyecto Ordenes</h1>
        <p>Recuerda que, para crear una orden debes estar registrado</p>
      </section>

      <Link to='/new-order' className='btn btn-reverse btn-block'>
        <FaPlusCircle/> Crear nueva orden
      </Link>

      <Link to='/orders' className='btn btn-block'>
        <FaTicketAlt/> Ver las ordenes
      </Link>
    </>
  );
}

export default Home;