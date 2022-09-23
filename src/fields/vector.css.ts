export const vectorCss = /* css */`

#mnui .vector {
}

#mnui .vector .vector-property {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}

#mnui .vector .vector-property + .vector-property {
  margin-left: 4px;
}

#mnui .vector .vector-label {
  padding-right: 4px;
  cursor: ew-resize;
  user-select: none;
}

#mnui .vector .vector-label > * {
  pointer-events: none;
}

#mnui .vector .vector-input {
  flex: 1;
}

#mnui .vector .vector-input::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  opacity: .2;
  border-radius: 2px;
  pointer-events: none;
}

#mnui .vector input {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  text-align: right;
}

#mnui .vector input:focus {
  outline: none;
}


`
