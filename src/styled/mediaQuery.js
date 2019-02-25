import { css } from 'styled-components'

const sizes = {
  widescreen: 1200,
  desktop: 992,
  pad: 768,
  mobile: 576
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})