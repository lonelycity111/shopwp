// const KEY = 'GOODS'

// // 从本地取出key=GOODS的对象
// const getLocalGoods = () => {
//   return mpvue.getStorageSync(KEY) || {}
// }
// /**
//  * 新增
//  * goods = {goods_id:111,goods_number:1}
//  * @param {*} goods
//  */
// const addGoods = goods => {
//   // {129:1,38:2}
//   const localGoods = getLocalGoods()

//   if (localGoods[goods.goods_id]) { // 本地有
//     localGoods[goods.goods_id] += goods.goods_number
//   } else {
//     localGoods[goods.goods_id] = goods.goods_number
//   }

//   // 保存回去
//   mpvue.setStorageSync(KEY, localGoods)
// }

// /**
//  * 修改
//  * goods = {goods_id:111,goods_number:1}
//  * @param {*} goods
//  */
// const updateGoods = goods => {
//   // {129:1,38:2}
//   const localGoods = getLocalGoods()

//   // 直接更改
//   localGoods[goods.goods_id] = goods.goods_number

//   // 保存回去
//   mpvue.setStorageSync(KEY, localGoods)
// }

// /**
//  * 删除
//  * @param {*} goods_id
//  */
// const deleteGoods = goods_id => {
//     // {129:1,38:2}
//     const localGoods = getLocalGoods()

//     // 删除
//     delete localGoods[goods_id]

//     // 保存回去
//     mpvue.setStorageSync(KEY,localGoods)
// }

// export {
//     addGoods,
//     getLocalGoods,
//     updateGoods,
//     deleteGoods
// }
