import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router'
import { useGetFrameTypesQuery } from '../FramesApi'

/**
 * Demo Content
 */
function FramesContent() {
  const routeParams = useParams()
  const { data: frameTypes } = useGetFrameTypesQuery()
  const { frameTypeId } = routeParams
  const { frames, title } =
    frameTypes?.find(type => frameTypeId === type._id) || {}

  return (
    <div className="p-24 sm:p-24">
      <Typography variant="h6">{title}</Typography>
      <div className="flex flex-auto">
        <Grid item xs={12} className="p-10" width="100%">
          <Grid container spacing={3}>
            {frames?.map(frame => (
              <Grid item xl={4} lg={6} md={6} sm={6} xs={12} key={frame.id}>
                <Card sx={{ position: 'relative', width: '100%' }} square>
                  <CardMedia
                    image={frame?.image?.url}
                    title="green iguana"
                    sx={{ height: 140, backgroundSize: 'contain' }}
                  />
                  <CardContent className="pb-0">
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {frame?.title}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end', // Align the button to the right
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      // onClick={() =>
                      //   navigate(`${PATHS.SUPPLIERS}/${category?._id}`)
                      // }
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      // onClick={() =>
                      //   navigate(`${PATHS.SUPPLIERS}/${category?._id}`)
                      // }
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default FramesContent
