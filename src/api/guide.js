import request from '@utils/request'

export function getGuideList(params) {
  return request({
    url: 'admin/guide',
    method: 'get',
    params
  })
}

export function getGuide(id) {
  return request({
    url: 'admin/guide/' + id,
    method: 'get'
  })
}
