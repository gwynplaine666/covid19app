import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import SickIcon from "@mui/icons-material/Sick";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Bar } from "react-chartjs-2";
import { registerables, Chart as ChartJS } from 'chart.js'
import { Button } from "@mui/material";
import OwnIlness from "../components/OwnIlness";

ChartJS.register(...registerables)

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


  const unique = data.filter((v, i, a) => a.findIndex(v2 => v2.country === v.country) === i)
  const countires = unique.map(value => value.country)
  const deathsData = unique.map(value => value.deaths)
  const casesData = unique.map(value => value.confirmed)
  const chartCases = {
    labels: countires,
    datasets: [
      {
        label: 'Cases in countries',
        data: casesData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartDeaths = {
    labels: countires,
    datasets: [
      {
        label: 'Deaths in countries',
        data: deathsData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };

  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)

  const onClose = () => setIsOpen(false)

  return (
    <div className='container-main'>
      <OwnIlness open={isOpen} onClose={onClose}/>
      
      <h1 className='welcome-user'>Welcome, {username}!
      <Button id="add-own" variant="contained" onClick={onOpen}>+ Add your own information about the illness</Button>
      </h1>
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
      <div className="charts">
      <Bar id="charts-cases" data={chartCases} />
      <Bar id="charts-deaths" data={chartDeaths} />
      </div>
    </div>
  );
}