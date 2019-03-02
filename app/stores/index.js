import { observable } from 'mobx'
import AppStore from './AppStore'
import remotedev from 'mobx-remotedev'

function createStores() {
  const app = remotedev(new AppStore());
  const s = observable({
    app,
  });

  return s;
}

export default createStores
