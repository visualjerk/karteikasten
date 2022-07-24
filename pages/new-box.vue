<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import LinkButton from '@/components/LinkButton.vue'
import BoxCard from '@/components/BoxCard.vue'
import BoxCardInput from '@/components/BoxCardInput.vue'

import { nextTick, ref, onMounted, ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'
import type { InferMutationInput } from '@/server/trpc/types'

type NewCard = InferMutationInput<'boxes.create'>['cards'][0]

const boxName = ref('My New Box')
const inputFrontEl = ref<ComponentPublicInstance>()
const newCard = ref<NewCard>({ front: '', back: '' })
const cardList = ref<NewCard[]>([])

function addCard() {
  if (newCard.value.front === '' || newCard.value.back === '') {
    return
  }
  cardList.value.push(newCard.value)
}

async function handleEnter() {
  addCard()
  newCard.value = { front: '', back: '' }
  await nextTick()
  inputFrontEl.value?.$el.focus()
}

const { push } = useRouter()
const pending = ref(false)
async function save() {
  pending.value = true
  addCard()
  await useClient().mutation('boxes.create', {
    name: boxName.value,
    cards: cardList.value,
  })
  push('/')
}

onMounted(() => {
  inputFrontEl.value?.$el.focus()
})
</script>

<template>
  <article>
    <input
      v-model="boxName"
      class="h1 mb-8 w-full bg-transparent"
      :readonly="pending"
    />
    <div class="grid gap-2 mb-6">
      <BoxCard v-for="(card, index) in cardList" :key="index">
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
        Save New Box
      </ActionButton>
      <LinkButton to="/">Discard Box</LinkButton>
    </div>
  </article>
</template>
