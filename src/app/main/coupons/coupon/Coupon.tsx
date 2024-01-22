import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect } from '@fuse/hooks'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Link, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { PATHS } from 'src/app/constants/common'
import {
  getSupplier,
  newSupplier,
  resetSupplier,
  selectSupplier,
} from '../store/couponSlice'
import SupplierHeader from './CouponHeader'
import SupplierForm from './CouponForm'

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
function Supplier() {
  const dispatch = useAppDispatch()
  const { data: supplier, status } = useAppSelector(selectSupplier)
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const routeParams = useParams()
  const [noSupplier, setNoSupplier] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useDeepCompareEffect(() => {
    function updateSupplierState() {
      const { supplierId } = routeParams

      if (supplierId === 'new') {
        /**
         * Create New Supplier data
         */
        dispatch(newSupplier())
      } else {
        /**
         * Get Supplier data
         */
        dispatch(getSupplier(supplierId)).then(action => {
          /**
           * If the requested supplier is not exist show message
           */
          if (!action.payload) {
            setNoSupplier(true)
          }
        })
      }
    }

    updateSupplierState()
  }, [dispatch, routeParams])

  useEffect(() => {
    if (!supplier) {
      return
    }

    /**
     * Reset the form on supplier state changes
     */
    reset(supplier)
  }, [supplier, reset])

  useEffect(() => {
    return () => {
      /**
       * Reset Supplier on component unload
       */
      dispatch(resetSupplier())
      setNoSupplier(false)
    }
  }, [dispatch])

  if (status === 'loading') {
    return <FuseLoading />
  }
  /**
   * Show Message if the requested suppliers is not exists
   */
  if (noSupplier) {
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

export default Supplier
