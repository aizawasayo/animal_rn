import request from '@utils/request'

export function upload(data) {
  return request({
    url: 'admin/user/upload',
    method: 'post',
    data
  })
}

export function uploadMult(data) {
  return request({
    url: 'admin/upload',
    method: 'post',
    data
  })
}