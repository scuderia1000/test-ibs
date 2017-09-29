import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRouter from "./routes";

ReactDom.render(
    <MuiThemeProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
);