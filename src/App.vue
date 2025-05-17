<script setup lang="ts">
import { FieldType } from '@lark-base-open/js-sdk';
import { onBeforeMount } from 'vue';
import usePrint from './hooks/usePrint';
const { selectRecord, handlePrint, init, handleSetting, handleSettingListUpdate, currentRecord, isSettingPanelShow, settingList } = usePrint();

onBeforeMount(() => {
  init();
});

</script>

<template>
  <div class="my-tools-container">
    <el-button @click="selectRecord">选择记录</el-button>
    <el-button @click="handlePrint">打印</el-button>
    <el-button @click="handleSetting">设置</el-button>

    <el-dialog v-model="isSettingPanelShow" title="设置">
      <settings-panel :list="settingList" @update:list="handleSettingListUpdate" />
    </el-dialog>
  </div>

  <div v-if="currentRecord" id="my-print-container" class="my-grid-table">
    <template v-for="(fieldItem, index) in currentRecord" :key="index">
      <div
        v-if="fieldItem.length === 1"
        class="my-grid-row"
      >
        <div class="my-grid-cell">{{ fieldItem[0].name }}</div>
        <template v-if="fieldItem[0].type === FieldType.Attachment">
          <img v-for="v in fieldItem[0].value" class="my-grid-cell value-span" :src="v" />
        </template>
        <div v-else class="my-grid-cell value-span">{{ fieldItem[0].value }}</div>
      </div>
      <div
        v-else
        class="my-grid-row"
      >
        <div class="my-grid-cell">{{ fieldItem[0].name }}</div>
        <div class="my-grid-cell">{{ fieldItem[0].value }}</div>
        <div class="my-grid-cell">{{ fieldItem[1].name }}</div>
        <div class="my-grid-cell">{{ fieldItem[1].value }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.my-grid-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
  border: 2px solid #000;
  border-radius: 4px;
  overflow: hidden;
}
.my-grid-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #000;
}
.my-grid-cell {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 8px;
  background: #fff;
}
.value-span {
  grid-column: 2 / span 3;
}
.my-grid-row:last-child .my-grid-cell {
  border-bottom: none;
}
.my-grid-cell:last-child {
  border-right: none;
}
</style>
