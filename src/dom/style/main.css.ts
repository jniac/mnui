import { borderCss } from './border.css'
import { fieldCss } from './field.css'

import { simpleButtonCss } from '../elements/simple-button.css'
import { simpleInputCss } from '../elements/simple-input.css'
import { simpleInputWithLabelCss } from '../elements/simple-input-with-label.css'
import { sliderCss } from '../elements/slider.css'

import { buttonCss } from '../../fields/button.css'
import { rangeCss } from '../../fields/range.css'
import { toggleCss } from '../../fields/toggle.css'
import { vectorCss } from '../../fields/vector.css'

export const mainCss = /* css */`

@import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=block);

${borderCss}
${fieldCss}

${simpleButtonCss}
${simpleInputCss}
${simpleInputWithLabelCss}
${sliderCss}

${buttonCss}
${rangeCss}
${toggleCss}
${vectorCss}

#mnui {
  --root-padding: 8px;
  --root-width: 320px;
  --input-width: 160px;
  --line-height: 26px;
  --color: white;
  --active-color: gold;
  --none-hover-opacity: .75;
  --hover-transition: .15s ease-out;
  --padding-left: 4px;
}

#mnui {
  position: fixed;
  top: var(--root-padding);
  left: var(--root-padding);
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  letter-spacing: -.05em;
  width: var(--root-width);
  color: var(--color);
  background-color: #0004;
  backdrop-filter: blur(32px) brightness(1.15);
  -webkit-backdrop-filter: blur(32px) brightness(1.15);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#mnui .group > .label {
  user-select: none;
  cursor: pointer;
  height: var(--line-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
}

#mnui .group.field-focus > .label,
#mnui .group > .label:hover,
#mnui .field.field-focus > .label .name {
  font-weight: 800;
}

#mnui .group > .label::after {
  --size: 6px;
  content: '';
  position: absolute;
  top: calc((var(--line-height) - var(--size)) / 2);
  left: 6px;
  width: var(--size);
  height: var(--size);
  background-color: currentColor;
  -webkit-mask-size: cover;
  -webkit-mask-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"%2F%3E%3C%2Fsvg%3E');
}

#mnui .group > .content {
  padding-left: 4px;
}

#mnui .group.collapsed > .label::after {
  transform: rotate(-90deg);
}

#mnui .group.collapsed > .content {
  display: none;
}

`