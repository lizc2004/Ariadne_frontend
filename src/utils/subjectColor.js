const HUE_PALETTE = [220, 260, 300, 340, 20, 50, 80, 140, 170, 190]

export function subjectHue(nome) {
  let hash = 0
  for (let i = 0; i < nome.length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash)
  }
  const indice = Math.abs(hash) % HUE_PALETTE.length
  return HUE_PALETTE[indice]
}