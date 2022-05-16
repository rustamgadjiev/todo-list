import './App.css';
import { Header } from './components/Header/Header';
import { Tasks } from './components/Tasks/Tasks';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Tasks />
    </div>
  );
}
