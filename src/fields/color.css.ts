export const colorCss = /* css */`

#mnui .field.color {
  --input-color: red;
}

#mnui .field.color .input {
  background-color: var(--input-color);
  border-radius: 2px;
}

#mnui .field.color input {
  opacity: 0;
  cursor: pointer;
}

#mnui .field.color .hex {
  position: absolute;
  pointer-events: none;
  opacity: .33;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
`