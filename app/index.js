import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react'
import './app.global.css';
import './fonts/index.css';
import createStores from './stores'
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
const stores = createStores()

render(
  <AppContainer>
    <Provider {...stores}>
      <Router>
        <MainPage />
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)


installExtension(REDUX_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
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
