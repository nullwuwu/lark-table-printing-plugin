<template>
  <div class="flex justify-between">
    <el-collapse 
    ref="el" v-model="activeNames" >
      <el-collapse-item 
      v-for="(item, index) in list" 
      :key="item.fieldId" 
      :title="item.name" 
      :name="item.fieldId">
          <el-form label-width="auto">
            <el-form-item label="是否单行显示">
              <el-switch :model-value="item.oneLine" @change="handleOneLineChange(item)" />
            </el-form-item>
            <el-form-item label="是否隐藏">
              <el-switch :model-value="item.hidden" @change="handleHiddenChange(item)" />
            </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDraggable } from 'vue-draggable-plus'
import type { IFieldMetaSettings } from '../types';

const activeNames = ref<string[]>([])
const el = ref()

const props = defineProps<{
  list: IFieldMetaSettings[]
}>()

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const newArr = arr.map(item => ({ ...item }));
  const item = newArr.splice(from, 1)[0];
  newArr.splice(to, 0, item);
  return newArr;
}

const emit = defineEmits<{ (e: 'update:list', value: IFieldMetaSettings[]): void }>();

useDraggable<IFieldMetaSettings>(el, {
  onUpdate: (event) => {
    const { oldIndex, newIndex } = event;
    if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
      const newList = arrayMove(props.list, oldIndex, newIndex);
      emit('update:list', newList);
    }
  }
})

const handleOneLineChange = (currentItem: IFieldMetaSettings) => {
  emit('update:list', props.list.map(item => item.fieldId === currentItem.fieldId ? { ...item, oneLine: !item.oneLine } : { ...item }));
}

const handleHiddenChange = (currentItem: IFieldMetaSettings) => {
  emit('update:list', props.list.map(item => item.fieldId === currentItem.fieldId ? { ...item, hidden: !item.hidden } : { ...item }));
}
</script>



