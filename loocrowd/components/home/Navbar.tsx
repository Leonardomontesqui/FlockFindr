"import react"
import React, { useEffect, useState } from "react";



export default function Navbar() {
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
    button: {
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
    },
    buttonHover: {
      backgroundColor: '#555',
    },
  };

  return (
    <div>
      <div className="absolute top-48 left-4 z-50 flex flex-col gap- p-2 pt-4  border w-fit rounded-lg bg-[#f8f8f8] border-[#cbcbcb]">
      <ul style={styles.list}>
        <li style={styles.list}>
          <button
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cacccf')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e1e3e6')}
          >
            <div style={styles.title}>SLC</div>
          </button>
        </li>
        <li style={styles.list}>
          <button
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cacccf')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e1e3e6')}
          >
            <div style={styles.title}>RCH</div>
          </button>
        </li>
      </ul>   
       </div>
    </div>
  );
}

