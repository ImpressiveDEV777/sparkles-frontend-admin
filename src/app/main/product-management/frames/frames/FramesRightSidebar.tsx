import FuseNavigation from '@fuse/core/FuseNavigation'
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType'
import { Typography } from '@mui/material'

/**
 * Navigation data
 */
const navigationData: FuseNavItemType[] = [
  {
    id: '1',
    title: 'Lists',
    type: 'group',
    children: [
      {
        id: '1.1',
        title: 'Classic Frames',
        type: 'item',
        icon: 'heroicons-outline:clipboard-list',
      },
      {
        id: '1.3',
        title: 'Premium Frames',
        type: 'item',
        icon: 'heroicons-outline:clipboard-list',
      },
      {
        id: '1.4',
        title: 'Signature Frames',
        type: 'item',
        icon: 'heroicons-outline:clipboard-list',
      },
      {
        id: '1.5',
        title: 'Dany Frames',
        type: 'item',
        icon: 'heroicons-outline:clipboard-list',
      },
    ],
  },
  {
    id: '4',
    type: 'divider',
  },
]

/**
 * The DemoSidebar component.
 */
function FramesRightSidebar() {
  return (
    <div className="px-12 py-24">
      <Typography variant="h6" className="px-16">
        Size List
      </Typography>

      <FuseNavigation navigation={navigationData} className="px-0" />
    </div>
  )
}

export default FramesRightSidebar
