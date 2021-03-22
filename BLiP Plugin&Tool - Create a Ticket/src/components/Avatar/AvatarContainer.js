import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uploadProfilePic } from 'api/TenantApi'
import { showToast } from 'api/CommonApi'
import { useContentLocalizer } from 'hooks/useContentLocalizer'
import { AvatarComponent } from './AvatarComponent'
import { localization } from './localization'

export const AvatarContainer = ({
  img,
  canEdit,
  changePicLabel,
  onUpdateImage,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const content = useContentLocalizer(localization)

  const updateImage = async (image) => {
    try {
      setIsLoading(true)
      const photoUri = await uploadProfilePic(image)
      onUpdateImage(photoUri)
    } catch (e) {
      showToast({
        type: 'danger',
        message: content.photoUpdateError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AvatarComponent
      updateImage={updateImage}
      img={img}
      canEdit={canEdit}
      isLoading={isLoading}
      changePicLabel={changePicLabel}
    />
  )
}

AvatarContainer.propTypes = {
  img: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  changePicLabel: PropTypes.string.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
}
