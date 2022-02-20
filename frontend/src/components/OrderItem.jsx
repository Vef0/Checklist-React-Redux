import {Link} from 'react-router-dom';

function OrderItem({order}) {
  return (
    <div className='ticket'>
      <div>{new Date(order.createdAt).toLocaleString('en-US')}</div>
      <div>{order.nro_orden}</div>
      <div className={`status status-${order.status}`}>
        {order.status}
      </div>
      <Link to={`/order/${order._id}`} className='btn btn-reverse btn-sm'>
        Ver
      </Link>

    </div>
  );
}

export default OrderItem;