import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="container mt-4 fade-in">
      <div className="card p-3">
        <h3>Profile</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Addresses: {user.addresses.length}</p>
      </div>
    </div>
  );
}