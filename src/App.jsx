import './App.css';
import { useStore } from './hooks/useStore';

const App = () => {
  
  const {users} = useStore();
  console.log("Users: ", users)
  return (
      <div></div>
  )
}

export default App;
