import { apiService as api } from 'app/store/apiService'
import { API_URLS } from 'src/app/constants/common'
import { FramesType } from 'src/app/res-types/sub/FrameType'
import { FrameTypeSizes } from 'src/app/res-types/sub/FrameTypeSizeType'

export const addTagTypes = ['frameTypes', 'frameType'] as const

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

export const { useGetFrameTypesQuery } = FramesApi

export type FramesApiType = {
  [FramesApi.reducerPath]: ReturnType<typeof FramesApi.reducer>
}
