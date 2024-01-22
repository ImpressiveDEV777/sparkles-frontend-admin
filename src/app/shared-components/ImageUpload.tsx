import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Typography,
  Paper,
  CardContent,
  Box,
  IconButton,
  Button,
  Modal,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-circular-progressbar/dist/styles.css'
import { Cancel } from '@mui/icons-material'
import 'react-image-crop/dist/ReactCrop.css'

import CropIcon from '@mui/icons-material/Crop'
import { Image } from '../main/types/ImageType'

function setCanvasImage(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop,
) {
  if (!crop || !canvas || !image) {
    return
  }

  const scaleX = image.naturalWidth / image.width

  const scaleY = image.naturalHeight / image.height

  const ctx = canvas.getContext('2d')

  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

  const pixelRatio = window.devicePixelRatio

  canvas.width = crop.width * pixelRatio * scaleX
  canvas.height = crop.height * pixelRatio * scaleY
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY,
  )
}
function generateDownload(canvas: HTMLCanvasElement, crop: Crop) {
  if (!crop || !canvas) {
    return
  }

  canvas.toBlob(
    blob => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')

      anchor.download = 'cropPreview.png'

      anchor.href = URL.createObjectURL(blob)

      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },

    'image/png',

    1,
  )
}
const UploadImageCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
  height: '197px',
}))

type ImageUploadProps = {
  onChange: (value: File) => void
  value: File
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [upImg, setUpImg] = useState<string | ArrayBuffer>()
  const [image, setImage] = useState<Image>()
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const previewCanvasRefPreview = useRef(null)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>(null)
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
  }
  const [progress, setProgress] = useState(0)
  // const [image, setImage] = useState<null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [cropCompleted, setCropCompleted] = useState(false)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => setUpImg(reader.result))

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files[0])
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => setUpImg(reader.result))

      reader.readAsDataURL(event.target.files[0])
    }

    // Do something with the file, e.g., upload it to the server
    // Simulate the upload process with setInterval
    setUploading(true)
    setProgress(0)
    setIsImageUploaded(true)
    setOpen(true)
    // Simulate progress update every 200ms
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          // Upload complete
          clearInterval(interval)
          setUploading(false)

          return 100
        }
        return prevProgress + 10 // Increment the progress by 10%
      })
    }, 200)
  }

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop)
  }, [completedCrop])

  const handleCancel = () => {
    // if (uploading) {
    //   // If the upload is in progress, clear the interval
    //   clearInterval(interval)
    // }
    // Reset the state to remove the uploaded image
    // setimage
    onChange(null)
    setUploading(false)
    setIsImageUploaded(false)
    setProgress(0)
    setImage(null)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCropComplete = async (canvas: HTMLCanvasElement, crop: Crop) => {
    if (!crop || !canvas) {
      return
    }

    const fileExtension = 'png' // Replace with the actual file extension
    const mimeType = 'image/png' // Replace with the actual mime type

    const blobPromise = new Promise(resolve => {
      canvas.toBlob(
        blob => {
          resolve(blob)
        },
        mimeType,
        1,
      )
    })

    const blob = (await blobPromise) as BlobPart

    const croppedImageFile = new File(
      [blob],
      `cropped-image.${fileExtension}`,
      {
        type: mimeType,
        lastModified: Date.now(),
      },
    )

    // Assuming setCroppedImage, setFieldValue, and setCropCompleted are defined
    setCroppedImage(canvas.toDataURL(mimeType)) // Update this line
    onChange(croppedImageFile) // Update this line
    setCropCompleted(true) // Update this line
  }

  const handleSave = (canvas: HTMLCanvasElement, crop: Crop) => {
    // Perform any additional actions you want when the "Save" button is clicked
    // You can also trigger the onComplete function here if needed

    handleCropComplete(canvas, crop)
    handleClose()

    // Close the modal
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Upload Image</Typography>
      </Box>

      <UploadImageCard sx={{ textAlign: 'center' }}>
        <Box>
          {!value ? (
            <label htmlFor="upload-picture">
              <IconButton
                component="span"
                color="primary"
                size="medium"
                className="css-39nlm1"
                aria-label="upload picture"
              >
                <CloudUploadIcon />
              </IconButton>
              <input
                hidden
                id="upload-picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          ) : null}
        </Box>

        {value && !uploading && (
          // Render the image and "Cancel" button when an image is uploaded
          <CardContent sx={{ paddingTop: '0' }}>
            <IconButton
              onClick={handleCancel}
              color="error"
              size="small"
              sx={{ position: 'absolute' }}
            >
              <Cancel />
            </IconButton>
            <Box>
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="croppedImage"
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    objectFit: 'cover',
                    maxHeight: '165px',
                    // height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              ) : (
                <img
                  src={URL.createObjectURL(value)}
                  alt="images"
                  style={{ height: '130px', maxWidth: '100%' }}
                />
              )}
            </Box>
          </CardContent>
        )}

        {image?.url && !uploading && (
          <CardContent sx={{ paddingTop: '0' }}>
            <IconButton
              onClick={handleCancel}
              color="error"
              size="small"
              sx={{ position: 'absolute' }}
            >
              <Cancel />
            </IconButton>
            <Box>
              <img
                // onChange={onSelectFile}
                src={image?.url}
                alt="Uploaded"
                style={{ maxWidth: '100%' }}
              />
            </Box>
          </CardContent>
        )}
        {image || isImageUploaded ? null : (
          <CardContent>
            <Box>
              <Box>
                <Typography variant="body1">Click to upload</Typography>
                <Typography variant="body1">or drag and drop</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1">
                File Format: SVG, PNG, JPG, or GIF. (Maximum file size: 1MB)
              </Typography>
            </Box>
          </CardContent>
        )}
      </UploadImageCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // disableBackdropClick
      >
        <Box sx={{ ...style }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ position: 'relative', top: '-15px' }}
          >
            Crop Image
          </Typography>
          <Box>
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={(c: PixelCrop) => setCompletedCrop(c)}
              style={{ height: '100%', width: '100%' }}
            />

            <div
              style={{
                position: 'absolute',
                top: '42px',
                right: '40px',
                height: '140px',
              }}
            >
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: '210px',
                  // width: Math.round(completedCrop?.width ?? 0),
                  height: '200px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              gap: '15px',
              position: 'absolute',
              left: '0',
              bottom: '0',
              padding: '20px',
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                handleSave(previewCanvasRef.current, completedCrop)
              }
              startIcon={<CropIcon />}
            >
              Crop
            </Button>
            <Button variant="text" onClick={handleClose}>
              {' '}
              Skip Cropping & save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
