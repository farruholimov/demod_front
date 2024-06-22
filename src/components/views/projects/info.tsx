import SimpleTypography from "@/components/typography";
import { interiorRequirements } from "@/data/samples/interior_requirements";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, styled } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { useState } from "react";
import Buttons from "../../buttons";
import Image from "next/image";
import formatDate from "../../../utils/format_date";

const TrStyle: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
  // background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)"
}

const TcStyle: SxProps = {
  borderColor: "#B3B3B3",
  padding: '6px 12px',

  ':not(:last-child)': {
    backgroundColor: '#f5f5f5'
  },

  ':last-child': {
    backgroundColor: '#fafafa'
  }
}

export function ProjectInfo({ project }) {

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        padding: '24px'
      }}
    >
      <Box sx={{ width: '100%', mb: '18px' }}>
        <SimpleTypography
          text="Информация"
          sx={{
            fontWeight: 500,
            fontSize: '22px',
            lineHeight: '26px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
          }}
        />
      </Box>

      <Box sx={{ width: '100%', mb: '18px' }}>
        <TableContainer
          sx={{
            borderRadius: "0",
            marginBottom: "28px"
          }}
          component={Paper}
        >
          <Table size="small" aria-label="a dense table">
            <TableBody
              sx={{
                borderTop: "1px solid #b3b3b3",
                borderBottom: "1px solid #b3b3b3",
              }}
            >
              {/* {rows.map((row, index) => ( */}
              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Количество брендов"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={project?.brands_count}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Количество мебели"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={project?.models_count}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Итоговая цена"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={project?.cumulative_cost}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Дата создания"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={formatDate(project?.created_at)}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Buttons
          sx={{ width: '100%' }}
          name="Скачать PDF"
          childrenFirst={true}
          className="login__btn"
        >
          <Image
            alt="icon"
            src='/icons/get-pdf.svg'
            width={22}
            height={22}
          />
        </Buttons>
      </Box>
    </Box>
  )
}