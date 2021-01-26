import getOption from '@utils/get-option'
// 把字符串转为方法名，带参数
export function strToFun(fun, param){
  eval(fun +'("'+param+'")')
}
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

export async function getOptions(){
  let filterOptions = {}

  filterOptions['hasFake'] = {
    list: [
      { text: '有赝品', value: true },
      { text: '无赝品', value: false }
    ],
    title: '有无赝品',
    key: 'hasFake',
    mulit: false // 单选
  }

  filterOptions['ownStatus'] = {
    list: [
      { text: '未捕捉', value: false },
      { text: '已捕捉', value: true }
    ],
    title: '捕捉情况',
    key: 'ownStatus',
    mulit: false
  }

  filterOptions['collectStatus'] = {
    list: [
      { text: '未拥有', value: true },
      { text: '已拥有', value: false },
    ],
    title: '收集情况',
    key: 'collectStatus',
    mulit: false
  }

  // 鱼类
  filterOptions['fishLocale'] = await getOption({ type: 'fishLocale', title: '场所', key: 'locale'})
  filterOptions['fishUnlock'] = await getOption({ type: 'fishUnlock', title: '解锁条件', key: 'unlockCondition'})
  filterOptions['shadow'] = await getOption({ type: 'shadow', title: '鱼影大小', key: 'shadow'})  

  // 昆虫
  filterOptions['insectLocale'] = await getOption({ type: 'insectLocale', title: '场所', key: 'locale'})
  filterOptions['insectUnlock'] = await getOption({ type: 'insectUnlock', title: '解锁条件', key: 'unlockCondition'})
 
  // 海洋生物
  filterOptions['halobiosLocale'] = await getOption({ type: 'halobiosLocale', title: '场所', key: 'locale'})
  filterOptions['halobiosUnlock'] = await getOption({ type: 'halobiosUnlock', title: '解锁条件', key: 'unlockCondition'})
  filterOptions['halobiosShadow'] = await getOption({ type: 'halobiosShadow', title: '鱼影大小', key: 'shadow'})  

  // 通用
  filterOptions['rarity'] = await getOption({ type: 'rarity', title: '稀有度', key: 'rarity'})  
  filterOptions['size'] = await getOption({ type: 'size', title: '尺寸', key: 'size'})  
  
  return filterOptions
}