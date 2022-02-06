import React from "react";
import "./Log.css";
import LogListItem from "./LogListItem";
import NewGameButton from "./NewGameButton";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const LogList = ({ messages, newGame }) => {
  const log = useScrollToBottom(messages);

  const elms = messages.map(({ time, content }, index) => {
    return <LogListItem {...{ time, content, key: index }} />;
  });

  return (
    <div className="log-display">
      <NewGameButton {...{ newGame }} />
      <div className="logs" ref={log}>
        {elms}
      </div>
    </div>
  );
};

export default LogList;
