import SearchBar from "./SearchBar"
import Image from "next/image"

type JsonRequest = {
  name: string,
  temp: number,
  feels_like: number,
  weather: string,
  icon: string,
} | undefined

export default async function Home({ searchParams }: {
  searchParams: {'c': string}
}) {
  const param = searchParams['c']
  let renderedOutput = null;
  let data: JsonRequest = undefined
  let error: boolean = false;

  const fetchWeather = async (cityName: string) => {
    const api_key = process.env.API_KEY
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
  } 

  if (param) {
    let res = await fetchWeather(param)
    let weather = await res.json().then() 
    if (weather.cod == 404) {
      error = true;
    } else {
      data = {
        name: weather.name as string,
        temp: weather.main.temp as number,
        feels_like: weather.main.feels_like as number,
        weather: weather.weather[0].main as string,
        icon: weather.weather[0].icon as string,
      }
    }
    console.log(data)
  }

  if (param != undefined) {
    if (!error) {
      renderedOutput = <RenderWeather data={data} />
    } else {
      renderedOutput = <RenderError />
    }
  }  

  return (
    <>
      <SearchBar />
      {renderedOutput}
    </>
  )
}

function RenderWeather({ data }: {
  data: JsonRequest
}) {
  return (
    <>
      <div className="flex justify-center text-7xl m-4 mb-12">{data?.name}</div>
      <div className="text-white font-monoton flex justify-between mx-12">
        <div className="flex flex-col items-center">
          <Image src={`https://openweathermap.org/img/wn/${data?.icon}@2x.png`} alt="weather icon" width={100} height={100}></Image> 
          <p className="text-3xl">{data?.weather}</p>
        </div>
        <div className="flex flex-col :">
          <p className="text-9xl">{data?.temp.toFixed(0)}&#x00B0;</p>
          <p>Feels like: {data?.feels_like.toFixed(0)}&#x00B0;</p>
        </div>
      </div>
    </>
  ) 
}

function RenderError() {
  return (
    <>
      <div className="flex justify-center text-7xl m-4 mb-12">City not found.</div>
    </>
  )
}
