import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          hidden={value !== index}
          {...other}
      >
        {value === index && (<div>{children}</div>)}
      </div>
  );
}