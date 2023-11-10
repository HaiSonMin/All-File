/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { ButtonBack, Spinner } from ".";
import { useEffect } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCityContext } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geolocationError, setGeolocationError] = useState("");
  const { createCity, isLoading } = useCityContext();
  const navigate = useNavigate();

  function handlerSubmit(e) {
    e.preventDefault();
    const newPos = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: Math.floor(Math.random() * Math.pow(10, 6)),
    };
    createCity(newPos);
    navigate("/app/cities");
  }

  useEffect(() => {
    if (!lat && !lng) return; // Needn't load when lat & lng undefine of null
    async function fetchPosition() {
      try {
        setIsLoadingGeolocation(true);
        setGeolocationError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!response.ok)
          throw new Error("Some thing went wrong in loading position");
        const result = await response.json();

        if (!result.countryCode) throw new Error("Please choose accordingly");

        setCityName(
          result.locality || result.city || result.principalSubdivision || ""
        );
        setCountry(result.countryName);
        setEmoji(convertToEmoji(result.countryCode));
      } catch (error) {
        setGeolocationError(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchPosition();
  }, [lat, lng]);

  if (isLoadingGeolocation) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start by clicking in some where on the map"} />;
  if (geolocationError) return <Message message={geolocationError} />;

  return (
    <form
      className={`${styles.form} ${isLoading && "loading"}`}
      onSubmit={handlerSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          showIcon
          dateFormat={"dd/MM/yyyy"}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
