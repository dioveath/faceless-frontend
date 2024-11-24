import { useState, KeyboardEvent, useEffect } from 'react'

export function useMultiInput(externalValues?: string[], onChange?: (values: string[]) => void) {
  const [values, setValues] = useState<string[]>(externalValues || [])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (externalValues) {
      setValues(externalValues)
    }
  }, [externalValues])

  const addValue = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue && !values.includes(trimmedValue)) {
      const newValues = [...values, trimmedValue]
      setValues(newValues)
      onChange?.(newValues)
    }
    setInputValue('')
  }

  const removeValue = (value: string) => {
    const newValues = values.filter((v) => v !== value)
    setValues(newValues)
    onChange?.(newValues)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addValue(inputValue)
    }
  }

  return {
    values,
    inputValue,
    setInputValue,
    addValue,
    removeValue,
    handleKeyDown,
  }
}

