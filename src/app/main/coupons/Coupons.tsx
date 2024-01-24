import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import CommonHeader from 'app/shared-components/CommonHeader'
import { PATHS } from 'src/app/constants/common'
import { useSelector } from 'react-redux'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useAppDispatch } from 'app/store/store'
import {
  closeDialog,
  openDialog,
} from '@fuse/core/FuseDialog/store/fuseDialogSlice'
import CouponsContent from './CouponsContent'
import { selectSelectedIds } from './store/selectedIdsSlice'
import { useDeleteCouponMutation } from './CouponsApi'

/**
 * The orders page.
 */
export default function Coupons() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  const dispatch = useAppDispatch()
  const selectedIds = useSelector(selectSelectedIds)
  const [deleteCoupon] = useDeleteCouponMutation()

  return (
    <FusePageCarded
      header={
        <CommonHeader
          title="Coupons"
          url={PATHS.COUPONS}
          create
          deleteBtn
          disableDeleteBtn={selectedIds.length === 0}
          onDeleteBtnClick={() =>
            dispatch(
              openDialog({
                children: (
                  <>
                    <DialogTitle id="alert-dialog-title">
                      Delete Coupons
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to Delete these Coupons?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => dispatch(closeDialog())}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          selectedIds.map((id, i) =>
                            deleteCoupon(id).then(
                              () =>
                                selectedIds.length - 1 === i &&
                                dispatch(closeDialog()),
                            ),
                          )
                        }
                        color="primary"
                        autoFocus
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </>
                ),
              }),
            )
          }
        />
      }
      content={<CouponsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
