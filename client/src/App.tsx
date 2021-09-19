import 'react-dropzone-uploader/dist/styles.css';
import React from 'react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Index } from './components/Index';
import { Navbar } from './components/nav/Navbar';
import { SelectedProduct } from './components/products/productPage/SelectedProduct';
import { useAppDispatch } from './hooks/hooks';
import { CartIndex } from './components/cart/CartIndex';
import { CheckoutIndex } from './components/cart/checkout/CheckoutIndex';
import { initializeCart } from './app/cart/cartSlice';
import { ProfileIndex } from './components/user/profile/ProfileIndex';
import { OrderIndex } from './components/user/orders/OrderIndex';
import { AdminIndex } from './components/admin/AdminIndex';
import { AddUpdateProduct } from './components/admin/inventory/AddUpdateProduct';
import { AddUpdateUser } from './components/admin/users/AddUpdateUser';
import { Footer } from './components/Footer';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { me } from './app/user/userActions';

function App() {
  const dispatch = useAppDispatch();

  //MUCHA MEJOR FORMA DE PERSISTIR AUTENTICACION LOL
  const checkUserLoggedIn = React.useCallback(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      dispatch(me({ callback: () => {} }));
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeCart());
    checkUserLoggedIn();
  }, [dispatch, checkUserLoggedIn]);

  return (
    <Router>
      <Navbar />
      <Container padding={4} maxW='container.lg'>
        <Switch>
          <Route exact path='/'>
            <Index />
          </Route>
          <Route path='/product/:id' component={SelectedProduct} />
          <Route exact path='/cart' component={CartIndex} />
          <Route exact path='/cart/checkout' component={CheckoutIndex} />
          <Route exact path='/user/:userId' component={ProfileIndex} />
          <Route exact path='/user/:userId/orders' component={OrderIndex} />
          <Route exact path='/admin' component={AdminIndex} />
          <Route exact path='/auth/forgot_password' component={ForgotPassword} />
          <Route exact path='/auth/forgot_password/:token' component={ResetPassword} />
          <Route
            exact
            path={['/admin/inventory/:id', '/admin/inventory']}
            component={AddUpdateProduct}
          />
          <Route
            exact
            path={['/admin/user/:id', '/admin/user']}
            component={AddUpdateUser}
          />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
