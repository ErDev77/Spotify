"use client";

import toast from "react-hot-toast";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { twMerge } from "tailwind-merge";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
// import { IoLogOut } from "react-icons/io5";
import { IoIosLogOut } from 'react-icons/io'
import usePlayer from "@/hooks/usePlayer";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";

interface HeaderProps {
	children: React.ReactNode
	className?: string
}

const Header: React.FC<HeaderProps> = ({children,className}) => {
    const player = usePlayer();
    const router = useRouter()
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const { t } = useTranslation()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if(error) {
            toast.error(error.message);
        } else {
            toast.success('You successfully logged out!')
        }
    }


    return (
        <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
        `,
        className
    )} 
        >
         <div 
         className="
         w-full
         mb-4
         flex
         items-center
         justify-between
         ">
         <div className="
         hidden
         md:flex
         gap-x-2
         items-center
         ">

            <button 
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
                <RxCaretLeft className="text-white" size={35} />
            </button>
            
            <button 
             onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
                <RxCaretRight className="text-white" size={35} />
            </button>
            </div>  
            <div className="
            flex
            md:hidden
            gap-x-2
            items-center
            ">
                </div> 
                <div
                className="
                flex
                justify-between
                items-center
                gap-x-4
                "
                >
                {user ? (
                    <div className="
                    flex
                    gap-x-4
                    items-center
                    ">
                        <Button 
                        onClick={handleLogout}
                        className="bg-white p-2 py-1"
                        >
                         <IoIosLogOut    
                         size={30}
                         />
                        </Button>
                        <Button
                        onClick={() => router.push('/account')}
                        className="bg-white"
                        >
                            <FaUserAlt />
                        </Button>
                    </div>
                ) : (
                <>
                <div>
                    <Button  
                    onClick={authModal.onOpen}
                    className="
                    bg-transparent
                    text-neutral-400
                    font-medium
                    hover:text-white
                    ">
                        {t('Sign Up')}
                    </Button>
                </div>
                                <div>
                    <Button 
                    onClick={authModal.onOpen}
                    className="
                    bg-white
                    px-6
                    py-2                   
                    ">
                        {t('Log in')}
                    </Button>
                </div>
                </>
                )}
                </div>
            </div> 
            {children}
        </div>
    )
}

export default Header;