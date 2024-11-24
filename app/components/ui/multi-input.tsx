import React, { forwardRef } from 'react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { useMultiInput } from '@/hooks/ui/use-multi-input'

export interface MultiInputProps {
  placeholder?: string
  className?: string
  value?: string[]
  onChange?: (value: string[]) => void
}

export const MultiInput = forwardRef<HTMLInputElement, MultiInputProps>(
  ({ placeholder = "Enter values...", className = "", value, onChange }, ref) => {
    const {
      values,
      inputValue,
      setInputValue,
      addValue,
      removeValue,
      handleKeyDown,
    } = useMultiInput(value, onChange)

    return (
      <div className={`border rounded-md p-2 ${className}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map((value) => (
            <Badge key={value} variant="secondary" className="text-sm py-1 px-2">
              {value}
              <button
                type="button"
                onClick={() => removeValue(value)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addValue(inputValue)}
          className="border-none shadow-none focus-visible:ring-0 px-0"
          ref={ref}
        />
      </div>
    )
  }
)

MultiInput.displayName = 'MultiInput'

