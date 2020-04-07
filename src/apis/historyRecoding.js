import req from '@/utils/request'


// 查询报警记录
export const pageHistoryAlarmRecord = params=>req.post('/warning/record/pageHistoryAlarmRecord',params)