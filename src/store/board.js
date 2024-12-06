import { types, flow } from "mobx-state-tree";
import ApiCall from "../api";


const Task = types.model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.string
});

const BoardSection = types.model("BoardSection", {
    id: types.identifier,   
    title: types.string,
    tasks: types.array(Task)
});

const Board = types.model("Board", {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection)
});

const api = ApiCall("http://localhost:3001");

const BoardStore = types.model("BoardStore", {
   boards: types.array(Board)
}).actions((self) => {
    return {
        load: flow(function* () {
            try {
                const response = yield api.get("boards");
                console.log("response: ", response)
                self.boards = Array.isArray(response) ? response : response.boards;
            } catch (error) {
                console.log("Failed to load boards: ", err);  
            }          
        }),
        afterCreate() {
            self.load();
        }
    }
})

export default BoardStore;