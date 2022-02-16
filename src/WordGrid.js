import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import ReactDataGrid from 'fixed-react-data-grid';
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
 

export default function WordGrid({ grid, themes }) {

  const cellStyle = (letter) => {
    return({
      backgroundColor: letter.color, 
      height: 60,
      width: 60,  
      border: '3px solid',
      borderColor: letter.color == "white" ? "rgb(133, 128, 128)" : letter.color,
      fontSize:50,
    });
  };


  return (

    <div style={{ display: 'inline-block' }}>
      <div
        style={{
          display: 'grid',    
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 10,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            return(
              <div key = {rowIdx.toString().concat(", ", colIdx.toString())} style={cellStyle(cell)}>{cell.value?cell.value.toUpperCase():cell.value}</div>
            );
          })
        )}
      </div>
    </div>
  )
}

