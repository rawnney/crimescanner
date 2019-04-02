// @flow
export let mapCrime = (obj: Object): Object => {
  return obj.map((item, index) => {
    let {location} = item
    let {name, gps} = location
    let latitude = gps.split(',')[0]
    let longitude = gps.split(',')[1]
    location = {
      name,
      latitude,
      longitude
    }
    return {...item, location}
  })
}
