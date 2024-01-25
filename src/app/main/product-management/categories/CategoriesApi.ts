import { apiService as api } from 'app/store/apiService'
import { ProviderProducts } from 'src/app/res-types/sub/ProviderProductType'
import { API_URLS } from 'src/app/constants/common'
import { Providers } from 'src/app/res-types/sub/ProviderType'
import { Image } from 'src/app/res-types/sub/ImageType'
import { ProductSubCategories } from 'src/app/res-types/sub/ProductSubCategoryType'
import { ProductAttributes } from 'src/app/res-types/sub/ProductAttributeType'
import { Whitelabels } from '../../whitelabel-apps/WhitelabelAppsApi'

export const addTagTypes = ['categories', 'category'] as const

const CategoryAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>(
        {
          query: () => ({ url: API_URLS.CATEGORIES }),
          providesTags: ['categories'],
        },
      ),
      getCategory: build.query<GetCategoryApiResponse, GetCategoryApiArg>({
        query: categoryId => ({ url: `${API_URLS.CATEGORIES}/${categoryId}` }),
        providesTags: ['category', 'categories'],
        // transformResponse: (response: Category) => mapToFormCategory(response),
      }),
      createCategory: build.mutation<
        CreateCategoryApiResponse,
        CreateCategoryApiArg
      >({
        query: newCategory => ({
          url: API_URLS.CATEGORIES,
          method: 'POST',
          data: newCategory,
        }),
        invalidatesTags: ['categories', 'category'],
      }),
      updateCategory: build.mutation<
        UpdateCategoryApiResponse,
        UpdateCategoryApiArg
      >({
        query: category => ({
          url: `${API_URLS.CATEGORIES}/${category.id}`,
          method: 'PUT',
          data: category,
        }),
        invalidatesTags: ['categories', 'category'],
      }),
      deleteCategory: build.mutation<
        DeleteCategoryApiResponse,
        DeleteCategoryApiArg
      >({
        query: categoryId => ({
          url: `${API_URLS.CATEGORIES}/${categoryId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['categories', 'category'],
      }),
    }),
    overrideExisting: false,
  })
export { CategoryAppsApi }

export type GetCategoriesApiResponse = /** status 200 OK */ Category[]
export type GetCategoriesApiArg = void

export type GetCategoryApiResponse = /** status 200 OK */ CategoryForm
export type GetCategoryApiArg = string

export type CreateCategoryApiResponse = /** status 200 OK */ CategoryForm
export type CreateCategoryApiArg = CategoryForm

export type UpdateCategoryApiResponse = /** status 200 OK */ CategoryForm
export type UpdateCategoryApiArg = CategoryForm

export type DeleteCategoryApiResponse = /** status 200 OK */ unknown
export type DeleteCategoryApiArg = string

export type Category = {
  active: boolean
  providers: Providers
  whitelabelapps: Whitelabels
  _id: string
  title: string
  description: string
  published_at: string
  createdAt: string
  updatedAt: string
  Image: Image
  provider_product: null
  product_sub_categories: ProductSubCategories
  product_attributes: ProductAttributes
  provider_products: ProviderProducts
  stores: null
  id: string
}

export type Categories = [Category]

export type CategoryForm = {
  ImpactOnPrice: string
  wantToNotifyUser: boolean
  isExpired: boolean
  noOfDays: number
  expiryType: string
  discount_amount: number
  appliedFor: string
  whitelabelapps: string[]
  provider_products: string[]
  suppliers: string[]
  message: string
  subject: string
  CategoryCode: string
  category_type: string
  id: string
}

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoryAppsApi

export type CategoriesApiType = {
  [CategoryAppsApi.reducerPath]: ReturnType<typeof CategoryAppsApi.reducer>
}
