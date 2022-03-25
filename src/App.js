import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/User/homePage";
import Cart from "./pages/User/cartPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Detail from "./pages/User/productInfo";
import Order from "./pages/User/Order";
import AdminHome from "./pages/Admin/AdminHome";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact ><ProtectedRoutes><HomePage/></ProtectedRoutes></Route>
                        <Route path="/cart" ><ProtectedRoutes><Cart/></ProtectedRoutes></Route>
                        <Route path="/detail/:id"><ProtectedRoutes><Detail/></ProtectedRoutes></Route>
                        <Route path="/order"><ProtectedRoutes><Order/></ProtectedRoutes></Route>
                        <Route path="/admin"><ProtectedRoutes><AdminHome/></ProtectedRoutes></Route>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Router>
                
            </div>
        )
    }
} 

// here children refer to the props of the route.

export  const ProtectedRoutes = ({children})=>{
    if(localStorage.getItem("CurrentUser")){
        return children;
    }else{
       return <Login/>
    }
}