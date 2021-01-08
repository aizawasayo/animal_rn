import request from '@utils/request'

export function getRecords(params) {
  return request({
    url: 'admin/record',
    method: 'get',
    params
  })
}

export function getRecord(id) {
  return request({
    url: 'admin/record/' + id,
    method: 'get'
  })
}

export function searchRecord(name) {
  return request({
    url: 'admin/record/search',
    method: 'get',
    params: {
      name
    }
  })
}