import React from "react";
import { PersonStanding } from "lucide-react";
import { Timer } from "lucide-react";

function PeopleChip({ count }: { count: number }) {
  const quickStyle = "bg-[#4FB268] text-[#00FF73]";
  const tardyStyle = "bg-[#B24F50] text-[#FF7684]";

  return (
    <div
      className={`px-2 py-1 gap-2 flex rounded-lg items-center justify-center text-2xl w-[100px] ${
        count < 15 ? quickStyle : tardyStyle
      }`}
    >
      <PersonStanding size={30} />
      <p className="font-semibold">{count}</p>
    </div>
  );
}

function TimeChip({ count }: { count: number }) {
  return (
    <div
      className={`px-2 py-1 border gap-2 flex rounded-lg items-center w-[100px] bg-[#e1e3e6] text-[#717882] text-2xl`}
    >
      <Timer size={30} />
      <p className="font-semibold">{count * 1.5}</p>
      {/* <p className="font-semibold font-xs">min</p> */}
    </div>
  );
}

export default function Restaurant({
  name,
  times,
  count,
}: {
  name: string;
  times: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-[16px] font-medium">{name}</p>
        <p className="text-[#808080]">{times}</p>
      </div>

      <div className="flex gap-[8px]">
        <PeopleChip count={count} />
        <TimeChip count={count} />
      </div>
    </div>
  );
}
