import s from "./Task.module.css";
import { ReactComponent as DeleteIcon } from "../../../assets/img/icons/delete.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../store/slices/todos";
import { Checkbox } from "antd";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const Task = ({
  title,
  id,
  allChecked,
  selectedTodosId,
  setSelectedTodosId,
}) => {
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (allChecked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [allChecked]);

  const handleCheckChange = (e) => {
    if (!checked) {
      setSelectedTodosId([...selectedTodosId, id]);
    } else {
      setSelectedTodosId(selectedTodosId.filter((i) => i !== id));
    }

    setChecked(e.target.checked);
  };

  const { confirm } = Modal;

  const handleDeleteClick = () => {
    confirm({
      title: 'Вы точно хотите удалить этот элемент?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        dispatch(deleteTodo(id));
      }
    });
  };

  return (
    <div className={s.task}>
      <Checkbox onChange={handleCheckChange} checked={checked}>{title}</Checkbox>
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
    </div>
  );
};
