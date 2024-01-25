import { apiService as api } from 'app/store/apiService'
import { ProviderProduct } from 'src/app/res-types/sub/ProviderProductType'
import { API_URLS } from 'src/app/constants/common'
import { FormImage, Image } from 'src/app/res-types/sub/ImageType'
import { ProductAttributes } from 'src/app/res-types/sub/ProductAttributeType'
import { mapToFormSubCategory } from 'src/app/utils/maps'
import { ProductCategory } from 'src/app/res-types/sub/ProductCategoryType'

export const addTagTypes = ['categories', 'category'] as const

const SubCategoryAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getSubCategories: build.query<
        GetSubCategoriesApiResponse,
        GetSubCategoriesApiArg
      >({
        query: () => ({ url: API_URLS.SUB_CATEGORIES }),
        providesTags: ['categories'],
      }),
      getSubCategory: build.query<
        GetSubCategoryApiResponse,
        GetSubCategoryApiArg
      >({
        query: subCategoryId => ({
          url: `${API_URLS.SUB_CATEGORIES}/${subCategoryId}`,
        }),
        providesTags: ['category', 'categories'],
        transformResponse: (response: SubCategory) =>
          mapToFormSubCategory(response),
      }),
      createSubCategory: build.mutation<
        CreateSubCategoryApiResponse,
        CreateSubCategoryApiArg
      >({
        query: newSubCategory => ({
          url: API_URLS.SUB_CATEGORIES,
          method: 'POST',
          data: newSubCategory,
        }),
        invalidatesTags: ['categories', 'category'],
        transformResponse: (response: SubCategory) =>
          mapToFormSubCategory(response),
      }),
      updateSubCategory: build.mutation<
        UpdateSubCategoryApiResponse,
        UpdateSubCategoryApiArg
      >({
        query: category => ({
          url: `${API_URLS.SUB_CATEGORIES}/${category.subCategoryId}`,
          method: 'PUT',
          data: category,
        }),
        invalidatesTags: ['categories', 'category'],
        transformResponse: (response: SubCategory) =>
          mapToFormSubCategory(response),
      }),
      deleteSubCategory: build.mutation<
        DeleteSubCategoryApiResponse,
        DeleteSubCategoryApiArg
      >({
        query: subCategoryId => ({
          url: `${API_URLS.SUB_CATEGORIES}/${subCategoryId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['categories', 'category'],
      }),
    }),
    overrideExisting: false,
  })
export { SubCategoryAppsApi }

export type GetSubCategoriesApiResponse = /** status 200 OK */ SubCategories
export type GetSubCategoriesApiArg = void

export type GetSubCategoryApiResponse = /** status 200 OK */ SubCategoryForm
export type GetSubCategoryApiArg = string

export type CreateSubCategoryApiResponse = /** status 200 OK */ SubCategoryForm
export type CreateSubCategoryApiArg = SubCategoryForm

export type UpdateSubCategoryApiResponse = /** status 200 OK */ SubCategoryForm
export type UpdateSubCategoryApiArg = SubCategoryForm

export type DeleteSubCategoryApiResponse = /** status 200 OK */ unknown
export type DeleteSubCategoryApiArg = string

export type SubCategory = {
  active: true
  _id: string
  title: string
  description: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: 0
  Image: Image
  product_category: ProductCategory
  provider_product: ProviderProduct
  id: string
  product_attributes: ProductAttributes
}

export type SubCategories = SubCategory[]

export type SubCategoryForm = {
  active: boolean
  providers: string[]
  whitelabelapps: string[]
  title: string
  description: string
  Image: FormImage
  imageFile?: File
  subCategoryId: string
}

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = SubCategoryAppsApi

export type SubCategoriesApiType = {
  [SubCategoryAppsApi.reducerPath]: ReturnType<
    typeof SubCategoryAppsApi.reducer
  >
}
