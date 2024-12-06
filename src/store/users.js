import { flow, types } from "mobx-state-tree";
import ApiCall from "../api";


const User = types.model("User", {
    id: types.identifier,
    createdAt: types.string,
    name: types.string,
    avatar: types.string,
});

const ActiveUser = User.named("ActiveUser");

const api = ApiCall("http://localhost:3001");

const UsersStore = types.model("UsersStore", {
  users: types.maybe(types.array(User), []),
  me: types.maybe(ActiveUser)
}).actions(
    (self) => {
      return {
       
        load: flow(function*(){
              try {
                const response = yield api.get("users");
                self.users = Array.isArray(response) ? response: response.users;
                self.me = yield api.get("me");
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