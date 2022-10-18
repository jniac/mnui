# mnui 
(Very, very permissive & multi-paradigm) MiNimal UI kit for quick prototyping.

<a href="https://jniac.github.io/mnui/test/demo/shader">
<img width="432" alt="image" src="https://user-images.githubusercontent.com/11039919/196380754-813b4874-2c2a-43ae-8629-bea31a0b208b.jpg">
</a>

[demo](https://jniac.github.io/mnui/test/demo/)


## Install

[NPM:](https://www.npmjs.com/package/@jniac/mnui)
```
npm i @jniac/mnui
```

[UNPKG:](https://unpkg.com/@jniac/mnui@1.0.6/dist/mnui.js)
```js
import { mnui } from 'https://unpkg.com/@jniac/mnui@1.0.6/dist/mnui.js'
```

## Very, very permissive & multi-paradigm?

### Multi-paradigm 👩‍🎤
The kit allow two different usages (multi-paradigm) :

- listener / callback:
```ts
import { mnui } from '@jniac/mnui'

mnui.range('my-value', 4, { min: 0, max: 10, step: 1 }).onUserChange(newValue => {
  uniforms.myEffect.value = newValue
})
```
- render loop:
```ts
import { mnui } from '@jniac/mnui'

const updateLoop = () => {
  uniforms.myEffect.value = mnui.range('my-value', uniforms.myEffect.value, { min: 0, max: 10, step: 1 }).value
}
```

### Permissive
Both usages may coexist ☮ in a same program:
```ts
import { mnui } from '@jniac/mnui'

mnui.range('my-value', 4, { min: 0, max: 10, step: 1 }).onUserChange(newValue => {
  amazingStuff(newValue)
})

const loop = () => {
  // Here, mnui is used only to retrieve the value of "my-value".
  // Note that there is no current value, neither props.
  uniforms.myEffect.value = mnui.range('my-value').value
}
```

### Very permissive
Properties may be grouped:
```ts
mnui.range('my-comp/my-value', 4, { min: 0, max: 10 })
```
Into any arbitrary hierarchy:
```ts
mnui.range('foo/bar/baz/qux/and/others/my-value-1', 4, { min: 0, max: 10 })
mnui.range('foo/bar/baz/qux/and/others/my-value-2', 2, { min: 0, max: 10 })
```
And for the sake of simplicity 😅, an intermediate "group" level may be declared: 
```ts
mnui.group('foo/bar/baz/qux/and/others', () => {
  mnui.range('my-value-1', 4, { min: 0, max: 10 })
  mnui.range('my-value-2', 2, { min: 0, max: 10 })
})
```

### Very, very permissive
Some properties — as "range" — allows concise declarations
```ts
 mnui.range('my-value-1', 4, [0, 10]) // [0, 10] <=> { min: 0, max: 10 }
```

So through the "listener / render-loop" choice, the "intermediate-group" usage and some "concise" options, declarations of properties to be displayed may cover a wide range of usages:
```ts
mnui.group('my-component', () => {
  mnui.range('scale', 1, [0, 10]).onUserChange(x => {
    dispatchMessage('new scale value', { value: x })
  })
})

const updateLoop = () => {
  myComp.someProperty.value = mnui.range('my-component/scale').value
}
```


## More complex example
```ts
import { mnui } from '@jniac/mnui'

const someState = {
  active: true,
  x: 5,
  position: { x: .3, y: .4, z: .5 },
  rotation: { x: .3, y: .4, z: .5, order: 'XYZ' },
}

mnui.setCustomStyle(`
  #mnui {
    --color: #005128;
    --background-color: #fff9;
  }
`)

mnui.setAlign('bottom-right')

const renderLoop = () => {
  requestAnimationFrame(renderLoop)

  mnui.group('My Component', () => {
    someState.active = mnui.toggle('active', someState.active).value
    someState.x = mnui.range('x', someState.x, { min: 0, max: 10 }).value
    mnui.vector('position', someState.position)
    mnui.vector('rotation', someState.rotation, { 
      keys: 'x,y,z', 
      step: .05,
      map: [
        x => x * 180 / Math.PI, 
        x => x * Math.PI / 180,
      ], 
    })
  })

  cube.position.copy(someState.position)
}

requestAnimationFrame(renderLoop)
```
will render into: 

<img width="432" alt="image" src="https://user-images.githubusercontent.com/11039919/196382125-4a710df2-106a-4ff4-8570-d331864eeb71.png">


## Dev
```
yarn start
```

## Note
- Minimal ES version: 2015 (using private identifier)
- Use [Fira Code](https://github.com/tonsky/FiraCode) from [google fonts](https://fonts.google.com/specimen/Fira+Code?query=fira+code) for UI rendering.

## Resources
- [configurer-rollup-bundles-esm-cjs](https://buzut.net/configurer-rollup-bundles-esm-cjs/#Installer-les-dependances)
