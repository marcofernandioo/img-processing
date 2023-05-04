import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"

const numberFormatter = amount => {
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return formatter.format(amount).toString().slice(0, -3)
}

const HeadPreview = ({ image, mataAngin, data }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
      height: '550px',
      width: '550px'
    }}>
      <div style={{ flex: 1, backgroundImage: `url(${URL.createObjectURL(image)})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
      <div style={{
        flex: 1,
        backgroundColor: '#303D5D',
        color: '#fff',
        textAlign: 'center',
        padding: '12px'
      }}>
        <Typography mb={2} sx={{ textTransform: 'uppercase' }} variant='h6'>{data.alamat}</Typography>
        <div style={{ borderBottom: '1px solid #AD8744', width: '30%', margin: 'auto' }} />
        <Typography my={1} sx={{ textTransform: 'uppercase' }}>{data.jenisPerumahan}</Typography>
        <Stack mb={2} spacing={1} sx={{ justifyContent: 'center' }} direction='row'>
          <Typography>{data.ukuran} mtr</Typography>
          <Typography variant='body2'>|</Typography>
          <Typography>{data.tingkat} Tingkat</Typography>
          <Typography variant='body2'>|</Typography>
          <Typography>{data.siapHuni}</Typography>
          <Typography variant='body2'>|</Typography>
          <Typography>Hadap {mataAngin}</Typography>
          <Typography variant='body2'>|</Typography>
          <Typography>SHM</Typography>
        </Stack>
        <Stack mb={2} direction='row' sx={{ justifyContent: 'center' }}>
          <Box px={4} py={1} sx={{ backgroundColor: '#AD8744', width: 'fit-content', borderRadius: '6px' }}>
            <Typography variant='h6'>{numberFormatter(data.harga)}</Typography>
          </Box>
        </Stack>
        <Typography mb={1} sx={{ textTransform: 'uppercase' }} variant='body2'>For More Information</Typography>
        <Typography variant='body2'>0882-8927-5247</Typography>
      </div>
    </div>
  )
}

export default HeadPreview