# mnui 
Minimal UI kit for quick prototyping.

[demo](https://jniac.github.io/mnui/test/demo/)

The kit allows to declare a dom inspector in a functional / declarative way:

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

<img width="432" alt="image" src="https://user-images.githubusercontent.com/11039919/192141550-530be514-5011-4b1c-b1c0-e81a54be1f9f.png">


## Dev
```
yarn start
```

## Note
- Minimal ES version: 2015 (using private identifier)
- Use [Fira Code](https://github.com/tonsky/FiraCode) from [google fonts](https://fonts.google.com/specimen/Fira+Code?query=fira+code) for UI rendering.

## Resources
- [configurer-rollup-bundles-esm-cjs](https://buzut.net/configurer-rollup-bundles-esm-cjs/#Installer-les-dependances)
