import React, { useState, useEffect } from "react"

type YearFilterType = React.FC<{
  id: string
  min: number
  max: number
  onSelect: (val: any) => void
}>

const DropdownNumbers: YearFilterType = ({
  id,
  min,
  max,
  onSelect: onSelect,
}) => {
  const [numbers, setNumbers] = useState<number[]>([])

  useEffect(() => {
    const generatedNumbers = Array.from(
      { length: max - (min - 1) },
      (_, index) => min + index
    ).reverse()

    setNumbers(generatedNumbers)
  }, [min, max])

  return (
    <select
      id={id}
      onChange={(e) => onSelect(e.target.value)}
      className="bg-[#272727] py-1.5 px-3"
    >
      <option value="">{id}</option>
      {numbers.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default DropdownNumbers
