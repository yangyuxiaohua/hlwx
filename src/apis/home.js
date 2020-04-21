/**
 *  区域列表接口
 */

import req from '@/utils/request'

// 按照用户主键 - 查询业主单位区域列表

export const listSelfFactoryRegionalByUserId = params=>req.get('/region/listSelfFactoryRegionalByUserId',params)
// 查询首火警
export const pageFirstAlarmRecord = params=>req.post('/warning/record/pageFirstAlarmRecord',params)
// 查询实时报警记录
export const listRealTimeAlarmRecord = params=>req.post('/warning/record/listRealTimeAlarmRecord',params)
// 查询用户火警数量
export const countFires = params=>req.post('/warning/record/countFires',params)
// 通过设备主键查询设备
export const getDevicesById = params=>req.get('/device/getDevicesById',params)
