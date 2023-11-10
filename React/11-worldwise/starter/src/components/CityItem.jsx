/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCityContext } from "../contexts/CityContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity } = useCityContext();
  const { emoji, cityName, date, id, position } = city;
  const isActive = id === currentCity?.id;

  const { deleteCity } = useCityContext();

  function handlerDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          isActive && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handlerDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
