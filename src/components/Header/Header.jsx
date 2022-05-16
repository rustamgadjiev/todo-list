import { AddForm } from "./AddForm/AddForm";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <h1>Список задач</h1>
        <AddForm />
      </div>
    </header>
  );
};
