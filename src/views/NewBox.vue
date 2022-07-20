<script setup lang="ts">
import { nextTick, ref, onMounted } from 'vue'
import ActionButton from '../components/ActionButton.vue'
import { useBoxes, Card } from '../store/boxes'
import { useRouter } from 'vue-router'

const boxName = ref('My New Box')
const inputFrontEl = ref<HTMLInputElement>()
const newCard = ref<Card>({ front: '', back: '' })
const cardList = ref<Card[]>([])

function addCard() {
  cardList.value.push(newCard.value)
}

async function handleEnter() {
  addCard()
  newCard.value = { front: '', back: '' }
  await nextTick()
  inputFrontEl.value?.focus()
}

const { push } = useRouter()
const { add } = useBoxes()
function save() {
  addCard()
  add({
    name: boxName.value,
    cards: cardList.value,
  })
  push('/')
}

onMounted(() => {
  inputFrontEl.value?.focus()
})
</script>

<template>
  <div class="">
    <input
      v-model="boxName"
      class="text-3xl mb-4 text-slate-800 w-full bg-transparent"
    />
    <div class="grid gap-2 mb-4">
      <div
        class="grid grid-cols-2"
        v-for="(card, index) in cardList"
        :key="index"
      >
        <input
          ref="inputFrontEl"
          class="p-2"
          v-model="card.front"
          placeholder="Frontside ..."
        />
        <input class="p-2" v-model="card.back" placeholder="Backside ..." />
      </div>
      <div class="grid grid-cols-2">
        <input
          ref="inputFrontEl"
          class="p-2"
          v-model="newCard.front"
          placeholder="Frontside ..."
          autofocus
        />
        <input
          class="p-2"
          v-model="newCard.back"
          @keydown.enter="handleEnter"
          placeholder="Backside ..."
        />
      </div>
    </div>
    <ActionButton @click="save">Save Box</ActionButton>
  </div>
</template>
