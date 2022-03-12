import React from "react";
import Header from "./Containers/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductList from "./Containers/ProductList";
import ProductDetail from "./Containers/ProductDetails";
export default class App extends React.Component {
    render() {
        return (
            <div className="App ">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ProductList} />
                        <Route path="/product/:productId" component={ProductDetail} />
                        <Route >404 Not Found!</Route>
                    </Switch>
                </Router>
            </div>
        )
    }
} 
