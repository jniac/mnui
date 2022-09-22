export const rangeCss = /* css */`

#mnui .range input[type=range] {
  -webkit-appearance: none;     
  padding: 0;
  background-color: var(--color);
  opacity: 0;
}

#mnui .range {
  --track-height: 3px;
  --thumb-width: var(--track-height);
  --thumb-height: 12px;
  --thumb-padding: 1.5px;
  --position: .5;
  --after-opacity: .5;
}

#mnui .range .info {
  margin-left: 8px;
  opacity: .66;
}

#mnui .range > .label > .info {
  cursor: pointer;
}


#mnui .range .range-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#mnui .range .range-overlay > * {
  position: absolute;
}

#mnui .range .range-overlay .thumb {
  width: var(--thumb-width);
  height: var(--thumb-height);
  background-color: var(--color);
  top: calc((100% - var(--thumb-height)) / 2);
  left: calc((100% - var(--thumb-width)) * var(--position));
  border-radius: min(calc(var(--thumb-width) / 2), calc(var(--thumb-height) / 2));
}

#mnui .range .range-overlay .track {
  height: var(--track-height);
  background-color: var(--color);
  top: calc((100% - var(--track-height)) / 2);
}

#mnui .range .range-overlay .track.before {
  width: calc((100% - var(--thumb-width)) * var(--position) - var(--thumb-padding));
  border-radius: calc(var(--track-height) / 2) 0 0 calc(var(--track-height) / 2);
}

#mnui .range .range-overlay .track.after {
  width: calc((100% - var(--thumb-width)) * (1 - var(--position)) - var(--thumb-padding));
  border-radius: 0 calc(var(--track-height) / 2) calc(var(--track-height) / 2) 0;
  right: 0;
  opacity: var(--after-opacity);
}

`