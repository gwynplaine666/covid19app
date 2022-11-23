import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import SickIcon from "@mui/icons-material/Sick";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Chart } from "react-chartjs-2";

export default function Home() {
  const { push } = useRouter();

  const [username, setUsername] = useState("");

  const [data, setData] = useState([]);

  const [cases, setCases] = useState(0);

  const [casesUkraine, setCasesUkraine] = useState(0);

  const [deaths, setDeaths] = useState(0);

  const [deathsUkraine, setDeathsUkraine] = useState(0);

  const fetchData = async () => {
    const result = await fetch("api/info");

    const info = await result.json();

    setData(info);
  };

  const fetchCases = async () => {
    const result = await fetch("api/info?filter=cases");

    const info = await result.json();

    setCases(info);
  };

  const fetchCasesUkraine = async () => {
    const result = await fetch("api/info?filter=cases-ukraine");

    const info = await result.json();

    setCasesUkraine(info);
  };

  const fetchDeaths = async () => {
    const result = await fetch("api/info?filter=deaths");

    const info = await result.json();

    setDeaths(info);
  };

  const fetchDeathsUkraine = async () => {
    const result = await fetch("api/info?filter=deaths-ukraine");

    const info = await result.json();

    setDeathsUkraine(info);
  };

  useEffect(() => {
    const email = window.localStorage.getItem("logged");

    if (!email) {
      push("/login");
    }
    setUsername(email?.split("@")[0] || "");
    fetchCases();
    fetchDeaths();
    fetchDeathsUkraine();
    fetchCasesUkraine();
    fetchData();
  }, []);

  return (
    <div className='container-main'>
      <h1 className='welcome-user'>Welcome, {username}</h1>
      <div className='cards'>
        <Card
          className='card'
          icon={SickIcon}
          title='Confirmed cases'
          text={`For 2020, ${cases} people were sickened by COVID-19.`}
        />
        <Card
          className='card'
          title='Confirmed cases (Ukraine)'
          text={`For 2020, in Ukraine ${casesUkraine} people were sickened by COVID-19.`}
        />
        <Card
          className='card'
          icon={LocalHospitalIcon}
          title='Confirmed deaths'
          text={`For 2020, ${deaths} people were died beacuse of COVID-19.`}
        />
        <Card
          className='card'
          title='Confirmed deaths (Ukraine)'
          text={`For 2020, in Ukraine ${deathsUkraine} people were died beacuse of COVID-19.`}
        />
      </div>
      <Chart data={{labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'country',
        data: [1, 2, 3],
        borderWidth: 1
      }]
}} />
    </div>
  );
}
