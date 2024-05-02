<script setup lang="ts">
import { icons } from '@smart-ui/icons-vue/global'
import { Aim } from '@smart-ui/icons-vue';
</script>

<template>
  <Aim></Aim>
  <hr />
  <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
  <hr />
  <component
    :is="`SuIcon${key}`"
    v-for="key in Object.keys(icons)"
    :key="key"
    class="icon"
  />
</template>

<style>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
