import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import {createOrder, reset} from '../features/orders/orderSlice'
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewOrder() {
  const {user} = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.orders)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('Teclado')
  const [description, setDescription] = useState('')
  const [nro_orden, setNro_orden] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/orders')
    }
    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createOrder({product, description, nro_orden}))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <BackButton url='/'/>

      <section className='heading'>
        <h1>Cree una nueva orden</h1>
        <p>Por favor llene todos los campos de abajo</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor="name">Nombre del trabajador</label>
          <input type="text" className='form-control' value={name} disabled={true}/>
        </div>

        <div className='form-group'>
          <label htmlFor="email">Email del trabajador</label>
          <input type="text" className='form-control' value={email} disabled={true}/>
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor="product">Productos</label>
            <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
              <option value="Teclado">Teclado</option>
              <option value="Mouse">Mouse</option>
              <option value="Monitor">Monitor</option>
              <option value="Impresora">Impresora</option>
              <option value="Notebook">Notebook</option>
              <option value="Celular">Celular</option>
              <option value="Tablet">Tablet</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor="description">Descripcion de la orden</label>
            <input
              name="description"
              id="description"
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="nro_orden">Numero de la orden</label>
            <input
              name="nro_orden"
              id="nro_orden"
              className='form-control'
              placeholder='Numero de la orden'
              value={nro_orden}
              onChange={(e) => setNro_orden(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>
              Enviar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewOrder;