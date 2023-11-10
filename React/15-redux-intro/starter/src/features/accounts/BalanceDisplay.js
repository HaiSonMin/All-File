import { useSelector } from "react-redux";

export function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
  }).format(value);
}

function BalanceDisplay() {
  const { account } = useSelector((store) => store);
  return <div className="balance">{formatCurrency(account.balance)}</div>;
}

export default BalanceDisplay;
