import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import FrameSizesHeader from './FrameSizesHeader'
import FrameSizesContent from './FrameSizesContent'

/**
 * The orders page.
 */
export default function FrameSizes() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<FrameSizesHeader />}
      content={<FrameSizesContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
