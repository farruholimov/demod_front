import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { selectAllColors } from '../../../data/get_all_colors'
import { getAllStyles, selectAllStyles } from '../../../data/get_all_styles'
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../typography'
import { getAllModels } from '../../../data/get_all_models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { setStyleFilter } from '../../../data/handle_filters';

const SkletonData = ['', '', '', '', '', '']
interface stylesProps {
  id: string,
  created_at: string,
  name: string,
  updated_at: string,
}
function Style() {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const StylesData = useSelector(selectAllStyles);
  const StylesStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const [custom__styles, setCustom__styles] = useState<any>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('name') as string


  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)

  useEffect(() => {
    if (StylesStatus == 'idle') {
      dispatch(getAllStyles())
    }
  }, [StylesData, StylesStatus, dispatch])

  useEffect(() => {
    if (StylesStatus === "succeeded") {
      if (router) {
        let arr = new Array();
        StylesData?.data?.forEach((color: stylesProps) => {
          arr.push({
            id: color?.id,
            created_at: color?.created_at,
            name: color?.name,
            updated_at: color?.updated_at,
            is__Selected: getModelStyleFilter?.includes((color.id).toString()) || getModelStyleFilter?.includes(color.id) || getModelStyleFilter == color?.id,
          })
        })

        setCustom__styles(arr);
        // setIsInitialized(true);
      }
    }
  }, [StylesData, StylesStatus, router, getModelStyleFilter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = [...custom__styles];
    let res: any[] = [];
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id === id && event.target.checked) {
        arr[i].is__Selected = true;
      } else if (arr[i].id === id && !event.target.checked) {
        arr[i].is__Selected = false;
      }
    }
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        res.push(arr[i]?.id)
      }
    }
    dispatch(setStyleFilter({ snex: res }))
    dispatch(getAllModels({
      brand: getModelBrandFilter,
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: res,
      name: keyword || getModelNameFilter,
      top: getModelTopFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))

    setCustom__styles(arr);
  };

  if (StylesStatus === "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Стиль" className="section__title" sx={{marginTop: "16px"}}/>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            custom__styles?.map((item: any, index: number) => (
              <FormControlLabel
                key={item.id}
                label={item?.name}
                control={
                  <Checkbox
                    onClick={(event: any) => { handleChange(event, item?.id) }}
                    checked={item?.is__Selected}
                    indeterminate={false}
                  />
                }
              />
            ))
          }

        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <SimpleTypography text="Стиль" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            SkletonData.map((item, index): any => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={'100%'}
                height={24}
                style={{ margin: "5px 0" }}
              />
              // <SkeletonElement key={index} type="text" />
            ))
          }
        </Box>
      </Box>
    )
  }


}

export default Style
