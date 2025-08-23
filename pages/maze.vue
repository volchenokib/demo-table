<template>
  <main class="hero">
    <div class="my-atropos">
      <div class="card" data-atropos-offset="0"></div>
      <div class="content" data-atropos-offset="5">
        <h1>Лабиринт</h1>
        <p>Познавательное приключение начинается</p>
        <button @click="start">Начать</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import 'atropos/css';
import { onMounted } from 'vue';

function start() {
  alert('Игра ещё в разработке');
}

onMounted(async () => {
  const Atropos = (await import('atropos')).default;
  Atropos({
    el: '.my-atropos',
    shadow: false,
  });
});
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #111;
  color: #fff;
}

.my-atropos {
  width: 320px;
  height: 320px;
}

.card {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    #00695c 0,
    #00695c 10px,
    #004d40 10px,
    #004d40 20px
  );
  border-radius: 20px;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #fff;
  color: #00695c;
  font-weight: bold;
  cursor: pointer;
}
</style>

