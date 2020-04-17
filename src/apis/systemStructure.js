/**
 * 系统结构tree数组
 */

import req from '@/utils/request'

// 按照用户主键 - 查询业主单位区域列表
export const listSelfFactoryRegionalByUserId = params => req.get('/iot/water/regional/listSelfFactoryRegionalByUserId', params)

