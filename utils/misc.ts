export const clean = (obj: any) => {
  return Object.entries(obj).reduce(
    // @ts-ignore
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {},
  )
}

export const selectKey = (key: string, object: any) => {
  const arr = key.split(".")
  while (arr.length && (object = object[arr.shift()!])) return object
}
