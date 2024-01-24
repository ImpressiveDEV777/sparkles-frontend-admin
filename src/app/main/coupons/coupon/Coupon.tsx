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
import CouponHeader from './CouponHeader'
import CouponForm from './CouponForm'
import { useGetCouponQuery } from '../CouponsApi'
import CouponModel from './models/CouponModel'

/**
 * Form Validation Schema
 */
const schema = z.object({
  CouponCode: z.string().min(1, 'You must enter a(an) CouponCode field'),
  appliedFor: z.string().min(1, 'You must enter a(an) appliedFor field'),
  coupon_type: z.string().min(1, 'You must enter a(an) coupon_type field'),
  discount_amount: z.number(),
  expiryType: z.enum(['date_range', 'no_of_days']),
  subject: z.string().min(1, 'You must enter a(an) subject field'),
  message: z.string().min(1, 'You must enter a(an) message field'),
})

/**
 * The coupon page.
 */
export default function Coupon() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  const routeParams = useParams()

  const { couponId } = routeParams

  const { data: coupon, isLoading, isError } = useGetCouponQuery(couponId)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useEffect(() => {
    if (couponId === 'new') {
      reset(CouponModel({}))
    }
  }, [couponId, reset])

  useEffect(() => {
    if (coupon) {
      reset({ ...coupon })
    }
  }, [coupon, reset])

  if (isLoading) {
    return <FuseLoading />
  }
  /**
   * Show Message if the requested coupons is not exists
   */
  if (isError && couponId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such coupon!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to={PATHS.COUPONS}
          color="inherit"
        >
          Go to Coupons Page
        </Button>
      </motion.div>
    )
  }

  /**
   * Wait while coupon data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (coupon &&
      routeParams.couponId !== coupon.id &&
      routeParams.couponId !== 'new')
  ) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<CouponHeader />}
        content={
          <div className="p-16 sm:p-24">
            <CouponForm initialCouponCode={coupon?.CouponCode} />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}
