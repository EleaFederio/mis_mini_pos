

import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import Add from "./Add";
import TransactionList from "./TransactionList";
import Report from "./Report";
import Header from "./components/header";

function App() {

    const url = 'http://127.0.0.1:8000';

  return (
   <BrowserRouter>
       <Header url={url} />
       <Route path={'/'} exact component={Main}></Route>
       <Route path={'/add'} component={Add}></Route>
       <Route path={'/transactions'} component={TransactionList}></Route>
       <Route
           path={'/reports'}
           component={Report}
           // render={() => (
           //     <Report
           //         url={url}
           //     />
           // )}
           // exact
       />
   </BrowserRouter>
  );
}

export default App;
