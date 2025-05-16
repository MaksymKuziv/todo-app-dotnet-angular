import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItem, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  todos: TodoItem[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    this.todoService.addTodo({ title: this.newTodoTitle, isComplete: false })
      .subscribe(() => {
        this.newTodoTitle = '';
        this.loadTodos();
      });
  }

  toggleComplete(todo: TodoItem) {
    const updated = { ...todo, isComplete: !todo.isComplete };
    this.todoService.updateTodo(updated).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}