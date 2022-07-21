<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import BoxCard from '@/components/BoxCard.vue'
import BoxCardInput from '@/components/BoxCardInput.vue'

import { nextTick, ref, onMounted, ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'

import { useBoxes, Card, Box } from '@/store/boxes'

const props = defineProps<{
  box: Box
}>()

const { push } = useRouter()
const { getCopy } = useBoxes()
// We can savely assume that box exists, as we got it as a router-view prop
const boxCopy = ref(getCopy(props.box.id) as Box)

const inputFrontEl = ref<ComponentPublicInstance>()
const newCard = ref<Card>({ front: '', back: '' })

function addCard() {
  if (newCard.value.front === '' || newCard.value.back === '') {
    return
  }
  if (!boxCopy.value) {
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

const { set } = useBoxes()
function save() {
  if (!boxCopy.value) {
    return
  }
  addCard()
  set(boxCopy.value)
  push(`/box/${boxCopy.value.id}`)
}

onMounted(() => {
  inputFrontEl.value?.$el.focus()
})
</script>

<template>
  <div>
    <input v-model="boxCopy.name" class="h1 w-full bg-transparent mb-8" />
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
      <LinkButton :to="`/box/${boxCopy.id}`">Discard Changes</LinkButton>
    </div>
  </div>
</template>
