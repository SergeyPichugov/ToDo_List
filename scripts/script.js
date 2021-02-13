'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.getItem('todoList')){
   todoData = JSON.parse(localStorage.getItem('todoList'));
}

const render = function(){
   todoList.textContent = '';
   todoCompleted.textContent = '';
   
   todoData.forEach(function(item){
      
      const li = document.createElement('li');
      li.classList.add('todo-item');
      
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class = "todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
      '</div>';
         
      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }
      
      headerInput.value = '';
      
      const btnTodoComplete = li.querySelector('.todo-complete');
      btnTodoComplete.addEventListener('click', function () {
         item.completed = !item.completed;  
         render();
      });
         
      const btnRemove = li.querySelector('.todo-remove');
      btnRemove.addEventListener('click', function(){
         let i = todoData.indexOf(item);
         todoData.splice(i, 1);
         localStorage.setItem('todoList', JSON.stringify(todoData));
         render();
      });

      localStorage.setItem('todoList', JSON.stringify(todoData));
   });
};


todoControl.addEventListener('submit', function(event){
   event.preventDefault();

   if (headerInput.value === '') { 
      return;
   }

   const newTodo = {
      value: headerInput.value,
      completed: false
   };

   todoData.push(newTodo);

   render();
});

render();