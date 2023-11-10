import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  depositAccount,
  loanAccount,
  payLoanAccount,
  withdrawAccount,
} from "./sliceAccountRedux";
import { formatCurrency } from "./BalanceDisplay";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const dispatch = useDispatch();
  const { account } = useSelector((store) => store);

  function handleDeposit() {
    dispatch(depositAccount(depositAmount));
  }

  function handleWithdrawal() {
    dispatch(withdrawAccount(withdrawalAmount));
  }

  function handleRequestLoan() {
    dispatch(loanAccount(loanAmount, loanPurpose));
  }

  function handlePayLoan() {
    dispatch(payLoanAccount());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>Pay back {formatCurrency(account.loan, currency)}</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
