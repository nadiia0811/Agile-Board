import './App.css';
import { useStore } from './hooks/useStore';
import { observer } from 'mobx-react-lite';


const App = () => {
  
  const {users, boards} = useStore();
  console.log("Users: ", users.toJSON())
  console.log("Boards: ", boards.toJSON())
 
  return (
      <div></div>
  )
}

export default observer(App);
