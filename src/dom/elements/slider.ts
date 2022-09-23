import { inverseLerp } from '../../math'
import { createElement } from '../html'

export const createSlider = (parent: HTMLElement, {
  min = 0,
  max = 1,
  step = 0,
}) => {
  const [slider] = createElement<HTMLDivElement>(parent, `
    <div class="slider">
      <div class="slider-overlay">
        <div class="track before"></div>
        <div class="thumb"></div>
        <div class="track after"></div>
      </div>
      <input type="range" step="${step === 0 ? 'any' : step}" min="${min}" max="${max}">
    </div>
  `)
  const input = slider.querySelector('input') as HTMLInputElement
  const update = (value: number) => {
    input.value = value.toString()
    slider.style.setProperty('--position', inverseLerp(min, max, value).toPrecision(4))
  }
  return { input, update }
}
