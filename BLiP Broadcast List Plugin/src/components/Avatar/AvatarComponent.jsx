import React from 'react'
import tenantIcon from './tenant.svg'
import PropTypes from 'prop-types'
import { BlipIcon } from 'components/BlipIcon'
import { BlipLoading } from 'components/BlipLoading'

export const AvatarComponent = ({
  img,
  canEdit,
  updateImage,
  changePicLabel,
  isLoading,
}) => {
  return (
    <div className="tc avatar placeholder relative">
      {img !== undefined ? (
        <img src={img} className="profile-pic br-100 dib" alt="avatar" />
      ) : (
        <div className="profile-pic br-100 dib bp-bg-sky flex items-center justify-center">
          <img src={tenantIcon} className="h2 w2" alt="tenant" />
        </div>
      )}
      {canEdit && (
        <>
          <label htmlFor="profile-pic">
            <div className="upload br-100 absolute top-0 right-0 bp-bg-desk bp-c-whisper profile-pic flex flex-column items-center justify-center pointer o-80">
              <BlipIcon name="camera" color="whisper" className="mb1 bp-fs-4" />
              <p className="pa0 bp-fs-7">{changePicLabel}</p>
            </div>
          </label>
          <input
            className="dn"
            type="file"
            name="profile-pic"
            id="profile-pic"
            accept="image/*"
            onChange={(e) => updateImage(e.target.files[0])}
          />
        </>
      )}
      {isLoading && (
        <div className="br-100 absolute top-0 right-0 bp-bg-desk bp-c-whisper profile-pic flex flex-column items-center justify-center pointer o-80">
          <BlipLoading />
        </div>
      )}
    </div>
  )
}

AvatarComponent.propTypes = {
  img: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  updateImage: PropTypes.func.isRequired,
  changePicLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
}
