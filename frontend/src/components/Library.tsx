"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlineAim, AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { Song } from "../../types";
import React from "react";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import Button from "./Button";
import LanguageModal from "./LanguageModal";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'

interface LibraryProps {
   songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
   songs
}) => {
   const authModal = useAuthModal();
   const uploadModal = useUploadModal();
   const { user } = useUser();
   const onPlay = useOnPlay(songs);
   const { t } = useTranslation()
   const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

   const onClick = () => {
      if(!user) {
         return authModal.onOpen();
      }
      
      return uploadModal.onOpen();
	};
   
   return (
			<div className='flex flex-col'>
				<div
					className='
               flex
               items-center
               justify-between
               px-5
               pt-4
               '
				>
					<div
						className='
                  inline-flex
                  items-center
                  gap-x-2
                  '
					>
						<TbPlaylist className='text-neutral-400' size={26} />
						<p
							className='
                     text-neutral-400
                     font-medium
                     text-md
                     cursor-pointer   
                     '
						>
							{t('Your Library')}
						</p>
					</div>
					<AiOutlinePlus
						onClick={onClick}
						size={20}
						className='
                  text-neutral-400
                  cursor-pointer
                  hover:text-white
                  transition
                  '
					/>
				</div>
				<div
					className='
               flex
               flex-col
               gap-y-5
               mt-4
               px-5
               cursor-pointer 
               '
				>
					<Link href='/playlists'>
						<button>{t('Playlists')}</button>
					</Link>
					<Link href='/songs'>
						<button>{t('Songs')}</button>
					</Link>
					<Link href='/artists'>
						<button>{t('Artists')}</button>
					</Link>
					{/* {songs.map(item => (
						<MediaItem
							onClick={(id: string) => onPlay(id)}
							key={item.id}
							data={item}
						/>
					))} */}
					<LanguageModal />
				</div>
			</div>
		)
   };
   
   export default Library;