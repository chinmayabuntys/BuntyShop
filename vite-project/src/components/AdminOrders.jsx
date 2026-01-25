import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../store/orderSlice";

export default function AdminOrders() {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4 fade-in">
      <h3>Admin Orders</h3>
      {orders.map(o => (
        <div key={o.id} className="card p-3 mb-2">
          <p>User: {o.user}</p>
          <p>Status: {o.status}</p>
          {o.status !== "Delivered" && (
            <button className="btn btn-success"
              onClick={() => dispatch(updateOrderStatus(o.id))}>
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}