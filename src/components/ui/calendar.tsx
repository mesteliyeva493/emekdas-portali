"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 bg-white rounded-xl border border-neutral-200 shadow-lg",
        className,
      )}
      classNames={{
        root: "w-fit",
        months: "flex flex-col gap-4",
        month: "space-y-4",
        nav: "absolute inset-x-2 top-2 flex items-center justify-between pointer-events-none",
        button_previous:
          "pointer-events-auto h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 transition",

        button_next:
          "pointer-events-auto h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 transition",

        month_caption:
          "relative flex items-center justify-center border-b border-neutral-100 pb-3 mb-2",

        caption_label: "hidden",

        dropdowns: "flex items-center gap-2",

        dropdown_root:
          "relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-white transition-colors",

        dropdown:
          "h-9 px-3 pr-8 bg-transparent text-sm font-medium text-neutral-700 outline-none cursor-pointer appearance-none",

        months_dropdown: "text-sm",
        years_dropdown: "text-sm",
        month_grid: "w-full border-collapse",

        weekdays: "flex justify-between mb-2",

        weekday:
          "w-10 text-center text-[11px] font-semibold uppercase tracking-wide text-neutral-400",
        week: "flex justify-between",

        day: "h-10 w-10 flex items-center justify-center",

        day_button:
          "h-10 w-10 rounded-lg text-sm font-medium transition-all hover:bg-neutral-100 hover:text-neutral-900",

        selected:
          "[&>button]:bg-black [&>button]:text-white [&>button]:hover:bg-black",

        today:
          "[&>button]:border [&>button]:border-neutral-900 [&>button]:bg-neutral-100 [&>button]:font-semibold",

        outside: "[&>button]:text-neutral-300",

        disabled: "[&>button]:opacity-40 [&>button]:cursor-not-allowed",

        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("h-3.5 w-3.5", className)} {...props} />
          ) : orientation === "right" ? (
            <ChevronRight className={cn("h-3.5 w-3.5", className)} {...props} />
          ) : (
            <ChevronDown className={cn("h-3.5 w-3.5", className)} {...props} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
