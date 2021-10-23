

import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import Add from "./Add";
import TransactionList from "./TransactionList";
import Report from "./Report";

function App() {

    const url = 'http://127.0.0.1:8000';

  return (
   <BrowserRouter>
       <Route path={'/'} exact component={Main}></Route>
       <Route path={'/add'} component={Add}></Route>
       <Route path={'/transactions'} component={TransactionList}></Route>
       <Route
           path={'/reports'}
           render={() => (
               <Report
                   url={url}
               />
           )}
           exact
       />
   </BrowserRouter>
  );
}

export default App;
