import { computed } from 'vue'

const sizeClasses = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-6 py-2 text-md',
  large: 'px-8 py-3 text-lg',
}

export type SizeClassKey = keyof typeof sizeClasses

export function useButtonSizeClass(size?: SizeClassKey) {
  return computed(() => (size ? sizeClasses[size] : sizeClasses.medium))
}
