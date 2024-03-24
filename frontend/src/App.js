import { Container } from 'react-bootstrap'
import Footer from './components/Footer';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>

      <Header />
      <main className='py-3'>

      <Container>
        <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen/>} />
        <Route path='/cart/:id?' element={<CartScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />


        </Routes>
      </Container>
      </main>

      <Footer />
     
      </BrowserRouter>

  );
}

export default App;
