/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CityContext = createContext();

const initializeCity = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function cityReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload };
    case "getAllCities":
      return { ...state, cities: action.payload };
    case "getCity":
      return { ...state, currentCity: action.payload };
    case "createCity":
      return { ...state, cities: [...state.cities, action.payload] };
    case "deleteCity":
      return { ...state, cities: action.payload };
    default:
      throw new Error("Some thing went wrong, pls try again");
  }
}

const CityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cityReducer, initializeCity);
  const { isLoading, cities, currentCity } = state;

  useEffect(() => {
    console.log("Fetch City>>>>>")
    async function fetchCities() {
      try {
        dispatch(cityDispatch("loading", true));
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`);
        if (!response.ok) throw new Error("Some thing went wrong");
        const result = await response.json();
        dispatch(cityDispatch("getAllCities", result));
      } catch (error) {
        alert(error.message);
      } finally {
        dispatch(cityDispatch("loading", false));
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return;
      console.log("Re-Render GetCity");
      try {
        // setIsLoading(true);
        dispatch(cityDispatch("loading", true));
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cities/${id}`
        );
        if (!response.ok)
          throw new Error("Some thing went wrong, pls try again");
        const result = await response.json();
        // setCurrentCity((cur) => {
        //   return { ...cur, result };
        // });
        // setCurrentCity(result);
        dispatch(cityDispatch("getCity", result));
      } catch (error) {
        alert(error.message);
      } finally {
        // setIsLoading(false);
        dispatch(cityDispatch("loading", false));
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch(cityDispatch("loading", true));
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      if (!response.ok) throw new Error("Some thing went wrong, pls try again");
      // setCities((cities) => [...cities, newCity]);
      dispatch(cityDispatch("createCity", newCity));
    } catch (error) {
      alert(error.message);
    } finally {
      // setIsLoading(false);
      dispatch(cityDispatch("loading", false));
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch(cityDispatch("loading", true));
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cities/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Some thing went wrong, pls try again");
      const newCities = cities.filter((city) => city.id !== id);
      dispatch(cityDispatch("deleteCity", newCities));
    } catch (error) {
      alert(error.message);
    } finally {
      // setIsLoading(false);
      dispatch(cityDispatch("loading", false));
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createCity,
        deleteCity,
        currentCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

function useCityContext() {
  const context = useContext(CityContext);
  if (!context)
    throw new Error(
      "Context must be use inside ContextProvider, pls try again"
    );
  return context;
}

function cityDispatch(type, payload) {
  return { type, payload };
}

export { CityProvider, CityContext, useCityContext };
