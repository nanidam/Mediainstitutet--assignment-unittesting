/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/functions";
import * as main from "../ts/main";
import { Todo } from "../ts/models/Todo";

//reset body before each test
beforeEach(() => {
  document.body.innerHTML = "";
});

test("should call clearTodos", () => {
  //   //arrange
  //   document.body.innerHTML = `
  //     <button type="button" id="clearTodos">Rensa lista</button>
  // `;
  //   const spy = jest.spyOn(main, "clearTodos").mockReturnValue();
  //   //act
  //   document.getElementById("clearTodos")!.click();
  //   //assert
  //   expect(spy).toHaveBeenCalled();
});

test("should create new todo list", () => {
  //arrange
  const todoText = "wash socks";
  const todos: Todo[] = [];

  const spyOnCreateHTML = jest.spyOn(main, "createHtml").mockReturnValue();
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

  //act
  main.createNewTodo(todoText, todos);

  //asset
  expect(todos.length).toBe(1);
  expect(spyOnCreateHTML).toHaveBeenCalled();
  spyOnCreateHTML.mockRestore();
});

test("should call addTodo", () => {
  //arrange
  const todoText = "wash socks";
  const todos: Todo[] = [];
  const spyOnAddTodo = jest.spyOn(functions, "addTodo").mockReturnValue({
    success: true,
    error: "string",
  });

  document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

  //act
  main.createNewTodo(todoText, todos);

  //asset
  expect(spyOnAddTodo).toHaveBeenCalled();
  spyOnAddTodo.mockRestore();
});

test("should call displayError", () => {
  //arrange
  const todoText = "";
  const todos: Todo[] = [];
  const spyOnDisplayError = jest.spyOn(main, "displayError").mockReturnValue();

  document.body.innerHTML = `<ul id="todos" class="todo"></ul>
    <div id="error" class="error"></div>
    `;

  //act
  main.createNewTodo(todoText, todos);

  //asset

  expect(spyOnDisplayError).toHaveBeenCalled();
  spyOnDisplayError.mockRestore();
});

test("should create html", () => {
  //arrange
  const todos: Todo[] = [
    { text: "chores 1", done: false },
    { text: "chores 2", done: false },
  ];
  document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;
  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";
  //act

  main.createHtml(todos);
  const todoItems = todosContainer.querySelectorAll("li");

  //assert
  expect(todosContainer.childNodes.length).toBe(todos.length);
  expect(todoItems[0].innerHTML).toBe(todos[0].text);
  expect(todoItems[1].innerHTML).toBe(todos[1].text);

  todosContainer.remove();
});
test("should set the todos in the local storage", () => {
  const todos: Todo[] = [
    { text: "chores 1", done: false },
    { text: "chores 2", done: false },
  ];
  document.body.innerHTML = `
  <ul id="todos" class="todo"></ul>
  `;
  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";
  main.createHtml(todos);
  expect(localStorage.getItem("todos")).toEqual(JSON.stringify(todos));

  todosContainer.remove();
});

test('should add the "todo__text--done" class to the done items', () => {
  const todos: Todo[] = [
    { text: "chores 1", done: true },
    { text: "chores 2", done: true },
  ];
  document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;
  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  main.createHtml(todos);
  const todoItems = todosContainer.querySelectorAll("li");
  todoItems.forEach((todoItem) => {
    expect(todoItem.classList.contains("todo__text--done")).toBe(true);
    todosContainer.remove();
  });
});

test("should call change todos from toggleTodo", () => {
  const todo: Todo = { text: "chores 1", done: true };
  document.body.innerHTML = `
  <ul id="todos" class="todo"></ul>
  `;
  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";
  const changeTodoSpy = jest.spyOn(functions, "changeTodo").mockReturnValue();

  main.toggleTodo(todo);

  expect(changeTodoSpy).toHaveBeenCalled();
});

test("should display error", () => {
  const error = "testing";
  const show = true;
  document.body.innerHTML = `
  <div id="error" class="error"></div>
  `;
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  main.displayError(error, show);

  expect(errorContainer.innerHTML).toBe(error);

  expect(errorContainer.classList.contains("show")).toBe(true);
});

test("should not display error/check theres no class", () => {
  const error = "error";
  const show = false;
  document.body.innerHTML = `
  <div id="error" class="error"></div>
  `;
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  main.displayError(error, show);

  expect(errorContainer.innerHTML).toBe(error);

  expect(errorContainer.classList.contains("show")).toBe(false);
});

describe("clearTodos", () => {
  test("should call removeAllTodos fn", () => {
    const todos: Todo[] = [];
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;

    todosContainer.innerHTML = "";
    const removeAllTodosSpy = jest
      .spyOn(functions, "removeAllTodos")
      .mockReturnValue();
    main.clearTodos(todos);

    expect(removeAllTodosSpy).toHaveBeenCalled();
  });

  test("should call createHtml fn", () => {
    const todos: Todo[] = [];
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;

    todosContainer.innerHTML = "";
    const createHtmlSpy = jest.spyOn(main, "createHtml").mockReturnValue();
    main.clearTodos(todos);

    expect(createHtmlSpy).toHaveBeenCalled();
  });
});

describe("todosContainer", () => {
  test("should throw error", () => {
    expect(() => {
      main.todosContainer(1);
    }).toThrowErrorMatchingInlineSnapshot(`"Function not implemented."`);
  });
});
