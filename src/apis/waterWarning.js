/**
 *  水系统接口
 */

import req from '@/utils/request'



// 查询水泵房预警记录
export const pageIotAlarmRealRecord = params=>req.post('/warning/record/pageIotAlarmRealRecord',params)
// 查询水泵房预警记录
export const listWaterIotDevices = params=>req.post('/warning/record/listWaterIotDevices',params)