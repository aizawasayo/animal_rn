// 判断两个对象的内容是否一致
export function isObjectValueEqual(a, b) {
  // 判断两个对象是否指向同一内存，指向同一内存返回true
  if (a === b) return true
  // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回false
  if (aProps.length !== bProps.length) return false
  // 遍历对象的键值
  for (let prop in a) {
   // 判断a的键值，在b中是否存在，不存在，返回false
   if (b.hasOwnProperty(prop)) {
    // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
    if (typeof a[prop] === 'object') {
     if (!isObjectValueEqual(a[prop], b[prop])) return false
    } else if (a[prop] !== b[prop]) {
     return false
    }
   } else {
    return false
   }
  }
  return true
}

//获取当前月份及下一月份的中文，博物馆列表图鉴用
export function getMonthStr() {
  const m = new Date().getMonth()
  const month = m + 1 + '月'
  const monthNext = m + 2 > 12 ? '1月' : m + 2 + '月'
  return { 
    isOnMonth: (data) => data.includes(month), 
    isGoNextM: (data) => data.includes(month) && !data.includes(monthNext)
  }
}

// 获取点击排序列表组按键后的最新排序值
export function getChangedSort(sortName, sort) {
  const sortKey = Object.keys(sort)[0]
  const sortVal = sort[sortKey]
  let newSort = {[sortName]: 1}
  if (sortName === sortKey) { // 如果是切换同一个key的正序倒序     
    const sVal = sortVal === 1 ? -1 : 1
    newSort = {[sortName]: sVal}
  }
  return newSort
}