<script setup lang="ts">
import LinkButton from '../components/LinkButton.vue'
import ActionButton from '../components/ActionButton.vue'
import BoxCard from '../components/BoxCard.vue'
import BoxCardInput from '../components/BoxCardInput.vue'

import { nextTick, ref, onMounted, ComponentPublicInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useBoxes, Card } from '../store/boxes'

const { push } = useRouter()
const route = useRoute()
const { getCopy } = useBoxes()
const box = ref(getCopy(Number(route.params.id)))

const inputFrontEl = ref<ComponentPublicInstance>()
const newCard = ref<Card>({ front: '', back: '' })

function addCard() {
  if (newCard.value.front === '' || newCard.value.back === '') {
    return
  }
  if (!box.value) {
    return
  }
  box.value.cards.push(newCard.value)
}

async function handleEnter() {
  addCard()
  newCard.value = { front: '', back: '' }
  await nextTick()
  inputFrontEl.value?.$el.focus()
}

const { set } = useBoxes()
function save() {
  if (!box.value) {
    return
  }
  addCard()
  set(box.value)
  push(`/box/${box.value.id}`)
}

onMounted(() => {
  inputFrontEl.value?.$el.focus()
})
</script>

<template>
  <h1 v-if="!box">Box not found</h1>
  <div v-else>
    <div class="flex justify-between items-center gap-3 mb-6">
      <input v-model="box.name" class="h1 w-full bg-transparent" />
    </div>

    <div class="grid gap-2 mb-4">
      <BoxCard v-for="(card, index) in box.cards" :key="index">
        <BoxCardInput v-model="card.front" placeholder="Frontside ..." />
        <BoxCardInput v-model="card.back" placeholder="Backside ..." />
      </BoxCard>
      <BoxCard>
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
      <ActionButton @click="save" primary>Save Changes</ActionButton>
      <LinkButton :to="`/box/${box.id}`">Discard Changes</LinkButton>
    </div>
  </div>
</template>
