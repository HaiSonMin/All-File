/* eslint-disable react/prop-types */
import { useCityContext } from "../contexts/CityContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

const CountryList = () => {
  const { cities, isLoading } = useCityContext();
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.countryList}>
      {cities.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
