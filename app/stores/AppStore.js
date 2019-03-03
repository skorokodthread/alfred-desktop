import { observable, action, autorun, computed } from 'mobx'
import * as axios from 'axios';


class AppStore {
  @observable shit = false

  @observable header = 'Heyyy from mobx'

  @observable page = 0

  @observable tab = 'all'

  @observable threads = []

  @observable deletedThreads = []

  @observable favoriteThreads = []

  @observable URL = process.env.NODE_ENV === 'production' ? 'https://someapi.com' : 'http://localhost:4000'

  @observable loading = false

  getThreads = async () => {
    const res = await axios.get(`${this.URL}/api/2ch/threads?page=${this.page}`)
    console.log(`Res`, res.data)
    this.threads = res.data.threads
    this.deletedThreads = res.data.deleted_threads
  }

  @computed
  get currentThreads() {
    switch (this.tab) {
      case 'favorites': return this.favoriteThreads;
      case 'deleted': return this.deletedThreads
      default: return this.threads
    }
  }
}

export default AppStore

