import {
  IonAlert,
  IonBadge,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

import { Redirect } from "react-router";
import {
  airplane,
  arrowForwardCircle,
  filterOutline,
  flag,
  radio,
  snowOutline,
  water,
} from "ionicons/icons";
import { fireEvent } from "@testing-library/dom";
import { useState } from "react";
import {} from "ionicons/icons";

const Expense: React.FC = () => {
  const [userInput, setUsserInput] = useState("");
  //string[] is stating that the array is of type string
  //the [] in the round brackets initiate it to an empty array
  const [TotaluserInput, setTotalUsserInput] = useState<string[]>(() => {
    const storedArray = localStorage.getItem("inputArray");
    return storedArray ? JSON.parse(storedArray) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  //* Working toogleColor
  const [toolBarColor, setToolBarColor] = useState(() => {
    const storedColor = localStorage.getItem("toolBarColor");
    return storedColor ? storedColor : "tertiary";
  });

  const [TitleInput, setTitleInput] = useState(() => {
    const savedTitle = localStorage.getItem("TitleInput");
    //* Condition ? value if true : value if false
    return savedTitle ? savedTitle : "Nathan Attard";
  });

  const HandleInput = (event: CustomEvent) => {
    setUsserInput(event.target.value);  
  };

  const deleteItemss = (index: number) => {
    const newTotalUserInput = TotaluserInput.filter((item, index2) => {
      console.log(index2 , index)
      return index2 != index;
    });
    localStorage.setItem("inputArray", JSON.stringify(newTotalUserInput));
    setTotalUsserInput(newTotalUserInput);
  };

  const AddItem = () => {
    if (userInput === "") {
      return setIsOpen(true);
    }

    const array = [...TotaluserInput, userInput];
    setTotalUsserInput(array);
    localStorage.setItem("inputArray", JSON.stringify(array));
  };

  const handleDrag = (event: CustomEvent, index: number) => {
    const amount = event.detail.amount;
    console.log("plwork = ", amount);

    if (amount > 100) {
      const newTotalUserInput = TotaluserInput.filter((item, index2) => {
        return index2 != index;
      });

      localStorage.setItem("inputArray", JSON.stringify(newTotalUserInput));
      event.target.close();
      setTotalUsserInput(newTotalUserInput);
    }
  };

  const renderBadge = () => {
    localStorage.setItem("Expense Number", JSON.stringify(TotaluserInput.length));
    if (TotaluserInput.length > 0) {

      return TotaluserInput.length
      
    }

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={toolBarColor}>
          <IonTitle color={"light"} className="ion-text-center">
            <b>Expense tracker</b>
          
            <IonBadge color={"danger"} className="ion-margin-start ion-text-center " style={{ borderRadius: "45%" }}>
              {renderBadge()}
            </IonBadge>
            
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonList>
          {TotaluserInput.map((item, index) => (
            <IonItem>
              <IonItemSliding onIonDrag={(event) => handleDrag(event, index)}>
                <IonItem>
                  <IonLabel id={`item${index}`}>{item}</IonLabel>

                  <IonButton
                    id={`chk${index}`}
                    slot="end"
                    onClick={() => deleteItemss(index)}
                    color={"danger"}
                  >
                    Delete
                  </IonButton>
                </IonItem>

                <IonItemOptions id={`slide${index}`}>
                  <IonText color={"danger"}>Swipe to delete</IonText>
                </IonItemOptions>
              </IonItemSliding>
            </IonItem>
          ))}
        </IonList>

        <IonAlert
          isOpen={isOpen}
          header="Error"
          message="You must enter an expense"
          buttons={["Ok"]}
          onDidDismiss={() => {
            setIsOpen(false);
          }}
        ></IonAlert>
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonInput
            placeholder="Add new expense"
            onIonInput={HandleInput}
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonBadge
            style={{ marginTop: "5px" }}
            id="test"
            color={toolBarColor}
            onClick={AddItem}
          >
            Add
          </IonBadge>
        </IonItem>
        <IonList className="ion-text-center ion-margin-bottom">
          <IonText>
            Registered to: <IonText color={toolBarColor}>{TitleInput} </IonText> 
          </IonText>
      
        </IonList>
      </IonFooter>
    </IonPage>
  );
};

export default Expense;
