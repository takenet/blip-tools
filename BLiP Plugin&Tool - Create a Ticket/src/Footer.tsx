import React from 'react'
import {
  AiOutlineQuestionCircle,
  AiFillGithub,
  AiOutlineInfoCircle,
} from 'react-icons/ai'
import { TiSocialAtCircular } from 'react-icons/ti'

function Footer() {
  return (
    <>
      <a
        href={process.env.REACT_APP_INFO_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineInfoCircle size="28" />
      </a>
      <a
        href={process.env.REACT_APP_INFO_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineQuestionCircle size="28" />
      </a>
      <a
        href={process.env.REACT_APP_REPO_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillGithub size="28" />
      </a>
      <a
        href="https://forum.blip.ai/u/caiof/summary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TiSocialAtCircular size="30" />
      </a>
    </>
  )
}

export default Footer
