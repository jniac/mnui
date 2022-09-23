import { inverseLerp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from './Field'

type Vector = Record<string, number>

const cleanNumberInputString = (value: string) => {
  value = value.replace(/[^\d\.]/g, '')
  const dotIndex = value.indexOf('.')
  const secondDotIndex = value.indexOf('.', dotIndex + 1)
  if (secondDotIndex !== -1) {
    value = value.slice(0, secondDotIndex)
  }
  return value
}

type DragInfo = {
  position: { x: number, y: number }
  positionOld: { x: number, y: number }
  positionDelta: { x: number, y: number }
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

const onDrag = (element: HTMLElement, callback: (info: DragInfo) => void) => {
  const info: DragInfo = {
    position: { x: 0, y: 0 },
    positionOld: { x: 0, y: 0 },
    positionDelta: { x: 0, y: 0 },
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ctrlKey: false,
  }
  let pointerEvent: PointerEvent
  const onDown = (event: PointerEvent) => {
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    info.position.x = event.x
    info.position.y = event.y
    info.positionOld.x = event.x
    info.positionOld.y = event.y
    pointerEvent = event
    loopId = requestAnimationFrame(loop)
  }
  const onMove = (event: PointerEvent) => {
    pointerEvent = event
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    cancelAnimationFrame(loopId)
  }
  let loopId = -1
  const loop = () => {
    loopId = requestAnimationFrame(loop)
    info.positionOld.x = info.position.x
    info.positionOld.y = info.position.y
    info.position.x = pointerEvent.x
    info.position.y = pointerEvent.y
    info.positionDelta.x = info.position.x - info.positionOld.x
    info.positionDelta.y = info.position.y - info.positionOld.y
    info.shiftKey = pointerEvent.shiftKey
    info.altKey = pointerEvent.altKey
    info.metaKey = pointerEvent.metaKey
    info.ctrlKey = pointerEvent.ctrlKey
    callback(info)
  }
  element.addEventListener('pointerdown', onDown)
  const destroy = () => {
    element.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    cancelAnimationFrame(loopId)
  }
  return { destroy }
}

export const vector = (path: string, valueArg: InputValueArg<Vector>, { min = -Infinity, max = Infinity, step = 1 } = {}) => {
  
  const onCreate = (field: Field<Vector>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('vector')
    const keys = Object.keys(initialValue).filter(key => typeof initialValue[key] === 'number')
    const subFields = keys.map(key => {
      const id = `${field.id}-${key}`
      const subDiv = document.createElement('div')
      subDiv.classList.add('vector-property')
      subDiv.innerHTML = `
        <div class="vector-label">
          <label for="${id}">${key}</label>
        </div>
        <div class="vector-input">
          <input id="${id}" value="${initialValue[key]}">
        </div>
      `
      const label = subDiv.querySelector('.vector-label') as HTMLInputElement
      const input = subDiv.querySelector('input') as HTMLInputElement
      inputDiv.append(subDiv)
      input.oninput = () => {
        const cleanString = cleanNumberInputString(input.value)
        if (cleanString !== input.value) {
          input.value = cleanString
        }
        const subValue = Number.parseFloat(cleanString)
        const value = field.value
        value[key] = subValue
        field.setValue(value, { triggerChange: true })
      }
      onDrag(label, info => {
        const value = field.value
        value[key] += info.positionDelta.x * (info.shiftKey ? 10 : info.altKey ? .1 : 1) * step
        field.setValue(value, { triggerChange: true })
      })
      return { key, input }
    })
    field.init(initialValue, value => {
      for (const { key, input } of subFields) {
        input.value = value[key].toString()
      }
    })
  }
  
  return Field.updateOrCreate<Vector>(path, onCreate, valueArg)
}
