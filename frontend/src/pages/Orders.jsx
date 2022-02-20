import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getOrders, reset} from '../features/orders/orderSlice';
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import OrderItem from "../components/OrderItem";

function Orders(props) {
  const {orders, isLoading, isSuccess} = useSelector(
    state => state.orders);

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if(isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/'/>
      <h1>Ordenes</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Fecha</div>
          <div>Numero de orden</div>
          <div>Estado</div>
          <div></div>
        </div>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order}/>
        ))}
      </div>
    </>
  );
}

export default Orders;