import React, { FC, useEffect, useState } from "react";
import api from "../../utils/Api";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import "./CountryPage.css";
import { Link } from "react-router-dom";
import CircularWithValueLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";

interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}

const CountryPage: FC = (): React.ReactElement => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    api
      .getAllCountries()
      .then((res: Country[]) => setCountries(res))
      .catch((err) => console.log(err));
  }, []);

  if (countries.length === 0) {
    return (
      <main className="country-page__progress">
        <CircularWithValueLabel />
      </main>
    );
  }

  return (
    <main className="country-page">
      <h1 className="country-page__title">Countries</h1>
      <ImageList className="country-page__list">
        {countries.map((country, index) => (
          <Link to={`${country.name.common}`} className="country-page__link">
            {" "}
            <ImageListItem key={index} className="country-page__item">
              <img
                className="country-page__img"
                srcSet={`${country.flags.svg}`}
                src={`${country.flags.svg}`}
                alt={country.name.common}
                loading="lazy"
              />
              <ImageListItemBar
                title={country.name.common}
                position="below"
                className="country-page__subtitle"
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </main>
  );
};

export default CountryPage;
