import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'
import { cloneValue } from '../core/value'

type RGBA = { r: number, g: number, b: number, a: number }

type ColorDeclaration = 
| `#${string}`
| number
| { r: number, g: number, b: number, a?: number }

type RangeOptions = Partial<{
  localStorage: boolean
}>

const colorDeclarationToRgba = (color: ColorDeclaration): RGBA => {
  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      const str = color.substring(1)
      if (str.length === 6 || str.length === 8) {
        const r = Number.parseInt(str.slice(0, 2), 16) / 0xff
        const g = Number.parseInt(str.slice(2, 4), 16) / 0xff
        const b = Number.parseInt(str.slice(4, 6), 16) / 0xff
        const a = str.length === 8 ? Number.parseInt(str.slice(6, 8)) / 0xff : 1
        return { r, g, b, a }
      }
      if (str.length === 3 || str.length === 4) {
        const r = Number.parseInt(str.slice(0, 1), 16) / 0xf
        const g = Number.parseInt(str.slice(1, 2), 16) / 0xf
        const b = Number.parseInt(str.slice(2, 3), 16) / 0xf
        const a = str.length === 4 ? Number.parseInt(str.slice(3, 4)) / 0xf : 1
        return { r, g, b, a }
      }
    }
    throw new Error(`Only #rrggbb format is currently supported (received: ${color}).`)
  }

  if (typeof color === 'number') {
    const r = (color >> 16) / 0xff
    const g = (color >> 8 & 0xff) / 0xff
    const b = (color & 0xff) / 0xff
    const a = 1
    return { r, g, b, a }
  }

  if (typeof color === 'object') {
    if ('r' in color && 'g' in color && 'b' in color) {
      const { r, g, b, a = 1 } = color
      return { r, g, b, a }
    }
  }

  throw new Error(`Invalid color argument.`)
}

const floatToInt = (x: number) => {
  return Math.floor(Math.min(x * 0x100, 0xff))
}

const floatToHexString = (x: number) => {
  return floatToInt(x).toString(16).padStart(2, '0')
}

const rgbaToHexString = (color: RGBA): `#{string}` => {
  const { r, g, b, a } = color
  return '#' + floatToHexString(r) + floatToHexString(g) + floatToHexString(b) + floatToHexString(a) as `#{string}`
}

const rgbToHexString = (color: RGBA): `#{string}` => {
  const { r, g, b } = color
  return '#' + floatToHexString(r) + floatToHexString(g) + floatToHexString(b) as `#{string}`
}

const getValueInInitialFormat = (color: RGBA, initialValue: ColorDeclaration) => {
  if (typeof initialValue === 'string') {
    return initialValue.length === 8 || initialValue.length === 4
      ? rgbaToHexString(color)
      : rgbToHexString(color)
  }
  if (typeof initialValue === 'number') {
    const { r, g, b } = color
    return floatToInt(r) << 16 + floatToInt(g) << 8 + b
  }
  if (typeof initialValue === 'object') {
    const value = cloneValue(initialValue)
    const { r, g, b, a } = color
    value.r = r
    value.g = g
    value.b = b
    if ('a' in value) {
      value.a = a
    }
    return value
  }
  console.error({ color, initialValue })
  throw new Error(`Oops`)
}

export const color = (
  path: string,
  valueArg: InputValueArg<ColorDeclaration> = 0,
  options: RangeOptions = {},
) => {
  const onCreate = (field: Field<ColorDeclaration>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('color')
    inputDiv.innerHTML = `
      <input type="color">
      <div class="hex">#ff3344</div>
    `
    const input = inputDiv.querySelector('input') as HTMLInputElement
    const hexDiv = inputDiv.querySelector('.hex') as HTMLDivElement
    input.oninput = () => {
      const color = colorDeclarationToRgba(input.value as `#{number}`)
      const value = getValueInInitialFormat(color, initialValue)
      field.setUserValue(value)
    }
    field.init(initialValue, value => {
      const rgba = colorDeclarationToRgba(value)
      const hex = rgbaToHexString(rgba)
      div.style.setProperty('--input-color', hex)
      input.value = hex.slice(0, 7)
      hexDiv.innerHTML = hex.replace(/ff$/, '')
    })
  }

  return Field.updateOrCreate<ColorDeclaration>(path, onCreate, valueArg, options.localStorage ?? false)
}
