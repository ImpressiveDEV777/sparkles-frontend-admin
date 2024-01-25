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
import SubCategoriesContent from './SubCategoriesContent'
import { selectSelectedIds } from './store/selectedIdsSlice'
import { useDeleteSubCategoryMutation } from './SubCategoriesApi'

/**
 * The orders page.
 */
export default function SubCategories() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  const dispatch = useAppDispatch()
  const selectedIds = useSelector(selectSelectedIds)
  const [deleteSubCategory] = useDeleteSubCategoryMutation()

  return (
    <FusePageCarded
      header={
        <CommonHeader
          title="SubCategories"
          url={PATHS.SUB_CATEGORIES}
          create
          deleteBtn
          disableDeleteBtn={selectedIds.length === 0}
          onDeleteBtnClick={() =>
            dispatch(
              openDialog({
                children: (
                  <>
                    <DialogTitle id="alert-dialog-title">
                      Delete SubCategories
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to Delete these SubCategories?
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
                            deleteSubCategory(id).then(
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
      content={<SubCategoriesContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
