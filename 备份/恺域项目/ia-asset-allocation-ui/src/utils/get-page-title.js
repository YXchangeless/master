import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Asset Allocation'

// 获取Title
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
