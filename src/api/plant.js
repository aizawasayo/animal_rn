import request from '@utils/request'

export function getPlants(params) {
  return request({
    url: 'admin/plant',
    method: 'get',
    params
  })
}

export function getPlant(id) {
  return request({
    url: 'admin/plant/' + id,
    method: 'get'
  })
}

export function searchPlant(name) {
  return request({
    url: 'admin/plant/search',
    method: 'get',
    params: {
      name
    }
  })
}