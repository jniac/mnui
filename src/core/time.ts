
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

class DoubleSet<T> {
  #state = true
  #set1 = new Set<T>
  #set2 = new Set<T>
  #current() {
    return this.#state ? this.#set1 : this.#set2
  }
  add(value: T) {
    this.#current().add(value)
  }
  *dump() {
    const current = this.#current()
    this.#state = !this.#state
    yield* current[Symbol.iterator]()
    current.clear()
  }
}

const nextFrame = new DoubleSet<TimeCallback>()
export const nextFrameAdd = (callback: TimeCallback) => nextFrame.add(callback)

const frameLoop = (ms: number) => {
  requestAnimationFrame(frameLoop)
  timeOld = time
  time = ms / 1000
  deltaTime = time - timeOld
  frame++
  for (const callback of nextFrame.dump()) {
    callback(timeInfo)
  }
}

requestAnimationFrame(frameLoop)
