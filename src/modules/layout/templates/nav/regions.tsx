"use client"
import React, { useEffect, useState } from "react"
import { listRegions } from "@lib/data/regions"
import { Select } from "@medusajs/ui"

const CountryDropdown = () => {
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const regions = await listRegions()
        if (regions) {
          const allCountries = regions.flatMap(region =>
            region.countries?.map(country => ({
              value: country.iso_2 || "",
              label: country.name || "",
            })) ?? []
          )
          const sortedCountries = allCountries.sort((a, b) => a.label.localeCompare(b.label))

          setCountries(sortedCountries)
        }
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchCountries()
  }, [])

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }
  
  return (
    <div className="w-14">
      <Select
    value={selectedCountry}
    onValueChange={handleCountryChange}
    
  >
    <Select.Trigger
   style={{
    border: "none",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    padding: "8px",
  }}
  >
    <Select.Value placeholder="PH"/>
    </Select.Trigger>
    <Select.Content className="border-none focus:outline-none">
      {countries.map(country => (
        <Select.Item key={country.value} value={country.value}>
          {selectedCountry === country.value
            ? country.label.substring(0, 2).toUpperCase()
            : country.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select>
    </div>
  
  )
}

export default CountryDropdown
