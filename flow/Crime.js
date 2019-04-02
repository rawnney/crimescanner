// @flow

type Crime = {
  id: number,
  datetime: string,
  title: string,
  summary: string,
  url: string,
  type: string,
  location: {
    name: string,
    latitude: string,
    longitude: string
  }
}
