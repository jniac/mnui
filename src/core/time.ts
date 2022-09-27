
export let frame = 0
export let time = 0
export let timeOld = 0
export let deltaTime = 0

const timeInfo = {
  get frame() { return frame },
  get time() { return time },
  get timeOld() { return timeOld },
  get deltaTime() { return deltaTime },
}

type TimeInfo = typeof timeInfo

type TimeCallback = (info: TimeInfo) => void

class SafeSet<T> {
  #set = new Set<T>
  #setAdd = new Set<T>
  #setDelete = new Set<T>
  #iterating = false
  add(value: T) {
    const set = this.#iterating ? this.#setAdd : this.#set
    set.add(value)
  }
  delete(value: T) {
    if (this.#iterating === false) {
      return this.#set.delete(value)
    } else {
      if (this.#set.has(value)) {
        this.#setDelete.add(value)
        return true
      } else {
        return false
      }
    }
  }
  *safeIterate() {
    this.#iterating = true
    yield* this.#set[Symbol.iterator]()
    for (const item of this.#setDelete) {
      this.#set.delete(item)
    }
    for (const item of this.#setAdd) {
      this.#set.add(item)
    }
    this.#iterating = false
  }
}

class DumpSet<T> {
  #use1 = true
  #set1 = new Set<T>
  #set2 = new Set<T>
  #current() {
    return this.#use1 ? this.#set1 : this.#set2
  }
  add(value: T) {
    this.#current().add(value)
  }
  *dump() {
    const current = this.#current()
    this.#use1 = !this.#use1
    yield* current[Symbol.iterator]()
    current.clear()
  }
}

const onFrameSet = new SafeSet<TimeCallback>()
export const onFrame = (callback: TimeCallback) => {
  onFrameSet.add(callback)
  const destroy = () => onFrameSet.delete(callback)
  return { destroy }
}
const onNextFrameSet = new DumpSet<TimeCallback>()
export const onNextFrame = (callback: TimeCallback) => onNextFrameSet.add(callback)

Object.assign(window, { SafeSet })

const frameLoop = (ms: number) => {
  timeOld = time
  time = ms / 1000
  deltaTime = time - timeOld
  frame++
  try {
    for (const callback of onNextFrameSet.dump()) {
      callback(timeInfo)
    }
    for (const callback of onFrameSet.safeIterate()) {
      callback(timeInfo)
    }
    requestAnimationFrame(frameLoop)
  } catch (error) {
    console.error('Error during "frame" phase, cancel loop, see below:')
    console.error(error)
  }
}

requestAnimationFrame(frameLoop)
