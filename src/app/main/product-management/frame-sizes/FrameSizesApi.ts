import { apiService as api } from 'app/store/apiService'
import { API_URLS } from 'src/app/constants/common'
// import { mapToFormFrameSize } from 'src/app/utils/maps'
import {
  AspectRatio,
  AspectRatios,
} from 'src/app/res-types/sub/AspectRatioType'
import { FrameTypeSizes } from 'src/app/res-types/sub/FrameTypeSizeType'
import { ProductPrintSizes } from 'src/app/res-types/sub/ProductPrintSizeType'

export const addTagTypes = ['frameSizes', 'frameSize', 'aspectRatios'] as const

const FrameSizeAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getFrameSizes: build.query<GetFrameSizesApiResponse, GetFrameSizesApiArg>(
        {
          query: () => ({ url: API_URLS.FRAME_SIZES }),
          providesTags: ['frameSizes'],
        },
      ),
      getFrameSize: build.query<GetFrameSizeApiResponse, GetFrameSizeApiArg>({
        query: frameSizeId => ({
          url: `${API_URLS.FRAME_SIZES}/${frameSizeId}`,
        }),
        providesTags: ['frameSize', 'frameSizes'],
        // transformResponse: (response: FrameSize) =>
        // mapToFormFrameSize(response),
      }),
      createFrameSize: build.mutation<
        CreateFrameSizeApiResponse,
        CreateFrameSizeApiArg
      >({
        query: newFrameSize => ({
          url: API_URLS.FRAME_SIZES,
          method: 'POST',
          data: newFrameSize,
        }),
        invalidatesTags: ['frameSizes', 'frameSize'],
        // transformResponse: (response: FrameSize) =>
        //   mapToFormFrameSize(response),
      }),
      updateFrameSize: build.mutation<
        UpdateFrameSizeApiResponse,
        UpdateFrameSizeApiArg
      >({
        query: frameSize => ({
          url: `${API_URLS.FRAME_SIZES}/${frameSize.id}`,
          method: 'PUT',
          data: frameSize,
        }),
        invalidatesTags: ['frameSizes', 'frameSize'],
        // transformResponse: (response: FrameSize) =>
        //   mapToFormFrameSize(response),
      }),
      deleteFrameSize: build.mutation<
        DeleteFrameSizeApiResponse,
        DeleteFrameSizeApiArg
      >({
        query: frameSizeId => ({
          url: `${API_URLS.FRAME_SIZES}/${frameSizeId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['frameSizes', 'frameSize'],
      }),
      getAspectRatios: build.query<
        GetAspectRatiosApiResponse,
        GetAspectRatiosApiArg
      >({
        query: () => ({ url: API_URLS.ASPECT_RATIOS }),
        providesTags: ['aspectRatios'],
      }),
    }),
    overrideExisting: false,
  })
export { FrameSizeAppsApi }

export type GetFrameSizesApiResponse = /** status 200 OK */ FrameSizes
export type GetFrameSizesApiArg = void

export type GetFrameSizeApiResponse = /** status 200 OK */ FrameSizeForm
export type GetFrameSizeApiArg = string

export type CreateFrameSizeApiResponse = /** status 200 OK */ FrameSizeForm
export type CreateFrameSizeApiArg = FrameSizeForm

export type UpdateFrameSizeApiResponse = /** status 200 OK */ FrameSizeForm
export type UpdateFrameSizeApiArg = FrameSizeForm

export type DeleteFrameSizeApiResponse = /** status 200 OK */ unknown
export type DeleteFrameSizeApiArg = string

export type GetAspectRatiosApiResponse = /** status 200 OK */ AspectRatios
export type GetAspectRatiosApiArg = void

export type FrameSize = {
  _id: string
  width: number
  height: number
  size: string
  createdAt: string
  updatedAt: string
  aspect_ratio: AspectRatio
  frame_type_sizes: FrameTypeSizes
  product_print_sizes: ProductPrintSizes
  id: string
}

export type FrameSizes = FrameSize[]

export type FrameSizeForm = {
  id?: string
  aspect_ratio: string
  height: number
  size: string
  width: number
}
export type FrameSizeForms = FrameSizeForm[]

export const {
  useGetFrameSizesQuery,
  useGetFrameSizeQuery,
  useCreateFrameSizeMutation,
  useUpdateFrameSizeMutation,
  useDeleteFrameSizeMutation,
  useGetAspectRatiosQuery,
} = FrameSizeAppsApi

export type FrameSizesApiType = {
  [FrameSizeAppsApi.reducerPath]: ReturnType<typeof FrameSizeAppsApi.reducer>
}
