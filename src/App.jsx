import './App.css';
import { useStore } from './hooks/useStore';

const App = () => {
  
  const {users} = useStore();
  //console.log("Users: ", users)
  for (const key in users) {
    console.log(key, users[key]);
  }
  
  return (
      <div></div>
  )
}

export default App;
