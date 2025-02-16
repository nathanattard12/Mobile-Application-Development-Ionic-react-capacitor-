import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Redirect, Route } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import {
  playCircle,
  radio,
  library,
  search,
  flag,
  settings,
  atCircle,
  cardOutline,
  cardSharp,
} from "ionicons/icons";
import { configure } from "@testing-library/dom";
import TabOne from "./Expense";
import TabTwo from "./Preferences";
import Expense from "./Expense";
import Preferences from "./Preferences";


const Home: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/tabs" to="/tabs/Expense"></Redirect>

        <Route exact path="/tabs/Expense">
          <Expense />
        </Route>

        <Route exact path="/tabs/Preferences">
          <Preferences />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/Expense">
          <label>Expenses  </label>
          <IonIcon icon={cardSharp} />

        </IonTabButton>

        <IonTabButton tab="search" href="/tabs/Preferences">
          <IonIcon icon={settings} />

          <IonLabel>Preferences</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Home;
