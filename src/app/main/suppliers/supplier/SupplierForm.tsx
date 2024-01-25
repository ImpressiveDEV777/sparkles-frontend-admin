import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { SUPPLIER_TYPES } from 'src/app/constants/common'
import ImageInput from 'app/shared-components/ImageInput'
import { Image } from 'src/app/res-types/sub/ImageType'
import { useGetWhitelabelsQuery } from '../../whitelabel-apps/WhitelabelAppsApi'
import { SupplierForm } from '../SuppliersApi'

export default function SupplierContent() {
  const methods = useFormContext()
  const { data: whitelabels } = useGetWhitelabelsQuery()
  const { control, formState, getValues } = methods
  const { image } = getValues() as SupplierForm
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
          name="imageFile"
          control={control}
          render={({ field: { onChange } }) => (
            <ImageInput onChange={onChange} src={(image as Image)?.url} />
          )}
        />
      </div>
    </div>
  )
}
