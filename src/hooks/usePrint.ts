import { bitable, FieldType, ToastType } from '@lark-base-open/js-sdk';
import type { IFieldMeta } from "@lark-base-open/js-sdk";
import { ref } from 'vue';
import type { IFieldMetaSettings, IFieldMetaWithValue } from '../types';

const SETTING_KEY = 'my_print_setting';


const usePrint = () => {
  const currentRecordId = ref<string>('');
  const recordList = ref<any>({});
  const fieldList = ref<IFieldMeta[]>([]);
  const currentRecord = ref<null | IFieldMetaWithValue[][]>(null);
  const isSettingPanelShow = ref(false);
  const settingList = ref<IFieldMetaSettings[]>([]);

  const init = async () => {
    const table = await bitable.base.getActiveTable();
    fieldList.value = await table.getFieldMetaList();

    getSettingList();
  }

  const selectRecord = async () => {
    // 选择一条记录
    const table = await bitable.base.getActiveTable();
    const view = await table.getActiveView();
    const result = await bitable.ui.selectRecordIdList(table.id, view.id);
    currentRecordId.value = result[0];

    getCurrentRecord();
  }

  const getSettingList = async () => {
    const data = await bitable.bridge.getData<IFieldMetaSettings[]>(SETTING_KEY);

    const cachedConfig = Array.isArray(data) ? data.reduce((acc, curr) => {
      acc[curr.fieldId] = curr;
      return acc;
    }, {} as Record<string, IFieldMetaSettings>) : {};

    const result = fieldList.value.map(field => {
      return cachedConfig[field.id] || {
        fieldId: field.id,
        name: field.name,
        oneLine: field.type === FieldType.Attachment,
        hidden: false,
      }
    })

    handleSettingListUpdate(result, false);
  }

  const getCurrentRecord = async () => {
    if (!currentRecordId.value) {
      return null;
    }

    const table = await bitable.base.getActiveTable();

    // 过滤掉被隐藏的字段
    const orderedSettings = settingList.value.filter(setting => !setting.hidden);
    // 生成 fieldId 到 fieldMeta 的映射，便于查找
    const fieldMetaMap = new Map(fieldList.value.map(field => [field.id, field]));

    // 获取所有字段的值，按 settingList 顺序
    const result = await Promise.all(orderedSettings.map(setting => {
      const field = fieldMetaMap.get(setting.fieldId);
      if (!field) return Promise.resolve(null); // 跳过找不到的字段
      if (field.type === FieldType.Attachment) {
        return table.getCellValue(field.id, currentRecordId.value).then(value => {
          if (Array.isArray(value)) {
            return table.getCellAttachmentUrls((value as any[]).map(item => item.token), field.id, currentRecordId.value).then(urls => {
              return {
                ...field,
                value: urls
              };
            });
          }
          return {
            ...field,
            value: [""]
          };
        });
      }
      return table.getCellString(field.id, currentRecordId.value).then(value => {
        return {
          ...field,
          value
        };
      });
    }));

    // 过滤掉无效字段
    const validResult = result.filter(Boolean);

    // 按 oneLine 分组
    const grouped: IFieldMetaWithValue[][] = [];
    let temp: IFieldMetaWithValue[] = [];
    orderedSettings.forEach((setting, idx) => {
      const field = validResult[idx];
      if (!field) return;
      if (setting.oneLine) {
        if (temp.length) {
          grouped.push(temp);
          temp = [];
        }
        grouped.push([field]);
      } else {
        temp.push(field);
        if (temp.length === 2) {
          grouped.push(temp);
          temp = [];
        }
      }
    });
    if (temp.length) {
      grouped.push(temp);
    }
    currentRecord.value = grouped;
  }

  const handleSettingListUpdate = async (list: IFieldMetaSettings[], showToast = true) => {
    settingList.value = list;

    const result = await bitable.bridge.setData(SETTING_KEY, list);
    
    if (!showToast) {
      return;
    }


    if (result) {
      bitable.ui.showToast({
        toastType: ToastType.success,
        message: '更新打印配置成功',
      });
    } else {
      bitable.ui.showToast({
        toastType: ToastType.error,
          message: '更新打印配置失败',
        });
      }
  }

  const handleSetting = () => {
    isSettingPanelShow.value = true;
  }

  const handlePrint = () => {
    window.print();
  }

  return {
    isSettingPanelShow,
    settingList,
    fieldList,
    currentRecord,
    recordList,
    init,
    selectRecord,
    handlePrint,
    handleSetting,
    handleSettingListUpdate,
  }
}

export default usePrint;
