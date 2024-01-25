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
import CategoryHeader from './CategoryHeader'
import CategoryForm from './CategoryForm'
import { useGetCategoryQuery } from '../CategoriesApi'
import CategoryModel from './models/CategoryModel'

/**
 * Form Validation Schema
 */
const schema = z.object({
  CategoryCode: z.string().min(1, 'You must enter a(an) CategoryCode field'),
  appliedFor: z.string().min(1, 'You must enter a(an) appliedFor field'),
  category_type: z.string().min(1, 'You must enter a(an) category_type field'),
  discount_amount: z.number(),
  expiryType: z.enum(['date_range', 'no_of_days']),
  subject: z.string().min(1, 'You must enter a(an) subject field'),
  message: z.string().min(1, 'You must enter a(an) message field'),
})

/**
 * The category page.
 */
export default function Category() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const routeParams = useParams()

  const { categoryId } = routeParams

  const { data: category, isLoading, isError } = useGetCategoryQuery(categoryId)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useEffect(() => {
    if (categoryId === 'new') {
      reset(CategoryModel({}))
    }
  }, [categoryId, reset])

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
  if (isError && categoryId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such category!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to={PATHS.CATEGORIES}
          color="inherit"
        >
          Go to Categories Page
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
      routeParams.categoryId !== category.id &&
      routeParams.categoryId !== 'new')
  ) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<CategoryHeader />}
        content={
          <div className="p-16 sm:p-24">
            <CategoryForm initialCategoryCode={category?.CategoryCode} />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}
