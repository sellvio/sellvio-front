"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar22Props {
  value?: number;
  onChange?: (days: number) => void;
}

export function Calendar22({ value, onChange }: Calendar22Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const getToday = React.useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  const calculateDaysDifference = React.useCallback(
    (selected: Date) => {
      const selDate = new Date(selected);
      selDate.setHours(0, 0, 0, 0);
      const diffTime = selDate.getTime() - getToday().getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    [getToday]
  );

  const getDateFromDays = React.useCallback(
    (days: number) => {
      const nextDate = getToday();
      nextDate.setDate(nextDate.getDate() + days);
      return nextDate;
    },
    [getToday]
  );

  React.useEffect(() => {
    if (typeof value === "number") {
      setDate(getDateFromDays(value));
    } else {
      setDate(undefined);
    }
  }, [value, getDateFromDays]);

  return (
    <div className="w-full border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] rounded-[8px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left py-3 text-[var(--black-color)] font-[700] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] hover:bg-[#FFFFFF1A] active:bg-[#FFFFFF1A] focus:bg-[#FFFFFF1A]"
          >
            {date && typeof value === "number"
              ? `დარჩა ${value} დღე`
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              setDate(selectedDate);
              const days = calculateDaysDifference(selectedDate);
              onChange?.(days);
              setOpen(false);
            }}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
