export const toggleCss = /* css */`

#mnui .toggle {
  --width: 32px;
  --height: 16px;
}

#mnui .toggle input {
  opacity: 0;
  cursor: pointer;
}

#mnui .toggle .input .toggle-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  opacity: var(--none-hover-opacity);
  transition: opacity var(--hover-transition);
}
#mnui .toggle .input.hovered .toggle-overlay {
  --color: var(--active-color);
  opacity: 1;
}

#mnui .toggle .input .toggle-overlay svg {
  fill: var(--color);
  transform: translateY(1px);
}

#mnui .toggle .input .toggle-overlay svg {
  transition: opacity .25s ease-out;
}

#mnui .toggle .input .toggle-overlay circle {
  transition: cx .25s ease-out;
}

`
