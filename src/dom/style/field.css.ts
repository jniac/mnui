export const fieldCss = /* css */`

#mnui .field {
  height: var(--line-height);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-right: 4px;
  box-sizing: content-box;
  padding-top: 2px;
}

#mnui .field > .label {
  margin-right: 8px;
  flex: 1;
  padding-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#mnui .field > .label > .name {
  overflow: hidden;
  white-space: nowrap;
  cursor: none;
  text-overflow: ellipsis;
}

#mnui .field > .input {
  flex: 0 0 var(--input-width);
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#mnui .field > .input > * {
  flex: 1;
}

`