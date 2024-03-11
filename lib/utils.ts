import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const replaceQuery = async (route: RouteLocationNormalizedLoaded, query: { [key: string]: string }) => {
  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      ...query
    },
    replace: true
  })
}