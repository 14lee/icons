<script setup lang="ts">
import { icons } from '@smart-ui/icons-vue/global';
import iconsJson from '@smart-ui/icons-vue/platform-icons.json';

const platformIcons: any[] = [];
const presetIcons: any[] = [];

for (const [key, component] of Object.entries(icons)) {
  if(iconsJson.icons.includes(key)) {
    platformIcons.push(component);
  } else {
    presetIcons.push(component);
  }
}
</script>

<template>
  <h1>平台图标：</h1>
  <component width="32" height="32" :is="icon" v-for="(icon, key) in platformIcons" :key="key" color="red"></component>
  <hr />
  <component :is="Icon" v-for="(Icon, key) in presetIcons" :key="key" class="icon" />
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
  height: 26px;
  width: 26px;
  color: #409eff;
}
</style>
