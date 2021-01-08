import request from '@utils/request'

export function getRecipes(params) {
  return request({
    url: 'admin/recipe',
    method: 'get',
    params
  })
}

export function getRecipe(id) {
  return request({
    url: 'admin/recipe/' + id,
    method: 'get'
  })
}

export function searchRecipe(name) {
  return request({
    url: 'admin/recipe/search',
    method: 'get',
    params: {
      name
    }
  })
}