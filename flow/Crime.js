// @flow

type Crime = {
  id: number,
  datetime: string,
  displayTime: string,
  title: string,
  summary: string,
  url: string,
  type: string,
  icon: string,
  location: {
    name: string,
    latitude: string,
    longitude: string
  }
}

type CrimeType = Array<{
  key: string,
  param: string,
  icon: string
}>
