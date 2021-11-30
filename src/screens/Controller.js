import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import {BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import GlobalProvider from "../common/store";
import Header from "../common/header/Header";

const Controller = () => {
    const baseUrl = "/api/v1/";
    return (
        <Router>
            <GlobalProvider>
                <div className="main-container">
                    <Header baseUrl={window.location.pathname} />
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl}/>}
                    />
                    <Route
                        path="/movie/:id"
                        render={(props) => <Details {...props} baseUrl={baseUrl}/>}
                    />
                    <Route
                        path="/bookshow/:id"
                        render={(props) => <BookShow {...props} baseUrl={baseUrl}/>}
                    />
                    <Route
                        path="/confirm/:id"
                        render={(props) => <Confirmation {...props} baseUrl={baseUrl}/>}
                    />
                </div>
            </GlobalProvider>


        </Router>
    );
};

export default Controller;
