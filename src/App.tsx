import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import AnimalsAdoption from "./pages/AnimalsAdoption";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/faq" component={FAQ} />
        <Route path="/animais-adocao" component={AnimalsAdoption} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
