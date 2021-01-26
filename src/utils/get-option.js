import { getOptionList } from '@api/option'

export default async function getOption({type, title, key, unMulit}) {
  try {
    let res = await getOptionList({type}) 
    let optionList = res.data.map(item => ({
      text: item.name,
      value: item.name,
      // checked: false
    }))
    let isMulit = unMulit ? false : true
    const option = { list: optionList, title, filterKey: key, mulit: isMulit } 
    return option
  } catch (err) {
    console.warn(err)
  } 
}
