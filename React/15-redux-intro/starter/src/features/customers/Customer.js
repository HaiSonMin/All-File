import { useSelector } from "react-redux";

function Customer() {
  const store = useSelector((store) => store);
  const { customer, account } = store;
  console.log("store:::", store);
  console.log("customer:::", customer);
  console.log("account:::", account);
  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
