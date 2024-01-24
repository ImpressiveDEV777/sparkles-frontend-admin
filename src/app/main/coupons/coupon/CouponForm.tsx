import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { useAppDispatch } from 'app/store/store'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import dayjs from 'dayjs'
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor'
import { DataGridPro, gridClasses } from '@mui/x-data-grid-pro'
import { useEffect, useMemo, useState } from 'react'
import { List, pick, unionBy } from 'lodash'
import { Common } from 'src/app/res-types/sub/CommonType'
import { ClockLoader } from 'react-spinners'
import { Check, Clear } from '@mui/icons-material'
import axios, { AxiosResponse } from 'axios'
import { useSelector } from 'react-redux'
import { useGetWhitelabelsQuery } from '../../whitelabel-apps/WhitelabelAppsApi'
import { useGetSuppliersQuery } from '../../suppliers/SuppliersApi'
import { useGetCouponTypesQuery } from '../CouponsApi'
import {
  selectIsCouponCodeAvailableState,
  setIsCouponCodeAvailable,
} from '../store/isCouponCodeAvailableSlice'

function ProviderProductCustomToolbar() {
  return (
    <Typography variant="subtitle2" sx={{ marginBottom: '10px' }}>
      Select Applicable Products
    </Typography>
  )
}

export default function CouponForm({
  initialCouponCode,
}: {
  initialCouponCode?: string
}) {
  const dispatch = useAppDispatch()
  const isCouponCodeAvailable = useSelector(selectIsCouponCodeAvailableState)
  const { data: whitelabels } = useGetWhitelabelsQuery()
  const { data: suppliers } = useGetSuppliersQuery()
  const { data: couponTypes, isLoading: isCouponTypesLoading } =
    useGetCouponTypesQuery(suppliers || [])
  const methods = useFormContext()
  const [isLoadingCouponCode, setIsLoadingCouponCode] = useState(false)
  const { control, formState, getValues, setValue } = methods
  const {
    appliedFor,
    ImpactOnPrice,
    expiryType,
    startDate,
    expiryDate,
    CouponCode,
    // eslint-disable-next-line camelcase
    provider_products,
  } = getValues()
  useEffect(() => {
    const checkCouponCode = async () => {
      if (CouponCode) {
        setIsLoadingCouponCode(true)
        try {
          const { data }: AxiosResponse<{ isAvailable: boolean }> =
            await axios.post('/coupons/checkCouponCode', {
              CouponCode: CouponCode as string,
            })
          dispatch(
            setIsCouponCodeAvailable(
              data.isAvailable || CouponCode === initialCouponCode,
            ),
          )
        } catch (error) {
          dispatch(
            setIsCouponCodeAvailable(false || CouponCode === initialCouponCode),
          )
        } finally {
          setIsLoadingCouponCode(false)
        }
      } else {
        dispatch(setIsCouponCodeAvailable(true))
      }
    }

    checkCouponCode()
  }, [CouponCode, initialCouponCode])
  const { errors } = formState
  type SimpleProviderProduct = Common & { cover: { url: string } }
  type SimpleProviderProducts =
    | List<SimpleProviderProduct>
    | SimpleProviderProduct[]
  const providerProducts: SimpleProviderProducts = useMemo(() => {
    if (!couponTypes) {
      return []
    }
    return couponTypes.reduce(
      (prev, curr) =>
        unionBy(
          prev,
          curr.provider_products.map(providerProduct =>
            pick(providerProduct, ['id', 'title', 'cover.url']),
          ) as SimpleProviderProducts,
          'id',
        ) as SimpleProviderProducts,
      [] as SimpleProviderProducts,
    )
  }, [couponTypes])
  return (
    <div className="flex">
      <div className="w-2/3">
        <Controller
          name="CouponCode"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              className="my-8"
              required
              label="Coupon Code"
              id="CouponCode"
              variant="outlined"
              value={value as string}
              onChange={e => {
                const value = e.target.value.replace(/\s/g, '')
                setValue('CouponCode', value)
                onChange(value)
              }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isLoadingCouponCode ? (
                      <ClockLoader size={20} color="#888" />
                    ) : (
                      CouponCode &&
                      (isCouponCodeAvailable ? (
                        <Check style={{ color: 'green' }} />
                      ) : (
                        <Clear style={{ color: 'red' }} />
                      ))
                    )}
                  </InputAdornment>
                ),
              }}
              error={!!errors.CouponCode}
              helperText={errors?.CouponCode?.message as string}
            />
          )}
        />
        <Controller
          name="appliedFor"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.type}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Coupon Applied For</InputLabel>
              <Select {...field} fullWidth label="Coupon Applied For">
                <MenuItem value="first_time_order">First Time Order</MenuItem>
                <MenuItem value="invite_friends">Invite Friends</MenuItem>
                <MenuItem value="users">Users Only</MenuItem>
              </Select>
              <FormHelperText>{errors?.type?.message as string}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="whitelabelapps"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.whitelabelapps}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>White Label App</InputLabel>
              <Select
                {...field}
                variant="outlined"
                label="White Label App"
                fullWidth
                multiple
              >
                {whitelabels?.map(({ id, title }) => (
                  <MenuItem key={id} value={id}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors?.whitelabels?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="suppliers"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.suppliers}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Suppliers</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                multiple
                label="Suppliers"
              >
                {suppliers
                  ?.filter(
                    supplier =>
                      (appliedFor === 'invite_friends' &&
                        supplier.title === 'ShineOn') ||
                      appliedFor !== 'invite_friends',
                  )
                  ?.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  )) || []}
              </Select>
              <FormHelperText>
                {errors?.suppliers?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="coupon_type"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.coupon_type}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Coupon Type</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                label="Coupon Type"
              >
                {couponTypes?.map(couponType => (
                  <MenuItem key={couponType?.id} value={couponType?.id}>
                    {couponType?.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors?.coupon_type?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="ImpactOnPrice"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.ImpactOnPrice}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Coupon Impact on Price</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                label="Coupon Impact on Price"
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.ImpactOnPrice?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        {ImpactOnPrice !== 'none' && (
          <Controller
            name="discount_amount"
            control={control}
            render={({ field }) => (
              <FormControl
                error={!!errors.discount_amount}
                required
                fullWidth
                className="my-8"
              >
                <InputLabel>Discount Amount</InputLabel>
                <OutlinedInput
                  {...field}
                  type="number"
                  required
                  label="Discount Amount"
                  id="discount_amount"
                  fullWidth
                  error={!!errors.discount_amount}
                  startAdornment={
                    <InputAdornment position="start">
                      {ImpactOnPrice === 'amount' ? (
                        <Typography color="black" fontSize="18px">
                          $
                        </Typography>
                      ) : null}
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      {ImpactOnPrice === 'percentage' ? (
                        <Typography color="black" fontSize="18px">
                          %
                        </Typography>
                      ) : null}
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          />
        )}
        <Controller
          name="expiryType"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.expiryType}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Expiry Type</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                label="Expiry Type"
              >
                <MenuItem value="no_of_days">No of Days</MenuItem>
                <MenuItem value="date_range">Date Range</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.expiryType?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        {expiryType === 'no_of_days' && (
          <Controller
            name="noOfDays"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="my-8"
                type="number"
                required
                label="No of days"
                variant="outlined"
                fullWidth
                error={!!errors.noOfDays}
                helperText={errors?.noOfDays?.message as string}
              />
            )}
          />
        )}
        {expiryType === 'date_range' && (
          <div className="mb-8">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateRangePicker', 'DateRangePicker']}
              >
                <DemoItem component="DateRangePicker">
                  <DateRangePicker
                    value={[
                      dayjs(startDate as string),
                      dayjs(expiryDate as string),
                    ]}
                    onChange={newValue => {
                      setValue(
                        'startDate',
                        dayjs(newValue[0]).format('YYYY-MM-DD'),
                      )
                      setValue(
                        'expiryDate',
                        dayjs(newValue[1]).format('YYYY-MM-DD'),
                      )
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
        <Controller
          name="wantToNotifyUser"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.wantToNotifyUser}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Push notification</InputLabel>
              <Select
                {...field}
                variant="outlined"
                fullWidth
                label="Push notification"
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.wantToNotifyUser?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="my-8"
              required
              label="Subject"
              variant="outlined"
              fullWidth
              error={!!errors.subject}
              helperText={errors?.subject?.message as string}
            />
          )}
        />
        <Controller
          render={({ field }) => (
            <WYSIWYGEditor className="mt-8 mb-16" {...field} />
          )}
          name="message"
          control={control}
        />
        {isCouponTypesLoading || (
          <div className="h-[300px]">
            <DataGridPro
              hideFooter
              checkboxSelection
              rows={providerProducts as SimpleProviderProduct[]}
              slots={{
                toolbar: ProviderProductCustomToolbar,
              }}
              columns={[
                {
                  field: 'title',
                  headerName: 'Product Name',
                  flex: 1,
                  renderCell: (params: { row: SimpleProviderProduct }) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Box>
                          <img
                            src={params?.row?.cover?.url}
                            style={{
                              width: '30px',
                              height: '30px',
                              objectFit: 'contain',
                            }}
                            alt="product"
                          />
                        </Box>
                        <Box>
                          <Typography variant="inherit" className="rowText">
                            {params?.row?.title}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  },
                },
              ]}
              loading={isCouponTypesLoading}
              getRowHeight={() => 'auto'}
              onRowSelectionModelChange={newRowSelectionModel => {
                setValue('provider_products', newRowSelectionModel)
              }}
              // eslint-disable-next-line camelcase
              rowSelectionModel={provider_products as string[]}
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
                '& .MuiDataGrid-main > div:last-child': {
                  display: 'none',
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
