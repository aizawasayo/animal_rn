import request from '@utils/request'

export function getMaterials(params) {
  return request({
    url: 'admin/material',
    method: 'get',
    params
  })
}

export function getMaterial(id) {
  return request({
    url: 'admin/material/' + id,
    method: 'get'
  })
}

export function searchMaterial(name) {
  return request({
    url: 'admin/material/search',
    method: 'get',
    params: {
      name
    }
  })
}