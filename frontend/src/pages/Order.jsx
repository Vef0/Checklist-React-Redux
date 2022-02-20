import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getOrder, reset, closeOrder} from '../features/orders/orderSlice';
import {getNotes, createNote, reset as notesReset} from "../features/notes/noteSlice";
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Modal from 'react-modal';
import {FaPlus} from 'react-icons/fa';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root');

function Order() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const {order, isLoading, isSuccess, isError, message}
    = useSelector(
    state => state.orders
  );

  const {notes, isLoading: notesIsLoading}
    = useSelector(
    state => state.notes
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orderId} = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getOrder(orderId))
    dispatch(getNotes(orderId))
    // eslint-disable-next-line
  }, [isError, message, orderId]);

  // Close order
  const onOrderClose = () => {
    dispatch(closeOrder(orderId))
    toast.success('Orden terminada correctamente');
    navigate('/orders');
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, orderId}))
    closeModal()
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner/>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/orders'/>
        <h2>
          Order ID: {order._id}
          <span className={`status status-${order.status}`}>
            {order.status}
          </span>
        </h2>
        <h3>Fecha inscrita: {new Date(order.createdAt).toLocaleString('en-US')}</h3>
        <h3>Producto: {order.product}</h3>
        <hr/>
        <div className="ticket-desc">
          <h3>Descripcion</h3>
          <p>{order.description}</p>
        </div>
        <div className="ticket-desc">
          <h3>Numero de orden</h3>
          <p>{order.nro_orden}</p>
        </div>
        <h2>Notas</h2>
      </header>

      {order.status !== 'closed' && (
        <button onClick={openModal} className="btn"><FaPlus/> Agregar nota</button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Agregar nota'>
        <h2>Agregue nota</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <input
              type="text"
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Nota de texto'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note}/>
      ))}

      {order.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onOrderClose}>
          Cerrar orden
        </button>
      )}
    </div>
  );
}

export default Order;