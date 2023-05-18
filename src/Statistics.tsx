import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import TabPanel from "./TabPanel";
import {ListOfAbilities, ListOfAttributes} from "./Constants";


export interface StatisticsProps {
  getStatistic: (x: string) => number;
  setStatistic: (x: string, y: number) => void;
}

const Dots = [
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
      </svg>
  ),
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
      </svg>
  ),
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
      </svg>
  ),
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
      </svg>
  ),
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="black"/>
      </svg>
  ),
  (
      <svg viewBox={"0 0 250 50"} height={"1em"} preserveAspectRatio="xMidYMid meet">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="75" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="125" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="175" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
        <circle cx="225" cy="25" r="20" stroke="white" strokeWidth="1" fill="white"/>
      </svg>
  )
];

interface StatChooserProps {
  attribute: string;
  getStatistic: (x: string) => number;
  setStatistic: (x: string, y: number) => void;
}

function StatChooser(props: StatChooserProps) {
  function handleChange(e: SelectChangeEvent<any>) {
    props.setStatistic(props.attribute, e.target.value);
  }

  return (
      <Select value={props.getStatistic(props.attribute)} onChange={handleChange} variant={"outlined"}>
        <MenuItem value={0}>{Dots[0]}</MenuItem>
        <MenuItem value={1}>{Dots[1]}</MenuItem>
        <MenuItem value={2}>{Dots[2]}</MenuItem>
        <MenuItem value={3}>{Dots[3]}</MenuItem>
        <MenuItem value={4}>{Dots[4]}</MenuItem>
        <MenuItem value={5}>{Dots[5]}</MenuItem>
      </Select>
  )
}

function generateRows(key: string, attributes: string[], props: StatisticsProps) {
  function names(attributes: string[]) {
    return attributes.map((attr, index) => {
      let cn = "statGridLeft statGridRow" + (index + 1);
      let k = "sgl-" + key + "-" + index;
      return (
          <div key={k} className={cn}>{attr}</div>
      );
    });
  }

  function values(attributes: string[], props: StatisticsProps) {
    return attributes.map((attr, index) => {
      let cn = "statGridRight statGridRow" + (index + 1);
      let k = "sgr-" + key + "-" + index;
      return (
          <div key={k} className={cn}><StatChooser attribute={attr} setStatistic={props.setStatistic} getStatistic={props.getStatistic}/></div>
      );
    });
  }

  let cnRoot = "statGrid" + attributes.length + " statGridHolderColumn";
  return (
      <div key={key} className={cnRoot}>
        {names(attributes)}
        {values(attributes, props)}
      </div>
  );
}


export default function Statistics(props: StatisticsProps) {
  const [tab1, setTab1] = React.useState(0);
  const [tab2, setTab2] = React.useState(0);
  const [tab3, setTab3] = React.useState(0);
  const changeTab1 = (event: React.SyntheticEvent, newValue: number) => {
    setTab1(newValue);
  };
  const changeTab2 = (event: React.SyntheticEvent, newValue: number) => {
    setTab2(newValue);
  };
  const changeTab3 = (event: React.SyntheticEvent, newValue: number) => {
    setTab3(newValue);
  };

  return (
      <div className="statistics">
        <Tabs value={tab1} onChange={changeTab1} centered>
          <Tab label={"Attributes"}/>
          <Tab label={"Abilities"}/>
        </Tabs>
        <TabPanel index={0} value={tab1}>
          <Tabs value={tab2} onChange={changeTab2} centered>
            <Tab label={"Physical"}/>
            <Tab label={"Social"}/>
            <Tab label={"Mental"}/>
          </Tabs>
          <TabPanel index={0} value={tab2}>
            {generateRows("Physical", ListOfAttributes.slice(0, 3), props)}
          </TabPanel>
          <TabPanel index={1} value={tab2}>
            {generateRows("Social", ListOfAttributes.slice(3, 6), props)}
          </TabPanel>
          <TabPanel index={2} value={tab2}>
            {generateRows("Mental", ListOfAttributes.slice(6, 9), props)}
          </TabPanel>
        </TabPanel>
        <TabPanel index={1} value={tab1}>
          <Tabs value={tab3} onChange={changeTab3} centered>
            <Tab label={"Talents"}/>
            <Tab label={"Skills"}/>
            <Tab label={"Knowledge"}/>
          </Tabs>
          <TabPanel index={0} value={tab3}>
            {generateRows("Talents", ListOfAbilities.slice(0, 10), props)}
          </TabPanel>
          <TabPanel index={1} value={tab3}>
            {generateRows("Skills", ListOfAbilities.slice(10, 20), props)}
          </TabPanel>
          <TabPanel index={2} value={tab3}>
            {generateRows("Knowledge", ListOfAbilities.slice(20, 30), props)}
          </TabPanel>
        </TabPanel>
      </div>
  );
}