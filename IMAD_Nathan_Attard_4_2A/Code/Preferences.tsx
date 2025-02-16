import {
  IonBadge,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabs,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Redirect } from "react-router";
import { useState } from "react";

const Preferences: React.FC = () => {
  const [TitleInput, setTitleInput] = useState(() => {
    const savedTitle = localStorage.getItem("TitleInput");
    //* Condition ? value if true : value if false
    return savedTitle ? savedTitle : "Nathan Attard";
  })

  const [toolBarColor, setToolBarColor] = useState(() => {
    const storedColor = localStorage.getItem("toolBarColor");
    return storedColor ? storedColor : "tertiary"

  });

  const [toggleChecked, setToggleChecked] = useState(() => {
    return toolBarColor == "tertiary"
  });


  //*Done
  const toggle = () => {

    const newColor = toolBarColor == "tertiary" ? "medium" : "tertiary";
    setToggleChecked(!toggleChecked); 
    setToolBarColor(newColor);

    console.log(!toggleChecked) 

    localStorage.setItem("toolBarColor", newColor);
    localStorage.setItem("Checked",JSON.stringify(!toggleChecked))


  }




//* working title
  const HandleNewTitleInp = (event: CustomEvent) => {
    const newTitleInp = event.target.value;
    setTitleInput(newTitleInp);
    localStorage.setItem("TitleInput", event.target.value);
  };



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={toolBarColor}>
          <IonTitle className="ion-text-center">
            <b>Preferences</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonList>
            <IonLabel >Registered To:</IonLabel>
            <IonInput placeholder={TitleInput} onIonInput={HandleNewTitleInp}></IonInput>
          </IonList>
        </IonItem>

        <IonItem>
          <IonLabel> Color theme </IonLabel>
          <IonToggle checked={toggleChecked} onIonChange={toggle} slot="end" color={"tertiary"} ></IonToggle>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Preferences;
