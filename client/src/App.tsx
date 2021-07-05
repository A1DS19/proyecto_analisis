import React from 'react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Index } from './components/Index';
import { Navbar } from './components/nav/Navbar';
import { SelectedProduct } from './components/products/productPage/SelectedProduct';
import { useAppDispatch } from './hooks/hooks';
import { CartIndex } from './components/cart/CartIndex';
import { initializeCart } from './app/cart/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Container padding={4} maxW='container.lg'>
        <Switch>
          <Route exact path='/'>
            <Index />
          </Route>
          <Route path='/product/:id' component={SelectedProduct} />
          <Route path='/cart' component={CartIndex} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
