export const createDateWithOffset = (isoString) => {
  const dateWithOffset = new Date(isoString)
  const timezoneOffsetMs = dateWithOffset.getTimezoneOffset() * 60 * 1000
  return new Date(dateWithOffset.getTime() + timezoneOffsetMs)
}
