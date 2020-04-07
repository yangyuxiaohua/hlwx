/**
 * 登录 
 */

import req from '@/utils/request'

// 1登录
export const login = params => req.post('/s_login', params)
// 获取登录用户详情
export const getUserInfor = params => req.post('/getLoginAccountInfo', params)
// 2获取账号列表
// export const getAccountList = params => req.get('/account/accountlist', params)