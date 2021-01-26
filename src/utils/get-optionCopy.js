import { getOptionList } from '@api/option'

export default function getOption({type, title, key, unMulit}, callback) {
  getOptionList({type}).then(res => {
    let optionList = res.data.map(item => ({
      text: item.name,
      value: item.name
    }))
    let isMulit = unMulit ? false : true
    const option = { list: optionList, title, key, mulit: isMulit } 
    callback(option)
  })
}
