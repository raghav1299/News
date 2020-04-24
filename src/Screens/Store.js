import { observable } from 'mobx';

class Store {
    @observable data = 0;
    @observable data1 = 0;
    @observable userData = 0;
}

export default new Store;