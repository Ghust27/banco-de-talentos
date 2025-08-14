import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface Props {
  items: {
    id: number;
    nome: string;
  }[];
  label: string;
  placeholder: string;
  onChange?: (value: string) => void;
}

export function BaseSelect({ items, label, placeholder, onChange }: Props) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {items.map((item) => (
            <SelectItem value={item.nome} key={item.id}>
              {item.nome}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
