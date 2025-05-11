"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css"

interface DateRangePickerProps {
    date?: DateRange
    onSelect?: (date: DateRange | undefined) => void
    className?: string
}

export function DateRangePicker({
    date,
    onSelect,
    className,
}: DateRangePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:border-gray-700 dark:text-gray-200"
            >
                <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                {date?.from ? (
                    date.to ? (
                        <>
                            {format(date.from, "MMM dd, yyyy")} -{" "}
                            {format(date.to, "MMM dd, yyyy")}
                        </>
                    ) : (
                        format(date.from, "MMM dd, yyyy")
                    )
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">Select date range</span>
                )}
            </button>

            {open && (
                <div className="absolute z-50 mt-1 p-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg">
                    <div className="flex gap-4">
                        <div className="border-r dark:border-gray-700 pr-4">
                            <div className="text-sm font-medium mb-2 dark:text-gray-200">Start Date</div>
                            <input
                                type="date"
                                className="w-full px-2 py-1 border dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
                                value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
                                onChange={(e) => {
                                    const newDate = e.target.value ? new Date(e.target.value) : undefined
                                    onSelect?.({ from: newDate, to: date?.to })
                                }}
                            />
                        </div>
                        <div>
                            <div className="text-sm font-medium mb-2 dark:text-gray-200">End Date</div>
                            <input
                                type="date"
                                className="w-full px-2 py-1 border dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
                                value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
                                onChange={(e) => {
                                    const newDate = e.target.value ? new Date(e.target.value) : undefined
                                    onSelect?.({ from: date?.from, to: newDate })
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                onSelect?.(undefined)
                                setOpen(false)
                            }}
                            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
} 