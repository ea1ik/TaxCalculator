import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props<T> = {
  items: T[];
  placeholder?: string;
  onValueChange: (value: string) => void;
};

export function DropdownPicker<T>(props: Props<T>) {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.items.map((item) => (
          <SelectItem key={String(item)} value={String(item)}>
            {String(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
