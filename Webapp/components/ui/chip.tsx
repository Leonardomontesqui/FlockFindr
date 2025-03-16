import { PersonStanding } from "lucide-react";
import { memo } from "react";

// Base component with shared logic
const BasePeopleChip = memo(
  ({
    count,
    bgColor,
    borderColor,
  }: {
    count: number;
    bgColor: string;
    borderColor: string;
  }) => {
    return (
      <div
        className={`px-2 py-1 gap-2 flex rounded-lg items-center justify-center text-2xl w-[100px] ${bgColor} text-white border ${borderColor}`}
      >
        <PersonStanding size={30} color="white" />
        <p className="font-semibold">{count}</p>
      </div>
    );
  }
);

// Specialized components with fixed colors
export const BluePeopleChip = memo(({ count }: { count: number }) => (
  <BasePeopleChip
    count={count}
    bgColor="bg-[#5B8FDF]"
    borderColor="border-[#5C8CD7]"
  />
));

export const OrangePeopleChip = memo(({ count }: { count: number }) => (
  <BasePeopleChip
    count={count}
    bgColor="bg-[#EA846D]"
    borderColor="border-[#D77965]"
  />
));

// Only needed if you want a dynamic color option
export const PeopleChip = memo(
  ({
    count,
    primaryColor = "blue",
  }: {
    count: number;
    primaryColor?: "blue" | "orange";
  }) => {
    if (primaryColor === "orange") {
      return <OrangePeopleChip count={count} />;
    }
    return <BluePeopleChip count={count} />;
  }
);
