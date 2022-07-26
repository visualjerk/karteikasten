<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import BoxCard from '@/components/BoxCard.vue'
import BoxCardInput from '@/components/BoxCardInput.vue'

import { nextTick, ref, onMounted, ComponentPublicInstance } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { EditBox, NewCard } from '@/server/trpc/types'
import { wait } from '~~/utils/wait'

const props = defineProps<{
  box: EditBox
  autofocus?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', value: EditBox): void
  (e: 'cancel'): void
}>()

const boxCopy = ref<EditBox>(cloneDeep(props.box))
const inputFrontEl = ref<ComponentPublicInstance>()
const newCard = ref<NewCard>({ front: '', back: '' })

function saniziteCard(card: NewCard) {
  const { front, back } = card
  const sanitizedFront = front.trim()
  const sanitizedBack = back.trim()
  if (sanitizedFront === '' || sanitizedBack === '') {
    return null
  }
  return {
    ...card,
    front: sanitizedFront,
    back: sanitizedBack,
  }
}

async function handleEnter() {
  boxCopy.value.cards.push(newCard.value)
  newCard.value = { front: '', back: '' }
  await nextTick()
  inputFrontEl.value?.$el.focus()
}

const pending = ref(false)
async function save() {
  pending.value = true
  const newCards = [...boxCopy.value.cards, newCard.value]
  const cards = newCards
    .map(saniziteCard)
    .filter((card) => card != null) as NewCard[]
  emit('save', {
    ...boxCopy.value,
    cards,
  })
}

onMounted(async () => {
  // Nuxt seems to focus something else when route changes
  await wait(50)
  if (props.autofocus) {
    inputFrontEl.value?.$el.focus()
  }
})
</script>

<template>
  <article>
    <input
      v-model="boxCopy.name"
      class="h1 mb-8 w-full bg-transparent outline-none border-b-2 border-transparent focus:border-purple-600 hover:border-purple-600"
      :readonly="pending"
    />
    <div class="grid gap-2 mb-6">
      <BoxCard v-for="(card, index) in boxCopy.cards" :key="index">
        <BoxCardInput v-model="card.front" placeholder="Frontside ..." />
        <BoxCardInput v-model="card.back" placeholder="Backside ..." />
      </BoxCard>
      <BoxCard>
        <BoxCardInput
          ref="inputFrontEl"
          v-model="newCard.front"
          placeholder="Frontside ..."
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
