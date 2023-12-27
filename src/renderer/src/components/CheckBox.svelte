<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let checked = false
  interface CustomEvent {
    change: boolean
  }
  const dispatch = createEventDispatcher<CustomEvent>()


  function changehandle(e) {
    dispatch("change", e.target.checked)
  }
</script>

<label>
  <input type="checkbox" hidden checked={checked} on:change={changehandle} />
  <div class="CheckBox w-6 h-6 rounded-full transition">
    <div class="Icon w-4 h-4 rounded-full bg-transparent transition" />
  </div>
</label>

<style lang="postcss">
.CheckBox {
  @apply flex justify-center items-center;
  @apply border-2 border-blue-100;
}
input:checked + .CheckBox {
  @apply border-blue-200;
}
input:checked + .CheckBox .Icon {
  @apply bg-blue-300;
}
</style>
