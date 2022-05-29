import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AlertIcon } from "../../assets/img/icons/alert.svg";
import {
  multipleDeletionTodo,
  fetchTodos,
  selectTodos,
} from "../../store/slices/todos";
import { Task } from "./Task/Task";
import s from "./Tasks.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Tasks = () => {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector(selectTodos);
  const [allChecked, setAllChecked] = useState(false);
  const [selectedTodosId, setSelectedTodosId] = useState([]);

  const handleAllCheckChange = (e) => setAllChecked(e.target.checked);

  const { confirm } = Modal;

  const handleMultipleDeletion = () => {
    confirm({
      title: "Вы точно хотите удалить эти элементы?",
      icon: <ExclamationCircleOutlined />,
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      onOk() {
        dispatch(multipleDeletionTodo(selectedTodosId)).finally(() => {
          setAllChecked(false);
          setSelectedTodosId([]);
        });
      },
    });
  };

  useEffect(() => {
    if (allChecked) {
      setSelectedTodosId(todos.map((todo) => todo.id));
    } else {
      setSelectedTodosId([]);
    }
  }, [allChecked, todos]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTodosId.length && selectedTodosId.length === todos.length) {
      setAllChecked(true);
    } else if (selectedTodosId.length === 0 && todos.length) {
      setAllChecked(false);
    }
  }, [selectedTodosId, setAllChecked, todos]);

  const antIconIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (isLoading) {
    return (
      <div className={s.loading}>
        <Spin indicator={antIconIndicator} />
      </div>
    );
  }

  return (
    <section className={s.tasks}>
      <div className="container">
        <h2 className={s.title}>Задачи</h2>
        {todos.length === 0 ? (
          <div className={s.alert}>
            <AlertIcon />
            <div className={s.alert__content}>
              <div className={s.message}>Список задач пуст!</div>
              <div className={s.description}>Добавьте новую задачу.</div>
            </div>
          </div>
        ) : (
          <>
            <Checkbox onChange={handleAllCheckChange} checked={allChecked} indeterminate={(todos.length > selectedTodosId.length) && selectedTodosId.length > 0}>
              Выделить все
            </Checkbox>
            <div className={s.content}>
              {todos.map((todo) => {
                return (
                  <Task
                    key={todo.id}
                    {...todo}
                    allChecked={allChecked}
                    selectedTodosId={selectedTodosId}
                    setSelectedTodosId={setSelectedTodosId}
                  />
                );
              })}
            </div>
            {selectedTodosId.length > 0 && (
              <button className={s.deleteBtn} onClick={handleMultipleDeletion}>
                Удалить выделенные
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
