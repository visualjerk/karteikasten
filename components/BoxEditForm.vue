<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import BoxCard from '@/components/BoxCard.vue'
import BoxCardInput from '@/components/BoxCardInput.vue'

import { nextTick, ref, onMounted, ComponentPublicInstance } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { Box, EditBox, NewCard } from '@/server/trpc/types'

const props = defineProps<{
  box?: Box
}>()

const emit = defineEmits<{
  (e: 'save', value: EditBox): void
  (e: 'cancel'): void
}>()

const newBox = {
  name: 'My New Box',
  cards: [],
}
const boxCopy = ref<EditBox>(props.box ? cloneDeep(props.box) : newBox)
const inputFrontEl = ref<ComponentPublicInstance>()
const newCard = ref<NewCard>({ front: '', back: '' })

function addCard() {
  const { front, back } = newCard.value
  const sanitizedFront = front.trim()
  const sanitizedBack = back.trim()
  if (sanitizedFront === '' || sanitizedBack === '') {
    return
  }
  boxCopy.value.cards.push(newCard.value)
}

async function handleEnter() {
  addCard()
  newCard.value = { front: '', back: '' }
  await nextTick()
  inputFrontEl.value?.$el.focus()
}

const pending = ref(false)
async function save() {
  pending.value = true
  addCard()
  emit('save', boxCopy.value)
}

onMounted(() => {
  inputFrontEl.value?.$el.focus()
})
</script>

<template>
  <article>
    <input
      v-model="boxCopy.name"
      class="h1 mb-8 w-full bg-transparent"
      :readonly="pending"
    />
    <div class="grid gap-2 mb-6">
      <BoxCard v-for="(card, index) in boxCopy.cards" :key="index">
        <BoxCardInput v-model="card.front" placeholder="Frontside ..." />
        <BoxCardInput v-model="card.back" placeholder="Backside ..." />
      </BoxCard>
      <BoxCard v-if="!pending">
        <BoxCardInput
          ref="inputFrontEl"
          v-model="newCard.front"
          placeholder="Frontside ..."
          autofocus
        />
        <BoxCardInput
          v-model="newCard.back"
          @keydown.enter="handleEnter"
          placeholder="Backside ..."
        />
      </BoxCard>
    </div>
    <div class="flex gap-3 justify-between">
      <ActionButton @click="save" :disabled="pending" primary>
        <slot name="save-button" />
      </ActionButton>
      <ActionButton @click="$emit('cancel')">
        <slot name="cancel-button" />
      </ActionButton>
    </div>
  </article>
</template>
