import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Card from '../components/Card'
import SickIcon from '@mui/icons-material/Sick';


export default function Home() {

  const { push } = useRouter()

  const [username, setUsername] = useState('')

  const [data, setData] = useState([])

  const confirmedPatiens = useMemo(() => data.reduce((a, e) =>
    a + e.confirmed
    , 0), [JSON.stringify(data)])

    const confirmedDeaths = useMemo(() => data.reduce((a, e) =>
    a + e.deaths
    , 0), [JSON.stringify(data)])

  console.log(confirmedPatiens)

  const fetchData = async () => {
    const result = await fetch('api/info')

    const info = await result.json()

    setData(info)
  }


  useEffect(() => {
    const email = window.localStorage.getItem('logged')

    if (!email) {
      push('/login')
    }
    setUsername(email.split("@")[0])
    fetchData()

  }, [])

  return (
    <> <h1>
      Welcome, {username}
    </h1>

      <Card icon={SickIcon} title='Confirmed cases' text={`For 2020, ${confirmedPatiens} people were sickened by COVID-19.`} />
      <Card icon={SickIcon} title='Confirmed deaths' text={`For 2020, ${confirmedDeaths} people were died beacuse of COVID-19.`} />
    </>
  )
}
