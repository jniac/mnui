
const storeId = 'mnui-store'
const store: Record<string, any> = {}

{
  const str = localStorage.getItem(storeId)
  if (str) {
    try {
      const stored = JSON.parse(str)
      Object.assign(store, stored)
    } catch (error: any) {
      console.warn(`invalid storage ("${error.message}")`)
    }
  }
}

export const getStoreItem = <T>(key: string, defaultValue: T) => {
  return store[key] ?? defaultValue
}

export const setStoreItem = <T>(key: string, value: T) => {
  store[key] = value
  localStorage.setItem(storeId, JSON.stringify(store))
}
