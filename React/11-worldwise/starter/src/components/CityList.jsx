/* eslint-disable react/prop-types */
import { useCityContext } from "../contexts/CityContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
const CityList = () => {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city on the clicking on a city on the map"}
      />
    );
  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </>
  );
};

export default CityList;
