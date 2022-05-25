import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BookingScreen from "./screens/BookingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TicketListScreen from "./screens/TicketListScreen";
import TicketEditScreen from "./screens/TicketEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  const [search, setSearch] = useState("")
  const setSearchWord = (w) => {
    setSearch(w)
  }
  return (
    <Router>
      <Header search={search} setSearchWord={setSearchWord}/>
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/booking" component={BookingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/ticket/:id" component={TicketScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/ticketlist" component={TicketListScreen} exact />
          <Route
            path="/admin/ticketlist/:pageNumber"
            component={TicketListScreen}
            exact
          />
          <Route path="/admin/ticket/:id/edit" component={TicketEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" render={(props) => <HomeScreen {...props} search={search} />} exact />
          <Route path="/page/:pageNumber" render={(props) => <HomeScreen {...props} search={search} />} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            render={(props) => <HomeScreen {...props} search={search} />}
            exact
          />
          <Route path="/"  render={(props) => <HomeScreen {...props} search={search} />} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
