

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "./components/SignIn";
import Account from "./components/Account"
import UserDetails from "./components/UserDetails"
import { useState } from "react"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useCustomContext from "./components/Hooks/useCustomContext"

const Stack = createNativeStackNavigator();
const Context = useCustomContext
const App = () => {
  const [dotsCond, setDotsCond] = useState(false)
  const [deleteIcon, setDeleteIcon] = useState(false)
  const [deleteIconClicked, triggerDeleteFunction] = useState(false)

  const dotsClicked = () => {
    setDotsCond(!dotsCond)
  }

  const ShowAndHideDeleteIcon = (value) => {
    setDeleteIcon(value)
  }

  const deleteSelectedAccount = () => {
    triggerDeleteFunction(!deleteIconClicked)
  }

  return (
    <Context.Provider value={{ cond: dotsCond, deleteIconCond: deleteIcon, deleteIconClicked, updateDeleteIconCond: ShowAndHideDeleteIcon, updateDotCond: dotsClicked, deleteSelectedAccount }}>
      <NavigationContainer style={{ backgroundColor: "red" }}>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: ''
            }}
          />
          <Stack.Screen name="Account" component={Account} />

          <Stack.Screen name="UserDetails" component={UserDetails}
            options={{
              headerStyle: {
                backgroundColor: '#047a72',
              },
              headerRight: () => (
                <>
                  {deleteIcon && <MaterialCommunityIcons name="delete" size={25} color="black" onPress={deleteSelectedAccount} />}
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="black" onPress={dotsClicked} />

                </>

              ),
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>

    </Context.Provider>

  );
};

export default App