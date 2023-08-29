<script lang="ts">
  export let label = ""
</script>

<label class="flex items-center my-2 rounded-xl h-10 text-lg hover:bg-blue-50 px-2">
  {label}
  <slot name="label" />
  <div class="flex-1" />
  <slot />
</label>
