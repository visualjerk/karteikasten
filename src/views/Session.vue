<script setup lang="ts">
import { nextTick, ref, unref, computed } from 'vue'
import { STORAGE_KEY, DICTIONARY } from '../constants/dictionary'
import { useSession } from '../hooks/use-session'
import { useTimer } from '../hooks/use-timer'
import QuestionBox from '../components/QuestionBox.vue'
import ActionButton from '../components/ActionButton.vue'

const boxRef = ref()
const { current, next, addError, results } = useSession(STORAGE_KEY, DICTIONARY)
const sessionRunning = ref(false)
const showWord = ref(false)
const word = computed(() => DICTIONARY[unref(current)])

async function showNextQuestion(): Promise<void> {
  next()
  restart()
  await nextTick()
  unref(boxRef).reset()
}

let resetAfterWrongAnswerTimeout: number

async function handleCorrectAnswer(): Promise<void> {
  clearInterval(resetAfterWrongAnswerTimeout)
  pause()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  showWord.value = false
  showNextQuestion()
}

function handleWrongAnswer(): void {
  addError()
  showWord.value = true
  resetAfterWrongAnswerTimeout = setTimeout(() => {
    showWord.value = false
    showNextQuestion()
  }, 3000)
}

const ANSWER_TIME = 5000
const { isActive, pause, resume, restart, timeLeft } = useTimer(
  ANSWER_TIME,
  handleWrongAnswer
)

async function toggleSession() {
  sessionRunning.value = !unref(sessionRunning)
  if (unref(isActive)) {
    pause()
  } else {
    next()
    resume()
  }
  await nextTick()
  unref(boxRef).reset()
}

pause()
</script>

<template>
  <div class="flex gap-3">
    <ActionButton @click="toggleSession">
      <template v-if="sessionRunning">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="mr-2">
          <path
            fill="currentColor"
            d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
          />
        </svg>
        Stop Session
      </template>
      <template v-else>
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="mr-2">
          <path
            fill="currentColor"
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
          />
        </svg>
        Start Session
      </template>
    </ActionButton>
  </div>
  <template v-if="sessionRunning">
    <QuestionBox
      ref="boxRef"
      :character="current"
      @correctAnswer="handleCorrectAnswer"
      :disabled="!sessionRunning"
    />
    <div class="h-3 bg-purple-200 w-60 rounded-lg overflow-hidden mb-3">
      <div
        class="h-3 bg-purple-800 origin-right"
        :style="{ transform: `scaleX(${timeLeft / ANSWER_TIME})` }"
      ></div>
    </div>
    <aside class="text-center mt-6 text-5xl text-slate-700" v-if="showWord">
      Say: <span class="font-medium">"{{ word }}"</span>
    </aside>
  </template>
  <div
    v-else
    class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <div
      v-for="item in results"
      :key="item.key"
      class="p-4 rounded-md shadow-xs bg-white border border-slate-100"
    >
      <div class="text-xl text-center font-medium text-slate-800">
        {{ item.key }}
      </div>
      <div class="text-sm text-center mb-4 text-slate-400">
        {{ DICTIONARY[item.key] }}
      </div>
      <div class="w-40 bg-slate-200 rounded-md overflow-hidden">
        <div
          class="h-2"
          :class="item.accuracy > 0.8 ? 'bg-green-600' : 'bg-yellow-600'"
          :style="{
            width: `${item.accuracy * 100}%`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
