import { computed } from 'vue'

const sizeClassesOptions = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-6 py-2 text-md',
  large: 'px-8 py-3 text-md sm:text-lg',
}

export type SizeClassKey = keyof typeof sizeClassesOptions

interface ButtonStyleProps {
  primary?: boolean
  size?: SizeClassKey
}

export function useButtonStyleClasses(props: ButtonStyleProps) {
  return computed(() => {
    const baseClasses =
      'flex items-center justify-center border-2 font-medium rounded-md focus-visible:outline-2 outline-blue-500 outline-offset-4 hover:shadow-md'
    const sizeClasses = props.size
      ? sizeClassesOptions[props.size]
      : sizeClassesOptions.medium
    const colorClasses = props.primary
      ? 'border-purple-600 bg-purple-700 text-purple-50 hover:bg-purple-800 hover:shadow-purple-300'
      : 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
    return [baseClasses, sizeClasses, colorClasses]
  })
}
