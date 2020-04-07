/**
 *  区域列表接口
 */

import req from '@/utils/request'


// (火自报) 获取 楼层 - 所有设备状态（前端根据状态变动图标背景颜色（例如：火警背景变红））
export const listFireDevicesIcon = params=>req.post('/floor/listFireDevicesIcon',params)

//图片地址
export const imgIp = 'http://192.168.0.200:3221/image?url='