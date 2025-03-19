import Image from "next/image";

// Peach themed chip
export const PeachPeopleChip = ({
  count,
  onClick,
}: {
  count: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-peach text-white border border-peach-dark h-[50px] cursor-pointer hover:bg-peach-dark transition-colors`}
  >
    <Image src="/peach-ilo.png" alt="Peach Ilo" height={48} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
);

// Blue themed chip
export const BluePeopleChip = ({
  count,
  onClick,
}: {
  count: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-blue text-white border border-blue-dark h-[50px] cursor-pointer hover:bg-blue-dark transition-colors`}
  >
    <Image src="/blue-ilo.png" alt="Blue Ilo" height={31} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
);

// Green themed chip
export const GreenPeopleChip = ({
  count,
  onClick,
}: {
  count: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-green text-white border border-green-dark h-[50px] cursor-pointer hover:bg-green-dark transition-colors`}
  >
    <Image src="/green-ilo.png" alt="Green Ilo" height={46} width={48} />
    <p className="font-semibold">{count}</p>
  </div>
);

// Yellow themed chip
export const MustardPeopleChip = ({
  count,
  onClick,
}: {
  count: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`px-1.5 py-0.5 gap-1.5 flex rounded-lg items-center justify-center text-2xl w-[120px] bg-mustard text-white border border-mustard-dark h-[50px] cursor-pointer hover:bg-mustard-dark transition-colors`}
  >
    <Image src="/yellow-ilo.png" alt="Yellow Ilo" height={48} width={31} />
    <p className="font-semibold">{count}</p>
  </div>
);
