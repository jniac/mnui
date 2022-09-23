export const sliderCss = /* css */`

#mnui .slider {
  flex: 1;
  align-self: stretch;
}

#mnui .slider input {
  opacity: 0;
  width: 100%;
}

#mnui .slider .slider-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#mnui .slider .slider-overlay > * {
  position: absolute;
}

#mnui .slider .slider-overlay .thumb {
  width: var(--thumb-width);
  height: var(--thumb-height);
  background-color: var(--color);
  top: calc((100% - var(--thumb-height)) / 2);
  left: calc((100% - var(--thumb-width)) * var(--position));
  border-radius: min(calc(var(--thumb-width) / 2), calc(var(--thumb-height) / 2));
}

#mnui .slider .slider-overlay .track {
  height: var(--track-height);
  background-color: var(--color);
  top: calc((100% - var(--track-height)) / 2);
}

#mnui .slider .slider-overlay .track.before {
  width: max(0px, calc((100% - var(--thumb-width)) * var(--position) - var(--thumb-padding)));
  border-radius: calc(var(--track-height) / 2) 0 0 calc(var(--track-height) / 2);
}

#mnui .slider .slider-overlay .track.after {
  width: max(0px, calc((100% - var(--thumb-width)) * (1 - var(--position)) - var(--thumb-padding)));
  border-radius: 0 calc(var(--track-height) / 2) calc(var(--track-height) / 2) 0;
  right: 0;
  opacity: var(--after-opacity);
}
`