"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { getOneBrand, selectOneBrand } from '../../data/get_one_brand';
import { getBrandModels } from '../../data/get_brand_models';
import OneBrand from '../../components/screens/brands/one';
import { getBrandCategories } from '../../data/categories';
import { selectMyProfile } from '../../data/me';
import { getProfile } from '../../data/get_profile';
import { getChatToken } from '../../data/get_chat_token';
import { brandModelsLimit } from '../../types/filters';

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}
const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
}
const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)"
}

export default function OneBrandPage() {
  const getBrandStatus = useSelector((state: any) => state?.get_one_brand?.status)
  const getBrandCategoriesStatus = useSelector((state: any) => state?.categories?.brand_status)
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status)
  const tokenStatus = useSelector((state: any) => state?.get_chat_token?.status)
  const profile = useSelector(selectMyProfile)
  const dispatch = useDispatch<any>()
  const searchParams = useSearchParams()
  const params = useParams<{ brand_slug: string }>()
  const brand = useSelector(selectOneBrand)
  const page = searchParams.get('page') as string
  const pageFilter = useSelector((state: any) => state?.handle_filters?.brand_models_page)

  React.useEffect(() => {
    dispatch(getOneBrand(params?.brand_slug))
  }, [])

  React.useEffect(() => {
    if (brand) {
      dispatch(getBrandModels({ brand_id: brand?.id, limit: brandModelsLimit, page: page || pageFilter }))
      dispatch(getBrandCategories(brand?.id))
    }
  }, [brand])

  React.useEffect(() => {
    if (getProfileStatus === 'idle') {
      dispatch(getProfile())
    }
    if (profile && tokenStatus == 'idle') {
      dispatch(getChatToken())
    }
  }, [profile, tokenStatus, getProfileStatus])

  if (getBrandStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <OneBrand />
        </Box>
      </>
    )
  } else if (getBrandStatus === "failed") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box sx={{ background: "#fafafa", position: "relative" }}>
          <Box sx={BgBlur} />
          <Box>
            <Box sx={ContainerStyle}>
              <CircularProgress sx={LoaderStyle} />
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}
