'import react'
import React, { useState } from "react";
import { Mappedin, MappedinLocation } from "@mappedin/mappedin-js";

export default function Navbar() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const styles = {
    title: {
      color: '#808080',
      font: 'Verdana',
    },
    list: {
      listStyle: 'none',
      padding: 5,
    },
    listItem: {
      margin: '15px 0',
    },
    button: (isActive: boolean) => ({
      padding: '0.25rem 0.5rem',
      border: '1px solid #d1d5db',
      gap: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      alignItems: 'center',
      width: '80px',
      backgroundColor: '#e1e3e6',
      color: '#717882',
      fontSize: '1.5rem',
    }),
    buttonHover: {
      backgroundColor: '#555',
    },
  };

  const handleSLCClick = () => {
    // CODE FOR SLC BUTTON CLICK
    // For example, you can navigate to a different section or trigger some action.
    console.log("SLC Button clicked!");
    // Example: Set a state, perform a fetch request, or trigger a map action
  };

  const handleRCHClick = () => {
    // CODE FOR RCH BUTTON CLICK
    // For example, you can trigger another action related to the RCH button.
    console.log("RCH Button clicked!");
    // Example: Perform a different action like opening a modal, changing a page, etc.
  };

  return (
    <div>
      <div className="absolute top-48 left-4 z-50 flex flex-col gap- p-2 pt-4  border w-fit rounded-lg bg-[#f8f8f8] border-[#cbcbcb]">
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <button
              style={styles.button(activeButton === "SLC")}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cacccf')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e1e3e6')}
              onClick={() => {
                handleSLCClick();  // Call the SLC button's action
                setActiveButton("SLC");  // Set the active button to SLC
              }}
            >
              <div style={styles.title}>SLC</div>
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button(activeButton === "RCH")}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cacccf')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e1e3e6')}
              onClick={() => {
                handleRCHClick();  // Call the RCH button's action
                setActiveButton("RCH");  // Set the active button to RCH
              }}
            >
              <div style={styles.title}>RCH</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
