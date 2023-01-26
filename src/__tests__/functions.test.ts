/**
 * @jest-environment jsdom
 */

import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("addTodo", () => {
  test("add todo", () => {
    const todos: Todo[] = [];
    const todoText = "Wash ear";
    const result = addTodo(todoText, todos);
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(todoText);
    expect(todos[0].done).toBe(false);
    expect(result).toEqual({ success: true, error: "" });
  });

  test("addTodo returns error message when todo text is too short", () => {
    let todos: Todo[] = [];
    let todoText = "Go";
    let result = addTodo(todoText, todos);
    expect(todos.length).toBe(0);
    expect(result).toEqual({
      success: false,
      error: "Du måste ange minst tre bokstäver",
    });
  });
});

describe("changeTodo", () => {
  test("should change Todo", () => {
    const todo: Todo = {
      text: "wash toe",
      done: true,
    };

    changeTodo(todo);
    expect(todo.done).toBe(false);
    changeTodo(todo);
    expect(todo.done).toBe(true);
  });
});

describe("removeAllTodos", () => {
  test("should remove all todos", () => {
    const todos: Todo[] = [
      {
        text: "wash toe",
        done: true,
      },
      {
        text: "wash hair",
        done: true,
      },
      {
        text: "wash eye",
        done: true,
      },
    ];

    removeAllTodos(todos);
    expect(todos.length).toEqual(0);
  });
});
