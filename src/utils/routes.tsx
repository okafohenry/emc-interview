import React from "react";
import { RouteObject } from "react-router-dom";
import { Home, Inbox, Message } from "../pages";


const routes: RouteObject[] = [
    { path: '/', element: <Home/> },
    { path: '/inbox', element: <Inbox /> },
    { path: '/message/:id', element: <Message /> }
];

export { routes };
