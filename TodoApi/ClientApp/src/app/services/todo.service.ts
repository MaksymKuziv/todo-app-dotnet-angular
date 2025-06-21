import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  getTodo(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  addTodo(todo: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  updateTodo(todo: TodoItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
