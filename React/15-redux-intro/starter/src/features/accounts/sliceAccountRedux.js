const initializeAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
  error: "",
};

function accountDispatch(type, payload) {
  return { type, payload };
}

export default function accountReducer(state = initializeAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (state.balance < action.payload) {
        alert("Insufficient balance");
        return state;
      }

      return { ...state, balance: state.balance - action.payload };
    case "account/loan":
      if (state.loan > 0) {
        alert("Please pay loan in advance");
        return state;
      }
      return {
        ...state,
        loan: action.payload.loanAmount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loanAmount,
      };
    case "account/payLoan":
      if (state.balance < state.loan) {
        alert("The balance is not enough to pay the loan");
        return state;
      }
      if(!state.loan){
        alert("You don't have a current loan");
        return state;
      }
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/loading":
      return { ...state, isLoading: action.payload };
    case "account/error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function depositAccount(amount) {
  return accountDispatch("account/deposit", amount);
}

export function withdrawAccount(amount) {
  return accountDispatch("account/withdraw", amount);
}

export function loanAccount(loanAmount, loanPurpose) {
  return accountDispatch("account/loan", { loanAmount, loanPurpose });
}

export function payLoanAccount() {
  return accountDispatch("account/payLoan");
}

export function loadingAccount() {
  return accountDispatch("account/loading");
}
