import SimpleTypography from "@/components/typography";
import { selectAllInteriors } from "@/data/get_all_interiors";
import { dataItemIndex } from "@/utils/utils";
import { Box, Grid } from "@mui/material";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import InteriorCategories from "../categories/interior_categories";
import Sorts from "../sorts";

export default function InteriorsFilters() {
  const all__interiors = useSelector(selectAllInteriors);
  return (
    <Grid container rowGap={2} className="models-page__filters--child">
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pt: "12px" }}>
        <Suspense>
          <InteriorCategories />
        </Suspense>
      </Grid>
    </Grid>
  );
}
