<script setup lang="ts">
import BoxEditForm from '@/components/BoxEditForm.vue'
import { useBox } from '@/store/boxes'
import { useRouter } from 'vue-router'
import type { Box, EditBox } from '@/server/trpc/types'

const props = defineProps<{
  box: Box
}>()

const { refresh } = await useBox(Number(props.box.id))
const { push } = useRouter()

async function handleSave(box: EditBox) {
  await useClient().mutation('boxes.update', {
    ...box,
    id: props.box.id,
  })
  await refresh()
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
