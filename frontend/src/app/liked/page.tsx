"use client";
import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";
import { useState, useEffect } from "react";
import { Song } from "../../../types";
import { useUser } from '@/hooks/useUser'
import useTranslation from "next-translate/useTranslation";

    const Liked = () => {
    const [songs, setSongs] = useState<Song[]>([])
    const { user, isLoading } = useUser()
    const { t } = useTranslation()
    useEffect(() => {
        const fetchLikedSongs = async () => {
             if (!user) {
            console.error('Пользователь не аутентифицирован');
            return;
        }
            try {
                const likedSongs = await getLikedSongs();
                console.log('Fetched liked songs:', likedSongs)
                setSongs(likedSongs);
            } catch (error) {
                console.error("Error fetching liked songs:", error);
            }
        };
         if (!isLoading) {
        fetchLikedSongs();
    }

        fetchLikedSongs();
    }, [user, isLoading]);


    return (
        <div className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        ">
            <Header>
                <div className="mt-20">
                    <div className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-x-5
                    ">
                        <div className="
                        relative
                        h-32
                        w-32
                        lg:h-44
                        lg:w-44
                        ">
                            <Image
                            fill
                            alt="Playlist"
                            className="object-cover"
                            src="/Spotify/frontend/public/images/liked.png"
                            />
                        </div>
                        <div className="
                        flex
                        flex-col
                        gap-y-2
                        mt-4
                        md:mt-0
                        ">
                            <p className="hidden md:block font-semibold text-sm">
                                {t('Playlist')}
                            </p>
                            <h1 className="
                            text-white
                            text-4xl
                            sm:text-5xl
                            lg:text-7xl
                            font-bold
                            ">
                                {t('Liked songs')}
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    )
}

export default Liked;
