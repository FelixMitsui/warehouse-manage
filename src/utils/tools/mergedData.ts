export function getMergedDate(data: Array<{ date_at: string; total: number }>) {
  const mergedData = {} as { [key: string]: number }

  data.forEach((item) => {
    const date = item.date_at.replace(/T.*/, '')
    const count = item.total

    if (mergedData[date]) {
      mergedData[date] += count
    } else {
      mergedData[date] = count
    }
  })

  const mergedItems = Object.keys(mergedData).map((date) => ({
    date_at: date,
    total: mergedData[date],
  }))
  return mergedItems
}
