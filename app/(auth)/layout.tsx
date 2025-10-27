import {ReactNode} from "react";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/LogoMakr-8korun.png";

export default function AuthLayout({children} : {children: ReactNode}) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant: "outline",
                className: "absolute left-4 top-4"
            })}>
                <ArrowLeftIcon className="size-4"/>
                Back
            </Link>
            <div className="flex w-full max-w-sm flex-col gap">
                <Link className="flex items-center gap-2 self-center font-medium" href="/" >
                    <Image src={Logo} alt="Logo" width={32} height={32}/>
                    CedricBLMS.
                </Link>
                {children}
            </div>
        </div>
    )
}