import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/Api";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CircularWithValueLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";
import "./Country.css";

interface ICountry {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  capital: string[];
  languages: {
    [key: string]: string;
  };
}

const Country: FC = (): React.ReactElement => {
  const [country, setCountry] = useState<ICountry | null>(null);

  const params = useParams();

  useEffect(() => {
    if (params.name) {
      api
        .getCountry(params.name)
        .then((res: ICountry[]) => {
          if (res.length > 0) {
            setCountry(res[0]);
          } else {
            console.log("Страна не найдена");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [params.name]);

  if (!country) {
    return (
      <div className="country">
        <CircularWithValueLabel />
      </div>
    );
  }

  return (
    <section className="country">
      <Card className="country__card">
        <CardMedia
          sx={{ height: 300 }}
          image={country.flags.svg}
          title={country.name.common}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {country.name.common}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capital: {country.capital}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Languages:{" "}
            {Object.keys(country.languages)
              .map((key) => country.languages[key])
              .join(", ")}
          </Typography>
        </CardContent>
      </Card>
      <CardActions>
        <Button size="small" onClick={() => (window.location.href = "/")}>
          Home page
        </Button>
      </CardActions>
    </section>
  );
};

export default Country;
