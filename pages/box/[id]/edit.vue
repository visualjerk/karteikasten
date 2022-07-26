<script setup lang="ts">
import BoxEditForm from '@/components/BoxEditForm.vue'
import { updateBox } from '@/store/boxes'
import type { Box, EditBox } from '@/server/trpc/types'

const props = defineProps<{
  box: Box
}>()

const { push } = useRouter()

async function handleSave(box: EditBox) {
  await updateBox({
    ...box,
    id: props.box.id,
  })
  push(`/box/${props.box.id}`)
}

async function handleCancel() {
  push(`/box/${props.box.id}`)
}
</script>

<template>
  <BoxEditForm :box="box" @save="handleSave" @cancel="handleCancel">
    <template #save-button>Save Changes</template>
    <template #cancel-button>Discard Changes</template>
  </BoxEditForm>
</template>
