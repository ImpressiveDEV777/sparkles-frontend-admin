import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { PATHS } from 'src/app/constants/common'
import SupplierHeader from './SupplierHeader'
import SupplierForm from './SupplierForm'
import { useGetSupplierQuery } from '../SuppliersApi'
import SupplierModel from './models/SupplierModel'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a Supplier Name'),
  type: yup.string().required('You must select a Supplier Type'),
  image: yup.mixed().required('You must select a Image'),
})

/**
 * The supplier page.
 */
export default function Supplier() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const routeParams = useParams()

  const { supplierId } = routeParams

  const { data: supplier, isLoading, isError } = useGetSupplierQuery(supplierId)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useEffect(() => {
    if (supplierId === 'new') {
      reset(SupplierModel({}))
    }
  }, [supplierId, reset])

  useEffect(() => {
    if (supplier) {
      reset({ ...supplier })
    }
  }, [supplier, reset])

  if (isLoading) {
    return <FuseLoading />
  }
  /**
   * Show Message if the requested suppliers is not exists
   */
  if (isError && supplierId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such supplier!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to={PATHS.SUPPLIERS}
          color="inherit"
        >
          Go to Suppliers Page
        </Button>
      </motion.div>
    )
  }

  /**
   * Wait while supplier data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (supplier &&
      routeParams.supplierId !== supplier.id &&
      routeParams.supplierId !== 'new')
  ) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<SupplierHeader />}
        content={
          <div className="p-16 sm:p-24">
            <SupplierForm />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}
