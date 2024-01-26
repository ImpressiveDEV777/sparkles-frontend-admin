import { apiService as api } from 'app/store/apiService'
import { API_URLS } from 'src/app/constants/common'
import { FrameSize } from 'src/app/res-types/sub/FrameSizeType'
import { FramesType } from 'src/app/res-types/sub/FrameType'

export const addTagTypes = [
  'frameTypes',
  'frameTypeSizes',
  'frameType',
] as const

const FramesApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getFrameTypes: build.query<FrameTypes, void>({
        query: () => ({ url: API_URLS.FRAME_TYPES }),
        providesTags: ['frameTypes'],
      }),
      getFrameTypeSizes: build.query<FrameTypeSizes, string>({
        query: typeId => ({
          url: `${API_URLS.FRAME_TYPES_SIZES}?_where[frame_type]=${typeId}`,
        }),
        providesTags: ['frameTypeSizes'],
      }),
    }),
    overrideExisting: false,
  })
export { FramesApi as FrameSizeAppsApi }

export type FrameType = {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
  __v: 0
  frames: FramesType
  frame_type_sizes: FrameTypeSizes
  id: string
}

export type FrameTypes = FrameType[]

export type FrameTypeSize = {
  _id: string
  final_price: number
  mark_up: number
  store_profit: number
  price: number
  createdAt: string
  updatedAt: string
  aspect_ratio: string
  frame_size: FrameSize
  frame_type: {
    id: string
    _id: string
    title: string
  }
  id: string
}

export type FrameTypeSizes = FrameTypeSize[]

export const { useGetFrameTypesQuery, useGetFrameTypeSizesQuery } = FramesApi

export type FramesApiType = {
  [FramesApi.reducerPath]: ReturnType<typeof FramesApi.reducer>
}
