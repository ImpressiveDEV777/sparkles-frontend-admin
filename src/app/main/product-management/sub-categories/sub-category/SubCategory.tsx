import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { z } from 'zod'
import { PATHS } from 'src/app/constants/common'
import { zodResolver } from '@hookform/resolvers/zod'
import SubCategoryHeader from './SubCategoryHeader'
import SubCategoryForm from './SubCategoryForm'
import { useGetSubCategoryQuery } from '../SubCategoriesApi'
import SubCategoryModel from './models/SubCategoryModel'

/**
 * Form Validation Schema
 */
const schema = z.object({
  title: z.string().min(1),
  active: z.boolean(),
  description: z.string().min(1),
  product_category: z.string().min(1),
})

/**
 * The category page.
 */
export default function SubCategory() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const routeParams = useParams()

  const { subCategoryId } = routeParams

  const {
    data: category,
    isLoading,
    isError,
  } = useGetSubCategoryQuery(subCategoryId)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useEffect(() => {
    if (subCategoryId === 'new') {
      reset(SubCategoryModel({}))
    }
  }, [subCategoryId, reset])

  useEffect(() => {
    if (category) {
      reset({ ...category })
    }
  }, [category, reset])

  if (isLoading) {
    return <FuseLoading />
  }
  /**
   * Show Message if the requested categories is not exists
   */
  if (isError && subCategoryId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such sub category!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to={PATHS.SUB_CATEGORIES}
          color="inherit"
        >
          Go to Sub Categories Page
        </Button>
      </motion.div>
    )
  }

  /**
   * Wait while category data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (category &&
      routeParams.subCategoryId !== category.id &&
      routeParams.subCategoryId !== 'new')
  ) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<SubCategoryHeader />}
        content={
          <div className="p-16 sm:p-24">
            <SubCategoryForm />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}
