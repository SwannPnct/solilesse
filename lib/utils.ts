import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { openDB, type IDBPDatabase } from "idb";

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

const storeKeys = {
  DELETED: "deleted"
}

export const handleDB = async (onOpen: (db: IDBPDatabase<unknown>, keys: typeof storeKeys) => Promise<void>) => {
  const rc = useRuntimeConfig();
  const db = await openDB(rc.public.dbName, rc.public.dbVersion, {
    upgrade(db) {
      db.createObjectStore(storeKeys.DELETED, {
        keyPath: "id",
      });
    },
  });

  await onOpen?.(db, storeKeys)

  db.close()
}