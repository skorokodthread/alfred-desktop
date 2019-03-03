import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react'
import './app.global.css';
import './fonts/index.css';
import createStores from './stores'
import MainPage from './pages/MainPage'
import ThreadPage from './pages/ThreadPage'
import { HashRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
const stores = createStores()

render(
  <AppContainer>
    <Provider {...stores}>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/:id" component={ThreadPage} />
        </Switch>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)
//
// if (module.hot) {
//   module.hot.accept('./pages/MainPage', () => {
//     // eslint-disable-next-line global-require
//     render(
//       <AppContainer>
//         <Provider {...stores}>
//           <Router>
//             <MainPage />
//           </Router>
//         </Provider>
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }
