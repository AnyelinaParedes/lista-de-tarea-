import React from "react";
import { Select, Input, Button, Grid, Header, Icon } from "semantic-ui-react";
import { useState } from "react";
import {v4 as uuidv4 } from "uuid"

const options = [
  {key: "Deporte", text: "Deporte", value: "Deporte"},
  {key: "Casa", text: "Casa", value: "Casa"},
  {key: "Oficina", text: "Oficina", value: "Oficina"},
  {key: "Estudio", text: "Estudio", value: "Estudio"},
  {key: "Deporte", text: "Deporte", value: "Deporte"},
]




export default function InputTask(props) {
  const [task, setTask] = useState ({
    idTask: "",
    taskName: "",
    CategoryTask:""
  });
  //recuperando los input y selectores //
const [error, setError] =useState(false);
const { createTask} =props;

const onChangeTask =(e) => {
  setTask({
    ...task,
    [e.target.name]: e.target.value
  });
};

const onChangeCategoryTask = (e, data) =>{
  setTask({
    ...task,
    [data.name] : data.value 
  });
};

const onSubmitTask = (e) => {
  // que no recargue la página
  e.preventDefault();

  // validación
  if (task.taskName.trim() === "") {
    setError(true);
    return;
  }

  // eliminar el mensaje previo
  setError(false);

  // asignar un ID
  task.idTask = uuidv4();

  // crear la tarea
  createTask(task);

  // limpiar los inputs
  setTask({
    idTask: "",
    taskName: "",
    categoryTask: "",
  });
};

  return (
    <>
      <Grid centered columns={2}>
        <Input type="text" action>
          <Input
            size="small"
            icon="add"
            placeholder="Escribe tu tarea.."
            iconPosition="left"
            name="taskName"
            value={task.taskName}
            onChange={onChangeTask}
          />
          <Select
            compact
            options={options}
            className="select-from-task"
            name="categoryTask"
            placeholder="Categoria"
            value={task.CategoryName}
            onChange={onChangeCategoryTask}
          />


      <Button type="submit" color="green" onClick={onSubmitTask}>Añadir tarea</Button>
        </Input>
      </Grid>
      {error && (
        <Grid centered>
          <header as="h4" color="red" className="alert-error-form">
            <Icon name="close" />
            <Header.Content>La tarea es obligatoria</Header.Content>
            <Icon name="close"/>
          </header>
        </Grid>
      )}
    </>
  );
}
