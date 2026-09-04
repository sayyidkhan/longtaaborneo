export type SimulatedAvailabilityStatus = "available" | "unavailable" | "confirm";

const SATURDAY_STATUS_SEQUENCE: readonly SimulatedAvailabilityStatus[] = [
  "available",
  "unavailable",
  "confirm",
];

export function availabilityDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getSimulatedAvailability(value: string | Date): SimulatedAvailabilityStatus {
  const date = typeof value === "string" ? parseLocalDate(value) : value;
  if (!date || Number.isNaN(date.getTime())) return "confirm";

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (date < startOfToday) return "unavailable";

  if (date.getDay() !== 6) return "confirm";
  const saturdayIndex = Math.floor((date.getDate() - 1) / 7);
  return SATURDAY_STATUS_SEQUENCE[saturdayIndex % SATURDAY_STATUS_SEQUENCE.length];
}

export function getSimulatedSeasonalWindows(monthCount = 3, from = new Date()) {
  return Array.from({ length: monthCount }, (_, index) => index + 1).flatMap((offset) => {
    const first = new Date(from.getFullYear(), from.getMonth() + offset, 1);
    const firstSaturday = new Date(first);
    firstSaturday.setDate(1 + ((6 - first.getDay() + 7) % 7));

    return SATURDAY_STATUS_SEQUENCE.map((status, index) => {
      const date = new Date(firstSaturday);
      date.setDate(firstSaturday.getDate() + index * 7);
      return { key: availabilityDateKey(date), status };
    });
  });
}

export const simulatedAvailabilityLabels: Record<SimulatedAvailabilityStatus, string> = {
  available: "Available in website simulation",
  unavailable: "Unavailable in website simulation",
  confirm: "Requires community confirmation",
};
