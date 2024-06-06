"use client";

import React from "react";
import { Song } from "../../../../types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import useTranslation from "next-translate/useTranslation";

interface PageContentProps {
    songs: Song[];
}


const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs)
    const { t } = useTranslation()

    if(songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                {t('No songs available')}
            </div>
        )
    }

    return (
        <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
        "
        >
            {songs.map((item) => (
                <SongItem 
                key={item.id}
                onClick={(id: string) => onPlay(id)}
                data={item}
                />
            ))}
        </div>
    );
}

export default PageContent;