import req from '@/utils/request'


// 查询火灾自动报警历史记录
export const pageHistoryAlarmRecord = params => req.post('/warning/record/pageHistoryAlarmRecord', params)
//查询水泵房报警历史记录
export const pageIotAlarmHistoryRecord = params => req.post('/warning/record/pageIotAlarmHistoryRecord', params)