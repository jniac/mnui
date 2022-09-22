import { border } from './border.css'

export default /* css */`

@import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=block);

${border}

#mnui {
  --root-padding: 8px;
  --root-width: 320px;
  --input-width: 160px;
  --line-height: 28px;
  --color: white;
}

#mnui {
  position: fixed;
  top: var(--root-padding);
  left: var(--root-padding);
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  width: var(--root-width);
  color: var(--color);
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
#mnui .field > .label:hover {
  text-decoration: underline;
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

#mnui .field {
  height: var(--line-height);
  display: flex;
  flex-direction: row;
  align-items: center;
}

#mnui .field .label {
  padding-left: 12px;
  cursor: none;
}

`