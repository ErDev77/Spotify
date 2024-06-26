"use client";

import Box from "@/components/Box";
import useTranslation from 'next-translate/useTranslation'
const Error = () => {
    const { t } = useTranslation()
    return (
        <Box className="
        h-full
        flex
        items-center
        justify-center
        ">
            <div className="
            text-neutral-400
            ">
                {t('Something went wrong'!)}
            </div>
        </Box>
    )
}

export default Error;