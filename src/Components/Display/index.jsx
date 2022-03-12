import React from "react";
import Board from "./Board/";
import "./Display.css";

const Display = ({
  myShips,
  opponentShips,
  showOpponentOverlay,
  showMyOverlay,
  showConfirmCancelButtons
}) => {
  return (
    <div className="display">
      <Board
        {...{
          myBoard: true,
          ships: myShips,
          overlaySettings: showMyOverlay,
          title: "Your Board",
          showConfirmCancelButtons
        }}
      />

      <Board
        {...{
          myBoard: false,
          ships: opponentShips,
          overlaySettings: showOpponentOverlay,
          title: "Opponent's Board",
        }}
      />
    </div>
  );
};

export default Display;
