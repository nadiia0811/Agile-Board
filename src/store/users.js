import { flow, types } from "mobx-state-tree";
import ApiCall from "../api";


const User = types.model("User", {
    id: types.identifier,
    createdAt: types.string,
    name: types.string,
    avatar: types.string,
});

const api = ApiCall("http://localhost:3001");

const UsersStore = types.model("UsersStore", {
  users: types.maybe(types.array(User), [])
}).actions(
    (self) => {
      return {
       
        load: flow(function*(){
              try {
                const response = yield api.get("users");
                self.users = Array.isArray(response) ? response: response.users;
              } catch (err) {
                console.log("Failed to load users: ", err);
              }
              }),  
        afterCreate() {
          self.load()
        },     
      }       
    });

export default UsersStore;