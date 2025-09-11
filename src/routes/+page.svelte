<script>
let count = $state(0);
const increment = () => count++;
const decrement = () => count--;
</script>

<div class="flex gap-2">
    <button onclick={decrement} class="btn btn-error">Decrement</button>
    <h1>{count}</h1>
    <button onclick={increment} class="btn btn-success">Increment</button>
</div>