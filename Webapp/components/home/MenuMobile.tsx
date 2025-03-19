"use client";

import React from "react";
import Mappedin, { useMap } from "@mappedin/react-sdk";
import { useSymposiumCounts } from "@/lib/utils/useSymposiumCounts";
import { PersonStanding, ArrowRight } from "lucide-react";

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-twitter"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const SocraticaLogo = () => (
  <svg
    width="12"
    height="10"
    viewBox="0 0 32 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0208 14.9899C15.1261 14.9899 14.5852 14.4415 14.6268 13.5884L14.8349 9.58727L11.0689 12.0245C10.8401 12.187 10.5488 12.2683 10.2159 12.2683C9.55007 12.2683 8.90507 11.7605 8.90507 10.9075C8.90507 10.3794 9.15475 10.0341 9.69571 9.72945L13.6697 7.67809L9.69571 5.62672C9.15475 5.34238 8.90507 4.97679 8.90507 4.44871C8.90507 3.61598 9.55007 3.10822 10.2159 3.10822C10.5488 3.10822 10.8401 3.18946 11.0689 3.33163L14.8349 5.70796L14.6268 1.54431C14.5852 0.691267 15.1261 0.142883 16.0208 0.142883C16.8739 0.142883 17.3732 0.650646 17.3524 1.54431L17.1235 5.70796L20.8479 3.33163C21.0767 3.18946 21.368 3.10822 21.7009 3.10822C22.3667 3.10822 23.0117 3.61598 23.0117 4.44871C23.0117 4.97679 22.762 5.34238 22.2211 5.62672L18.2471 7.67809L22.2211 9.72945C22.762 10.0341 23.0117 10.3794 23.0117 10.9075C23.0117 11.7605 22.3667 12.2683 21.7009 12.2683C21.368 12.2683 21.0767 12.187 20.8479 12.0245L17.1235 9.58727L17.3524 13.5884C17.394 14.4821 16.8739 14.9899 16.0208 14.9899ZM7.11573 29.8572C6.22107 29.8572 5.6801 29.3088 5.72172 28.4557L5.92978 24.4546L2.16385 26.8918C1.93498 27.0543 1.64369 27.1356 1.31079 27.1356C0.644994 27.1356 0 26.6278 0 25.7748C0 25.2467 0.249675 24.9014 0.790637 24.5967L4.76463 22.5454L0.790637 20.494C0.249675 20.2097 0 19.8441 0 19.316C0 18.4833 0.644994 17.9755 1.31079 17.9755C1.64369 17.9755 1.93498 18.0568 2.16385 18.1989L5.92978 20.5753L5.72172 16.4116C5.6801 15.5586 6.22107 15.0102 7.11573 15.0102C7.96879 15.0102 8.46814 15.5179 8.44733 16.4116L8.21847 20.5753L11.9428 18.1989C12.1717 18.0568 12.4629 17.9755 12.7958 17.9755C13.4616 17.9755 14.1066 18.4833 14.1066 19.316C14.1066 19.8441 13.857 20.2097 13.316 20.494L9.342 22.5454L13.316 24.5967C13.857 24.9014 14.1066 25.2467 14.1066 25.7748C14.1066 26.6278 13.4616 27.1356 12.7958 27.1356C12.4629 27.1356 12.1717 27.0543 11.9428 26.8918L8.21847 24.4546L8.44733 28.4557C8.48895 29.3494 7.96879 29.8572 7.11573 29.8572ZM25.0091 29.8572C24.1144 29.8572 23.5735 29.3088 23.6151 28.4557L23.8231 24.4546L20.0572 26.8918C19.8283 27.0543 19.5371 27.1356 19.2042 27.1356C18.5384 27.1356 17.8934 26.6278 17.8934 25.7748C17.8934 25.2467 18.143 24.9014 18.684 24.5967L22.658 22.5454L18.684 20.494C18.143 20.2097 17.8934 19.8441 17.8934 19.316C17.8934 18.4833 18.5384 17.9755 19.2042 17.9755C19.5371 17.9755 19.8283 18.0568 20.0572 18.1989L23.8231 20.5753L23.6151 16.4116C23.5735 15.5586 24.1144 15.0102 25.0091 15.0102C25.8622 15.0102 26.3615 15.5179 26.3407 16.4116L26.1118 20.5753L29.8362 18.1989C30.065 18.0568 30.3563 17.9755 30.6892 17.9755C31.355 17.9755 32 18.4833 32 19.316C32 19.8441 31.7503 20.2097 31.2094 20.494L27.2354 22.5454L31.2094 24.5967C31.7503 24.9014 32 25.2467 32 25.7748C32 26.6278 31.355 27.1356 30.6892 27.1356C30.3563 27.1356 30.065 27.0543 29.8362 26.8918L26.1118 24.4546L26.3407 28.4557C26.3823 29.3494 25.8622 29.8572 25.0091 29.8572Z"
      fill="#8A817C"
    />
  </svg>
);

const LocationButton = ({
  location,
  count,
  className,
  onClick,
}: {
  location: string;
  count: number;
  className: string;
  onClick?: () => void;
}) => (
  <button
    className={`flex items-center justify-between px-2 py-1 rounded-full w-fit ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-0 w-[52px]">
      <PersonStanding size={20} />
      <span className="font-bold">{count}</span>
    </div>
    <div className="flex items-center gap-1">
      <span>{location}</span>
      <ArrowRight size={20} />
    </div>
  </button>
);

export default function MenuMobile() {
  const counts = useSymposiumCounts();
  const { mapView } = useMap();

  function go(coordinate: Mappedin.Coordinate) {
    mapView.Camera.set({
      bearing: 190,
      pitch: 50,
      zoomLevel: 20,
      center: coordinate,
    });
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-[#F4EFE3] border-[#DFD9CC] border-b">
        <div className="flex flex-col items-start h-full px-4 py-2">
          <h1
            className="text-[24px] font-medium text-brown"
            style={{ fontFamily: "Times New Roman" }}
          >
            Foot Traffic at Symposium
          </h1>
          <div className="flex jutsify-between w-full">
            <p className="text-start flex justify-start gap-2 items-center text-[12px] text-brown-light">
              <SocraticaLogo />
              <span style={{ fontFamily: "Times New Roman" }}>Socratica</span>
              <span>X FlockFindr</span>
            </p>
            <p className="text-[12px] text-brown-light flex items-center gap-2 ml-auto">
              <TwitterIcon />
              <a
                href="https://x.com/LeoMq06"
                className="underline hover:text-brown"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leo
              </a>
              ,{" "}
              <a
                href="https://x.com/nbiyani06"
                className="underline hover:text-brown"
                target="_blank"
                rel="noopener noreferrer"
              >
                Naman
              </a>
              ,{" "}
              <a
                href="https://x.com/tanmaymshah"
                className="underline hover:text-brown"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanmay
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="fixed top-[80px] left-2 right-2 z-40 flex flex-wrap gap-2">
        <LocationButton
          location="Activity Court"
          count={counts.Activity}
          className="bg-peach border border-peach-dark text-white hover:bg-peach-dark shadow-lg"
          onClick={() => go(new Mappedin.Coordinate(43.4642767, -80.53197397))}
        />
        <LocationButton
          location="North Track"
          count={counts.North}
          className="bg-blue border border-blue-dark text-white hover:bg-blue-dark shadow-lg"
          onClick={() => go(new Mappedin.Coordinate(43.46351545, -80.53210472))}
        />
        <LocationButton
          location="East Track"
          count={counts.East}
          className="bg-green border border-green-dark text-white hover:bg-green-dark shadow-lg"
          onClick={() => go(new Mappedin.Coordinate(43.46363835, -80.53261381))}
        />
        <LocationButton
          location="West Track"
          count={counts.West}
          className="bg-mustard border border-mustard-dark text-white hover:bg-mustard-dark shadow-lg"
          onClick={() => go(new Mappedin.Coordinate(43.46393357, -80.53201389))}
        />
      </div>
    </>
  );
}
