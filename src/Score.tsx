import React, {useEffect, useRef} from "react";

interface ValueProps {
  value: string | number;
  spinId: string;
}

function Score(props: ValueProps) {
  const spinId1 = "a1_" + props.spinId;
  const spinId2 = "a2_" + props.spinId;
  let oldValue = useRef("UNSET");
  useEffect(
      () => {
        let a1 = document.getElementById(spinId1);
        let a2 = document.getElementById(spinId2);
        if (a1 !== null && a1 instanceof SVGAnimateElement && a2 !== null && a2 instanceof SVGAnimateTransformElement) {
          let newValue = "" + props.value;
          if (oldValue.current !== "?" && newValue === "?") {
            a1.beginElement();
            a2.beginElement();
          }
          oldValue.current = newValue;
        }
      },
      [props.value, spinId1, spinId2]
  );

  return (
      <svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" height="100%" width="100%">
        <text fontSize="18" x="50%" y="50%" dy=".09em" fontFamily="Noto Sans, Noto Emoji" fill="white" dominantBaseline="middle"
              textAnchor="middle">
          <animate id={spinId1} attributeName="font-size" from="0" to="18" fill="freeze" dur="0.5s" begin="indefinite"/>
          <animateTransform
              id={spinId2}
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 10 10"
              to="360 10 10"
              dur="0.25s"
              repeatCount="2"
              begin="indefinite"/>
          {props.value}</text>
      </svg>
  );
}

export default Score;