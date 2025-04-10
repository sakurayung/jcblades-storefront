'use client'
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { Select } from "@medusajs/ui"

const CountryDropdown = ({ isScrolled }: { isScrolled: boolean }) => {
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const router = useRouter()
  const pathname = usePathname()

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

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      const countryCode = pathSegments[0]
      setSelectedCountry(countryCode)
    }
  }, [pathname])

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const countryCode = pathSegments[0]; // Get only the country code
      setSelectedCountry(countryCode);
    }
  }, []);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    const newPath = `/${value}${pathname.replace(/^\/[a-z]{2}/, '')}`
    router.push(newPath)
  }
  
  return (
    <div className="w-14">
      <Select value={selectedCountry} onValueChange={handleCountryChange}>
        <Select.Trigger
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            padding: "8px",
            appearance: "none",
            position: "relative",
            color: isScrolled ? "black" : "white", // Dynamic text color based on scroll
          }}
        >
          <Select.Value>
            {selectedCountry ? selectedCountry.toUpperCase() : "Select a country"}
          </Select.Value>
        </Select.Trigger>
        <Select.Content className="  z-50 bg-black text-white border-[0.01px] border-[#919090] rounded-none">
          {countries.map(country => (
            <Select.Item key={country.value} value={country.value} className="bg-black text-[#919090] hover:text-black">
              {country.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export default CountryDropdown