import SearchBar from "./SearchBar"
import Image from "next/image"

type JsonRequest = {
  name: string,
  temp: number,
  temp_min: number,
  temp_max: number,
  weather: string
} | undefined

export default async function Home({ searchParams }: {
  searchParams: {'c': string}
}) {
  const param = searchParams['c']
  let data: JsonRequest = undefined
  const fetchWeather = async (cityName: string) => {
    const api_key = process.env.API_KEY
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
  } 

  if (param) {
    let res = await fetchWeather(param)
    let weather = await res.json().then() 
    data = {
      name: weather.name as string,
      temp: weather.main.temp as number,
      temp_max: weather.main.temp_max as number,
      temp_min: weather.main.temp_min as number,
      weather: weather.weather[0].main as string,
    }
    console.log(data)
  }

  return(
    <>
      <SearchBar />
      {data && RenderWeather({ data })}
    </>
  )
}

function RenderWeather({ data }: {
  data: JsonRequest
}) {
  return(
    <>
      <p>City: {data?.name}</p>
      <p>Temp: {data?.temp}</p>
    </>
  ) 
}
