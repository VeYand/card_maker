import React from "react"

interface ICustomSelectProps {
    options: string[]
    defaultValue: string
    value: string
    onChange: (value: string) => void
}

const CustomSelect = ({
    options,
    defaultValue,
    value,
    onChange,
}: ICustomSelectProps) => {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            <option disabled value="">
                {defaultValue}
            </option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export { CustomSelect }
