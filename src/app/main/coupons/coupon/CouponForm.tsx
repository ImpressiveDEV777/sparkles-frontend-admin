import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Controller, useFormContext } from 'react-hook-form'
import { SUPPLIER_TYPES } from 'src/app/constants/common'
import { useEffect } from 'react'
import ImageInput from 'app/shared-components/ImageInput'
import {
  getSuppliersWhitelabels,
  selectSuppliersAppWhitelabels,
} from '../store/whitelabelsSlice'
import { Image } from '../../types/ImageType'

export default function SupplierForm() {
  const methods = useFormContext()
  const whitelabels = useAppSelector(selectSuppliersAppWhitelabels)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSuppliersWhitelabels())
  }, [dispatch])
  const { control, formState } = methods
  const { errors } = formState

  return (
    <div className="flex">
      <div className="w-2/3">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="my-8"
              required
              label="Supplier Name"
              autoFocus
              id="title"
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={errors?.title?.message as string}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.type}
              required
              fullWidth
              className="my-8"
            >
              <FormLabel className="font-medium text-14" component="legend">
                Supplier Type
              </FormLabel>
              <Select {...field} variant="outlined" fullWidth>
                {SUPPLIER_TYPES?.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
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
              <FormLabel className="font-medium text-14" component="legend">
                Select White Label App
              </FormLabel>
              <Select {...field} variant="outlined" fullWidth multiple>
                {whitelabels?.map(({ id, title }) => (
                  <MenuItem key={id} value={id}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.type?.message as string}</FormHelperText>
            </FormControl>
          )}
        />
      </div>
      <div className="w-1/3 pl-20">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageInput onChange={onChange} value={value as File | Image} />
          )}
        />
      </div>
      {/* <Controller
        name="attach"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageUpload value={value as File} onChange={onChange} />
        )}
      /> */}
    </div>
  )
}
