import { apiService as api } from 'app/store/apiService'
import { ProviderProducts } from 'src/app/res-types/sub/ProviderProductType'
import { API_URLS } from 'src/app/constants/common'
import { Providers } from 'src/app/res-types/sub/ProviderType'
import { FormImage, Image } from 'src/app/res-types/sub/ImageType'
import { ProductSubCategories } from 'src/app/res-types/sub/ProductSubCategoryType'
import { ProductAttributes } from 'src/app/res-types/sub/ProductAttributeType'
import { mapToFormCategory } from 'src/app/utils/maps'
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
        transformResponse: (response: Category) => mapToFormCategory(response),
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
        transformResponse: (response: Category) => mapToFormCategory(response),
      }),
      updateCategory: build.mutation<
        UpdateCategoryApiResponse,
        UpdateCategoryApiArg
      >({
        query: category => ({
          url: `${API_URLS.CATEGORIES}/${category.categoryId}`,
          method: 'PUT',
          data: category,
        }),
        invalidatesTags: ['categories', 'category'],
        transformResponse: (response: Category) => mapToFormCategory(response),
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

export type GetCategoriesApiResponse = /** status 200 OK */ Categories
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

export type Categories = Category[]

export type CategoryForm = {
  active: boolean
  providers: string[]
  whitelabelapps: string[]
  title: string
  description: string
  Image: FormImage
  imageFile?: File
  categoryId: string
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
