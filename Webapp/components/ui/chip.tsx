import Image from "next/image";
import { memo } from "react";

// Peach themed chip
export const PeachPeopleChip = memo(({ count }: { count: number }) => (
  <div
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-peach text-white border border-peach-dark h-[50px]`}
  >
    <Image src="/peach-ilo.png" alt="Peach Ilo" height={48} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
));

PeachPeopleChip.displayName = "PeachPeopleChip";

// Blue themed chip
export const BluePeopleChip = memo(({ count }: { count: number }) => (
  <div
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-blue text-white border border-blue-dark h-[50px]`}
  >
    <Image src="/blue-ilo.png" alt="Blue Ilo" height={31} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
));

BluePeopleChip.displayName = "BluePeopleChip";

// Green themed chip
export const GreenPeopleChip = memo(({ count }: { count: number }) => (
  <div
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-green text-white border border-green-dark h-[50px]`}
  >
    <Image src="/green-ilo.png" alt="Green Ilo" height={46} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
));

GreenPeopleChip.displayName = "GreenPeopleChip";

// Yellow themed chip
export const MustardPeopleChip = memo(({ count }: { count: number }) => (
  <div
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-mustard text-white border border-mustard-dark h-[50px]`}
  >
    <Image src="/yellow-ilo.png" alt="Yellow Ilo" height={48} width={31} />
    <p className="font-semibold">{count}</p>
  </div>
));

MustardPeopleChip.displayName = "MustardPeopleChip";

// Dynamic color option
export const PeopleChip = memo(
  ({
    count,
    theme = "peach",
  }: {
    count: number;
    theme?: "peach" | "blue" | "green" | "mustard";
  }) => {
    switch (theme) {
      case "blue":
        return <BluePeopleChip count={count} />;
      case "green":
        return <GreenPeopleChip count={count} />;
      case "mustard":
        return <MustardPeopleChip count={count} />;
      default:
        return <PeachPeopleChip count={count} />;
    }
  }
);

PeopleChip.displayName = "PeopleChip";
