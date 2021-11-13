import { useContext } from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import { AuthContext, AuthContextProvider } from './contexts/AuthContext';

import { Page404 } from './pages/Page404';
import { Home } from './pages/Home';
import { FAQ } from './pages/FAQ';
import { TermsOfUse } from './pages/TermsOfUse';
import { AnimalsAdoption } from './pages/AnimalsAdoption';
import { AnimalProfile } from './pages/AnimalProfile';

import { NewReservationQuiz } from './pages/NewReservationQuiz';
import { UserProfile } from './pages/UserProfile';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { SendForgotPasswordResetMail } from './pages/SendForgotPasswordResetMail';

import { Dashboard } from './pages/Dashboard';
import { ManageReservations } from './pages/ManageReservations';
import { ManageQuiz } from './pages/ManageQuiz';
import { ManageUsers } from './pages/ManageUsers';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ManageAnimals } from './pages/ManageAnimals';
import { CreateAnimal } from './pages/CreateAnimal';
import { EditAnimal } from './pages/EditAnimal';
import { ResetPassword } from './pages/ResetPassword';

interface ICustomRouteData extends RouteProps {}

function AuthRoute({ ...rest }: ICustomRouteData) {
  const { loading, authenticated } = useContext(AuthContext);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

function ProtectedRoute({ ...rest }: ICustomRouteData) {
  const { loading, authenticated, userType } = useContext(AuthContext);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (userType === 'admin' || userType === 'volunteer') {
    return <Route {...rest} />;
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }
  return <Redirect to="/login" />;
}

function AdminRoute({ ...rest }: ICustomRouteData) {
  const { loading, authenticated, userType } = useContext(AuthContext);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (userType === 'admin') {
    return <Route {...rest} />;
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return <Redirect to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/termos-de-uso" component={TermsOfUse} />

          <Route path="/login" component={SignIn} />
          <Route path="/cadastre-se" component={SignUp} />
          <Route
            path="/esqueci-minha-senha"
            component={SendForgotPasswordResetMail}
          />
          <Route path="/reset-password" component={ResetPassword} />

          <Route path="/animais-adocao" component={AnimalsAdoption} />
          <Route path="/animal/:animal_id" component={AnimalProfile} />

          <AuthRoute path="/adotar/:animal_id" component={NewReservationQuiz} />
          <AuthRoute path="/meus-dados" component={UserProfile} exact />

          <ProtectedRoute path="/app" exact component={Dashboard} />
          <ProtectedRoute
            path="/app/reserva/:reservation_id"
            component={ManageQuiz}
          />
          <ProtectedRoute
            path="/app/reservas"
            component={ManageReservations}
            exact
          />
          <ProtectedRoute path="/app/animais" component={ManageAnimals} exact />
          <AdminRoute path="/app/usuarios" component={ManageUsers} exact />
          <ProtectedRoute
            path="/app/animal/novo"
            component={CreateAnimal}
            exact
          />
          <ProtectedRoute
            path="/app/animal/:animal_id"
            component={EditAnimal}
          />

          <Route path="*" component={Page404} />
        </Switch>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
