import request from '@utils/request'

export function getOptions(params) { //分页查询
  return request({
    url: 'admin/option',
    method: 'get',
    params
  })
}

export function getOption(id) {
  return request({
    url: 'admin/option/' + id,
    method: 'get'
  })
}

export function searchOption(name) {
  return request({
    url: 'admin/option/search',
    method: 'get',
    params: {
      name
    }
  })
}

export function getOptionList(params) { //非分页获查询
  return request({
    url: 'admin/option/list',
    method: 'get',
    params
  })
}