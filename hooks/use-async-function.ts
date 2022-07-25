import { Ref } from 'vue'

export function useAsyncFunction<TArgs extends any[], TReturn extends any>(
  fn: (...args: TArgs) => Promise<TReturn>
): {
  pending: Ref<boolean>
  trigger: (...args: TArgs) => Promise<TReturn | undefined>
} {
  const pending = ref(false)

  async function trigger(...args: TArgs) {
    if (pending.value) {
      return
    }
    pending.value = true
    const result = await fn(...args)
    pending.value = false
    return result
  }

  return {
    pending,
    trigger,
  }
}
