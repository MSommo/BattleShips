import io from "socket.io-client";
import { useState, useEffect } from "react";
import { getCurrentTime } from "../helpers";
const socket = io("localhost:3001");

const useGame = () => {
  const [state, setState] = useState(0);
  const [messages, setMessages] = useState([
    { time: getCurrentTime(), content: "Welcome to Battleship!" },
  ]);
  const [myShips, setMyShips] = useState([]);
  const [opponentShips, setOpponentShips] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [gotInitialOpponent, setGotInitialOpponent] = useState(false);
  const [haveSendInitialMsg, setHaveSendInitialMsg] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("opponent", (data) => {
      if (!gotInitialOpponent) setGotInitialOpponent(true);
      setOpponent(data);
      if (!data) setState(0);
    });

    setMyShips([
      { name: "Carrier", destroyed: true },
      { name: "Battleship", destroyed: true },
      { name: "Cruiser", destroyed: false },
      { name: "Submarine", destroyed: false },
      { name: "Destroyer", destroyed: true },
    ]);

    setOpponentShips([
      { name: "Carrier", destroyed: true },
      { name: "Battleship", destroyed: false },
      { name: "Cruiser", destroyed: true },
      { name: "Submarine", destroyed: false },
      { name: "Destroyer", destroyed: false },
    ]);

    return () => {
      socket.off("connect");
      socket.off("opponent");
    };
  }, []);

  useEffect(() => {
    if (gotInitialOpponent) {
      if (opponent && !haveSendInitialMsg) {
        setMessages((prev) => [
          ...prev,
          {
            time: getCurrentTime(),
            content: "Another player is already in the room. The game is on!",
          },
        ]);
      }

      if (!opponent && !haveSendInitialMsg) {
        setMessages((prev) => [
          ...prev,
          {
            time: getCurrentTime(),
            content:
              "There is no player in the room. Waiting for another player...",
          },
        ]);
      }

      if (opponent && haveSendInitialMsg) {
        setMessages((prev) => [
          ...prev,
          {
            time: getCurrentTime(),
            content: "Another player has entered the game. The game is on!",
          },
        ]);
      }

      if (!opponent && haveSendInitialMsg) {
        setMessages((prev) => [
          ...prev,
          {
            time: getCurrentTime(),
            content: "The other player left. Waiting for another player...",
          },
        ]);
      }

      if (!haveSendInitialMsg) setHaveSendInitialMsg(true);
    }
  }, [opponent]);

  const newGame = () => {
    socket.emit("newGame");
    setMessages([
      { time: getCurrentTime(), content: "Welcome to Battleship!" },
    ]);
    setState(0);
    setGotInitialOpponent(false);
    setHaveSendInitialMsg(false);
  };
  
  return { state, messages, myShips, opponentShips, newGame };
};

export default useGame;
