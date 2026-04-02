"use client";

import { Select } from "@/components/ui/select";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function StatusSelect({ value, onChange, options, className }: StatusSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
