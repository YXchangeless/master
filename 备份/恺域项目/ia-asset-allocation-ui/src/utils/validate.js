import request from '@/utils/request'
import { Message } from 'element-ui'

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function base64toBlob(base64Data) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ia], {
    type: mimeString
  })
  return blob
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * @des post 下载
 * @param {string} url
 * @param {Object} param
 * @param {string} application
 * @param {string} fileName
 * @returns binary
 */
export async function downloadPost(url, param, application = 'application/MS-Excel', fileName) {
  const res = await request({
    responseType: 'blob',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    url: url,
    method: 'post',
    data: param
  })

  if (res) {
    const urlObjData = window.URL.createObjectURL(new Blob([res], { type: application }))
    const link = document.createElement('a')
    link.href = urlObjData
    link.download = fileName || 'xxx.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(urlObjData)
  } else {
    Message.error('下载文件失败')
  }
}

/**
 * @des post 下载
 */
export async function downloadPost1(url, param, application = 'application/msword', fileName) {
  const res = await request({
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: url,
    method: 'post',
    data: param
  })
  if (res) {
    const urlObjData = window.URL.createObjectURL(new Blob([res], { type: application }))
    const link = document.createElement('a')
    link.href = urlObjData
    link.download = fileName || 'xxx.docx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(urlObjData)
  } else {
    Message.error('下载文件失败')
  }
}
