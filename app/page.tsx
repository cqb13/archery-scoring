"use client"

import Dropdown from "@/components/general/dropdown"
import Slider from "@/components/general/slider"
import Button from "@/components/general/button"
import { useState } from "react"

export default function Home() {
  const [location, setLocation] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("")

  const updateLocation = (value: string) => {
    setLocation(value)
  }

  const updateDistanceUnit = (value: string) => {
    setDistanceUnit(value)
  }

  return (
    <main className="flex items-center justify-center pt-4">
      <section className="flex flex-col gap-2 items-center">
        <Dropdown title="Location" items={["Indoor", "Outdoor"]} selected="" setSelected={updateLocation} />
        <div className="flex gap-2 items-center">
          <Slider title="Distance" jump={1} defaultValue={18} min={1} max={100} update={() => {}} />
          <Dropdown title="Distance Unit" items={["M (meters)", "YD (yards)", "FT (feet)"]} selected="" setSelected={updateDistanceUnit} />
        </div>
        <Slider title="Ends" jump={1} defaultValue={10} min={1} max={40} update={() => {}} />
        <Slider title="Arrow Per End" jump={1} defaultValue={3} min={1} max={12} update={() => {}} />
        <Slider title="Split Ends" jump={1} defaultValue={1} min={1} max={4} update={() => {}} />
        <Dropdown title="Bow" items={["Barebow", "Olympic Recurve", "Compound"]} selected="" setSelected={updateLocation} />
        <Button title="Start Scoring" onClick={() => {}}/>
      </section>
    </main>
  )
}
