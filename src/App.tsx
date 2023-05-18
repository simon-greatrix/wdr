import './App.css';
import React, {useState} from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CssBaseline from '@mui/material/CssBaseline';
import FaceIcon from '@mui/icons-material/Face';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryIcon from '@mui/icons-material/History';
import SvgIcon from '@mui/material/SvgIcon';

import {ReactComponent as D10SVG} from "./images/d10.svg";
import BasicRoller from "./BasicRoller";
import TabPanel from "./TabPanel";
import SkillRoller from "./SkillRoller";
import Statistics from "./Statistics";
import History from "./History";
import {Favourite, useLocalStorageForState} from "./AppState";
import Faves from "./Faves";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function D10Icon() {
  return (
      <SvgIcon component={D10SVG} viewBox={"0 0 512 512"}/>
  );
}


function App() {
  const [tab, setTab] = useState(0);

  const [basicDice, setBasicDice] = useState(5);
  const [basicDifficulty, setBasicDifficulty] = useState(6);
  const [basicScore, setBasicScore] = useState(" ? ");

  const [skillAttribute, setSkillAttribute] = useState("Dexterity");
  const [skillAbility, setSkillAbility] = useState("Brawl");
  const [skillForm, setSkillForm] = useState("Homid");
  const [skillDifficulty, setSkillDifficulty] = useState(6);
  const [skillScore, setSkillScore] = useState(" ? ");

  const [state, setState] = useLocalStorageForState("werewolf-dice-roller-v1");

  const getStatistic = (x: string) => state.statistics.get(x);
  const setStatistic = (x: string, y: number) => {
    const newState = state.clone();
    newState.statistics.set(x, y);
    setState(newState);
    return newState;
  };
  const addRoll = (x: number[]) => {
    const newState = state.addRoll(x);
    setState(newState);
  }
  const setFaves = (x: Favourite[]) => {
    const newState = state.clone();
    newState.favourites = x;
    setState(newState);
  }

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div className="App">
          <div className="menu">
            <Tabs value={tab} onChange={changeTab}>
              <Tab icon={<D10Icon/>}/>
              <Tab icon={<FaceIcon/>}/>
              <Tab icon={<FavoriteIcon/>}/>
              <Tab icon={<ManageAccountsIcon/>}/>
              <Tab icon={<HistoryIcon/>}/>
            </Tabs>
          </div>
          <TabPanel value={tab} index={0}>
            <BasicRoller
                addRoll={addRoll}
                dice={basicDice}
                setDice={setBasicDice}
                difficulty={basicDifficulty}
                setDifficulty={setBasicDifficulty}
                score={basicScore}
                setScore={setBasicScore}
            />
          </TabPanel>

          <TabPanel index={1} value={tab}>
            <SkillRoller
                getStatistic={getStatistic}
                addRoll={addRoll}
                attribute={skillAttribute}
                setAttribute={setSkillAttribute}
                ability={skillAbility}
                setAbility={setSkillAbility}
                form={skillForm}
                setForm={setSkillForm}
                difficulty={skillDifficulty}
                setDifficulty={setSkillDifficulty}
                score={skillScore}
                setScore={setSkillScore}
            />
          </TabPanel>

          <TabPanel index={2} value={tab}>
            <Faves
                favourites={state.favourites}
                setFavourites={setFaves}
                setAbility={setSkillAbility}
                setAttribute={setSkillAttribute}
                setDifficulty={setSkillDifficulty}
                toRollerTab={() => setTab(1)}
            />
          </TabPanel>

          <TabPanel index={3} value={tab}>
            <Statistics getStatistic={getStatistic} setStatistic={setStatistic}/>
          </TabPanel>

          <TabPanel index={4} value={tab}>
            <History rolls={state.history}/>
          </TabPanel>

          <TabPanel index={5} value={tab}>Settings</TabPanel>

        </div>
      </ThemeProvider>
  );
}

export default App;
