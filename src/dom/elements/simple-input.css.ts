export const simpleInputCss = /* css */`

#mnui .simple-input {
  --background-opacity: .2;
  transition: color var(--hover-transition), --color var(--hover-transition);
}

#mnui .hovered > .simple-input,
#mnui .simple-input.hovered,
#mnui .focused > .simple-input,
#mnui .simple-input.focused {
  --color: var(--active-color);
  color: var(--color);
  --background-opacity: .33;
}

#mnui .simple-input input {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  text-align: right;
}

#mnui .simple-input input:focus {
  outline: none;
}

#mnui .simple-input::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  opacity: var(--background-opacity);
  border-radius: 2px;
  pointer-events: none;
  transition: opacity var(--hover-transition);
}

`