import React from "react";

function Roll(props: { roll: number[] }) {
  const roll = [...props.roll];
  const diff = roll.shift() || 0;
  const dice = roll.length;
  const successes = roll.filter((x) => x >= diff).length;
  const botches = roll.filter((x) => x === 1).length;
  const total = successes - botches;
  const result = (total < 0) ? "💀" : total.toString();
  return (
      <React.Fragment>
        <div></div>
        <div style={{textAlign: "right"}}>{dice}d10</div>
        <div style={{textAlign: "left"}}>vs&nbsp;{diff}</div>
        <div style={{textAlign: "left"}}>{roll.map((r, i) => {
          let cn;
          if (r === 1) {
            cn = "historyBotch";
          } else if (r < diff) {
            cn = "historyMiss";
          } else {
            cn = "historySuccess";
          }
          if (i >= dice - botches) {
            cn = cn + " historyCancel";
          }
          return <React.Fragment><span key={i} className={cn}>{r}</span> </React.Fragment>;
        })}</div>
        <div>{result}</div>
        <div></div>
      </React.Fragment>
  );
}

export default function History(props: { rolls: number[][] }) {
  return (
      <div className={"historyGrid"}>
        <div></div>
        <div className={"historyTypeLabel"}><b><u>Type</u></b></div>
        <div style={{textAlign: "left"}}><b><u>Dice</u></b></div>
        <div><b><u>Result</u></b></div>
        <div></div>

        {props.rolls.map((roll, index) => <Roll key={index} roll={roll}/>)}
      </div>
  );
}