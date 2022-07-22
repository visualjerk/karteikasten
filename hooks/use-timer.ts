import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

const TICK = 10

export function useTimer(time: number, callback?: () => void) {
  const timeLeft = ref(time)

  const { pause, resume, isActive } = useIntervalFn(() => {
    timeLeft.value -= TICK
    if (timeLeft.value <= 0) {
      timeLeft.value = 0
      pause()
      if (callback) {
        callback()
      }
    }
  }, TICK)

  function restart() {
    timeLeft.value = time
    resume()
  }

  return {
    timeLeft,
    isActive,
    restart,
    pause,
    resume,
  }
}
