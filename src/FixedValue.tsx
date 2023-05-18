import React from "react";
import {type SvgIconProps} from "@mui/material/SvgIcon";
import SvgIcon from "@mui/material/SvgIcon";

interface FixedValueProps extends SvgIconProps {
  value: string | number;
}

function FixedValue(props: FixedValueProps) {
  return (
      // NB: need to set width and height to 100% to get full size as CSS overrides the SVG default size and MUI sets it to 1em
      <SvgIcon viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" sx={{height:"100%", width:"100%"}} {...props}>
        <text fontSize="18" x="50%" y="50%" dy=".09em" fontFamily="Noto Sans, Noto Emoji" dominantBaseline="middle"
              textAnchor="middle">{props.value}</text>
      </SvgIcon>
  );
}

export default FixedValue;