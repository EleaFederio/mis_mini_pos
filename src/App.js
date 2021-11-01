import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import Add from "./Add";
import TransactionList from "./TransactionList";
import Report from "./Report";
import Header from "./components/header";
import {useState} from "react";

function App() {

    const url = 'http://127.0.0.1:8000';
    // const url = 'https://mis-pos.herokuapp.com';
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] =useState(1);

  return (
   <BrowserRouter>
       <Header url={url} branches={branches} setBranches={setBranches} setBranch={setBranch} />
       <Route path={'/'}  exact
              render={() => (
                  <Main
                      url={url}
                      branch={branch}
                  />
              )}
       />
       <Route path={'/add'}
              render={() => (
                  <Add
                      url={url}
                  />
              )}
              exact
       />
       <Route path={'/transactions'}
              render={() => (
                  <TransactionList
                      url={url}
                  />
              )}
       />
       <Route  path={'/reports'}
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
