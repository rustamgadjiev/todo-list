import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./AddForm.module.css";
import { createTodo } from "../../../store/slices/todos";

export const AddForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTodo(title)).finally(
      () => setTitle('')
    );
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новый элемент списка"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
