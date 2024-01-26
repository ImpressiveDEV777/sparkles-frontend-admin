import { styled } from '@mui/material/styles'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useEffect, useState } from 'react'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import FramesHeader from './FramesHeader'
import FramesContent from './FramesContent'
import FramesLeftSidebar from './FramesLeftSidebar'
import FramesRightSidebar from './FramesRightSidebar'

const Root = styled(FusePageCarded)(() => ({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-rightSidebar': {
    width: 600,
  },
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
}))

/**
 * The CardedWithSidebarsContentScroll page.
 */
function CardedWithSidebarsContentScrollComponent() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile)

  useEffect(() => {
    setLeftSidebarOpen(!isMobile)
  }, [isMobile])

  return (
    <Root
      header={
        <FramesHeader
          leftSidebarToggle={() => {
            setLeftSidebarOpen(!leftSidebarOpen)
          }}
          rightSidebarToggle={() => {
            setRightSidebarOpen(!rightSidebarOpen)
          }}
        />
      }
      content={<FramesContent />}
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false)
      }}
      leftSidebarContent={<FramesLeftSidebar />}
      scroll="content"
      rightSidebarContent={<FramesRightSidebar />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
    />
  )
}

export default CardedWithSidebarsContentScrollComponent
