const initializeCustomer = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

function customerDispatch(type, payload) {
  return { type, payload };
}

export default function customerReducer(state = initializeCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };
    case "customer/update":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return customerDispatch("customer/create", {
    fullName,
    nationalId,
    createAt: new Date().toISOString(),
  });
}

export function updateCustomer(fullName) {
  return customerDispatch("customer/update", fullName);
}
