import request from '@utils/request'

export function getComments(type,params) {
  return request({
    url: `comment/${type}`,
    method: 'get',
    params
  })
}

export function addComment(type,data) {
  return request({
    url: `comment/${type}`,
    method: 'post',
    data
  })
}