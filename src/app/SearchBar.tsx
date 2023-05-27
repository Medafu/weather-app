"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

export default function SearchBar() {
  const router = useRouter()

  const [city, setCity] = useState("") 
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city) {
      router.push(`?c=${city}`)
    }
  }
  return(
    <div className="flex justify-center m-8">
      <form onSubmit={e => handleSubmit(e)} className="border rounded-full flex justify-center gap-10 p-5 text-white">
        <input placeholder="City name..." className="bg-transparent outline-none" value={city} onChange={e => setCity(e.target.value)}></input>
        <button type="submit"><AiOutlineSearch style={{ fontSize: '150%' }}/></button>
      </form>
    </div>
  )
}
