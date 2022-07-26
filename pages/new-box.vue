<script setup lang="ts">
import BoxEditForm from '@/components/BoxEditForm.vue'
import { createBox } from '@/store/boxes'
import type { EditBox } from '@/server/trpc/types'

const { push } = useRouter()

const newBox: EditBox = { name: 'My New Box ', cards: [] }
async function handleSave(box: EditBox) {
  await createBox(box)
  push('/')
}

function handleCancel() {
  push('/')
}
</script>

<template>
  <BoxEditForm
    :box="newBox"
    @save="handleSave"
    @cancel="handleCancel"
    autofocus
  >
    <template #save-button>Save New Box</template>
    <template #cancel-button>Discard Box</template>
  </BoxEditForm>
</template>
