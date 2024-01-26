export function genFrameSizeFromRatio(aspectRatio: string) {
  if (!aspectRatio) return []
  const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number)
  if (!widthRatio || !heightRatio) return []
  const combinations: {
    width: number
    height: number
    print_size: string
  }[] = []

  for (let width = 1; combinations.length < 100; width += 1) {
    const height = Math.round((width / widthRatio) * heightRatio)
    const calculatedRatio = width / height

    if (Math.abs(calculatedRatio - widthRatio / heightRatio) < 0.01) {
      combinations.push({ width, height, print_size: `${width}x${height}` })
    }
  }

  return combinations
}
