import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor'
import ImageInput from 'app/shared-components/ImageInput'
import { Image } from 'src/app/res-types/sub/ImageType'
import { useGetWhitelabelsQuery } from '../../../whitelabel-apps/WhitelabelAppsApi'
import { useGetSuppliersQuery } from '../../../suppliers/SuppliersApi'
import { SubCategoryForm } from '../SubCategoriesApi'

export default function SubCategoryContent() {
  const { data: whitelabels } = useGetWhitelabelsQuery()
  const { data: suppliers } = useGetSuppliersQuery()
  const methods = useFormContext()
  const { control, formState, getValues } = methods
  const { Image } = getValues() as SubCategoryForm
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
              label="SubCategory Name"
              id="title"
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={errors?.title?.message as string}
            />
          )}
        />
        <Controller
          name="active"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormControl
              error={!!errors.active}
              required
              fullWidth
              className="my-8"
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={(value as boolean).toString()}
                onChange={e => onChange(e.target.value === 'true')}
                variant="outlined"
                fullWidth
                label="Status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Disabled</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.active?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          render={({ field }) => (
            <WYSIWYGEditor className="mt-8 mb-16" {...field} />
          )}
          name="description"
          control={control}
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
          name="providers"
          control={control}
          render={({ field }) => (
            <FormControl
              error={!!errors.providers}
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
                {suppliers?.map(({ id, title }) => (
                  <MenuItem key={id} value={id}>
                    {title}
                  </MenuItem>
                )) || []}
              </Select>
              <FormHelperText>
                {errors?.providers?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />
      </div>
      <div className="w-1/3 pl-20">
        <Controller
          name="imageFile"
          control={control}
          render={({ field: { onChange } }) => (
            <ImageInput onChange={onChange} src={(Image as Image)?.url} />
          )}
        />
      </div>
    </div>
  )
}
