const pxToRem = (px: number): string => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return `${(px / rootFontSize).toString()}rem`
}

export default pxToRem
