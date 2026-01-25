import { useSelector } from "react-redux";

export default function Orders() {
  const orders = useSelector(state => state.orders.orders);
  const user = useSelector(state => state.auth.user);

  return (
    <div className="container mt-4 fade-in">
      <h3>My Orders</h3>
      {orders.filter(o => o.user === user.email).map(o => (
        <div key={o.id} className="card p-3 mb-2">
          <p>ID: {o.id}</p>
          <p>Status: {o.status}</p>
          <ul>{o.timeline.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}