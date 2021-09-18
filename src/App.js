

import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import Add from "./Add";
import TransactionList from "./TransactionList";

function App() {

  return (
   <BrowserRouter>
       <Route path={'/'} exact component={Main}></Route>
       <Route path={'/add'} component={Add}></Route>
       <Route path={'/transactions'} component={TransactionList}></Route>
   </BrowserRouter>
  );
}

export default App;
