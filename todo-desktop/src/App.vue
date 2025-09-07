<script setup>
import { ref } from "vue"

const todos = ref([
  { id: 1, text: "任务1", done: false },
  { id: 2, text: "任务2", done: false },
  { id: 3, text: "任务3", done: false },
])
const newTodo = ref("")


function addTodo() {
  if (newTodo.value.trim() === "") return
  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done: false,
  })
  newTodo.value = ""
}

</script>

<template>
  <div class="bg">
    <div class="head">
      <h1>今日任务</h1>
    </div>
    <div class="body">
      <div class="todo" v-for="todo in todos">
        {{ todo.text }}
      </div>
    </div>
    <div class="foot">
      <div class="addTodo">
        <label for="add">🙂</label>
        <input 
          id="add" 
          type="text" 
          placeholder="添加任务" 
          v-model="newTodo"
          @keyup.enter="addTodo"
        > 
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  /* background-image: url(房间背景.png); */
  /* 确实比我之前用100% 100%好 */
  /* background-size: cover; 
  background-position: center;
  background-repeat: no-repeat; */

  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.head {
  height: 20%;
  width: 100%;

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.body {
  height: 70%;
  width: 100%;

  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.body .todo {
  height: 10%;
  width: 70%;

  margin-top: 3px;
  
  background-color: rgba(0, 0, 0, 0.5);

  border-radius: 10px;

  display: flex;
  align-items: center;

  padding-left: 10px;

  font-size: large;
}

.foot {
  height: 10%;
  width: 100%;

  display: flex;
  justify-content: center;
}

.foot .addTodo {
  height: 60%;
  width: 70%;

  border: 2px solid #878585;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;

  display: flex;
  justify-content: right;
}

.addTodo label {
  width: 5%;
  height: 100%;

  font-size: clamp(18px, 3vw, 30px);

  display: flex;
  align-items: center;
  justify-content: center;
}

.addTodo input[type="text"] {
  width: 95%;
  height: 100%;

  padding-left: 8px;

  margin-right: 10px;

  border: none;
  outline: none;

  background-color: rgba(0, 0, 0, 0.0);

  font-size: large;
}

.addTodo input[type="text"]:focus::placeholder {
  color: transparent;
}

</style>

