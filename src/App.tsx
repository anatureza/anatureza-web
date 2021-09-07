import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Home } from "./pages/Home";
import { FAQ } from "./pages/FAQ";
import { AnimalsAdoption } from "./pages/AnimalsAdoption";
import { AnimalProfile } from "./pages/AnimalProfile";

import { NewReservationQuiz } from "./pages/NewReservationQuiz";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

import { Dashboard } from "./pages/Dashboard";
import { ManageReservation } from "./pages/ManageReservation";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ManageAnimals } from "./pages/ManageAnimals";
import { CreateAnimal } from "./pages/CreateAnimal";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />

          <Route path="/signin" component={SignIn} />
          <Route path="/cadastre-se" component={SignUp} />

          <Route path="/animais-adocao" component={AnimalsAdoption} />
          <Route path="/animal/:id" component={AnimalProfile} />

          <Route path="/adotar/:animal_id" component={NewReservationQuiz} />

          <Route path="/app" exact component={Dashboard} />
          <Route path="/app/reservas" component={ManageReservation} />
          <Route path="/app/animais" component={ManageAnimals} />
          <Route path="/app/animal/" component={CreateAnimal} />
        </Switch>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
