import React, {Dispatch, FC, SetStateAction} from 'react'

import {Fade} from 'app/components/Fade'
import {FileBrowser} from 'app/components/FileBrowser'

type CreateFileBrowserModalProps = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateFileBrowserModal: FC<CreateFileBrowserModalProps> = ({isModalOpen, setIsModalOpen}) => (
  <Fade show={isModalOpen}>
    <div className="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div onClick={() => setIsModalOpen(false)} className="fixed inset-0">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <FileBrowser close={() => setIsModalOpen(false)} />
    </div>
  </Fade>
)
