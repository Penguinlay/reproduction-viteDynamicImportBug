<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click="getSource('foo1.md')">load foo 1</button>
  <button @click="getSource('foo2.md')">load foo 2</button>
  <button @click="getSource('foo3.md')">load foo 3</button>
  <VueMarkdownIt :source="source" />
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import VueMarkdownIt from "vue3-markdown-it";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });

const docs = import.meta.glob("../docs/*.md");
Object.keys(docs).map(
  (path) => (docs[path] = () => import(`../${path.slice(3, -3)}.md?raw`))
);
const source = ref("");
const getSource = (fileName) => {
  try {
    docs[`../docs/${fileName}`]().then(
      (content) => (source.value = content.default)
    );
  } catch (errorMessage) {
    console.warn(errorMessage);
    console.warn(`${fileName} is not available.`);
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
