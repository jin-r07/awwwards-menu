"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const [currentPath, setCurrentPath] = useState("/");

    const handleLinkClick = (path: string) => {
        setCurrentPath(path);
    };

    useEffect(() => {
        if (pathname !== currentPath) {
            setCurrentPath(pathname);
        }
    }, [pathname]);

    const [today, setToday] = useState("");

    const [toggle, setToggle] = useState(false);

    const [isAtBottom, setIsAtBottom] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const currentDate = new Date();
        const day = days[currentDate.getDay()];
        setToday(day);

        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
            setIsAtBottom(isBottom);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleNavbar = () => {
        const nav = document.querySelector(".nav");

        const navItems = document.querySelector(".nav-items");

        const navHome = document.querySelector(".nav-home");

        const navTop = document.querySelector(".nav-top");

        if (!toggle) {
            gsap.to(nav, {
                height: "360px",
                duration: 0.75,
                ease: "power4.inOut",
                immediateRender: false
            })

            gsap.to(navTop, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                onStart: function () {
                    gsap.set(navTop, { display: "block" })
                },
                delay: 0.5,
                immediateRender: false
            })

            gsap.to(navItems, {
                opacity: 0,
                duration: 0.1,
                onComplete: function () {
                    gsap.set(navItems, { display: "none" })
                },
                immediateRender: false
            })

            gsap.to(navHome, {
                flexGrow: 1,
                duration: 0.2,
                ease: "power4.inOut",
                delay: 0,
                immediateRender: false,
            })
        } else {
            gsap.to(nav, {
                height: "55px",
                duration: 0.75,
                ease: "power4.inOut",
                delay: 0.2,
                immediateRender: false
            })

            gsap.to(navTop, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                onComplete: function () {
                    gsap.set(navTop, { display: "none" })
                },
                immediateRender: false
            })

            gsap.to(navHome, {
                flexGrow: 0,
                duration: 0.2,
                ease: "power4.inOut",
                immediateRender: false,
            })

            gsap.to(navItems, {
                opacity: 1,
                duration: 0.1,
                onStart: function () {
                    gsap.set(navItems, { display: "flex" })
                },
                delay: 0,
                immediateRender: false
            })
        }
        setToggle(!toggle)
    };

    const navVariants = {
        hidden: { bottom: "2%" },
        visible: { bottom: isAtBottom ? "-10%" : "2%" }
    };

    const navTransition = { ease: "easeIn", duration: 0.5 };

    const links = [
        {name: "Home", path: "/"},
        {name: "Accessories", path: "/accesories"},
        {name: "Services", path: "/services"},
        {name: "Contact", path: "/contact"}
    ];

    return (
        <>
            {/* Mobile Nav */}
            <motion.div
                initial="visible"
                animate="visible"
                variants={navVariants}
                transition={navTransition}
                className="nav fixed bottom-[2%] left-1/2 -translate-x-1/2 xl:w-[35%] md:w-[60%] w-[75%] h-[55px] flex flex-col items-center gap-[5px] rounded-lg p-[5px] bg-[#4D4D4D] backdrop-blur-lg z-10">
                <div className="nav-top absolute w-full h-[300px] rounded-md hidden opacity-0 scale-90 px-[5px]">
                    <div className="p-[10px] w-full h-full bg-[#2C2C2C] rounded-md flex">
                        <div className="col relative flex-1 h-full flex flex-col py-[10px] px-[15px] tracking-wide">
                            <div className="col-title relative">
                                <p className="relative text-sm text-white tracking-wide">Navigation</p>
                            </div>
                            {links.map(link => {
                                const isActive = link.path === currentPath;
                                return (
                                    <Link href={link.path} key={link.path} className={`mt-4 text-lg cursor-pointer p-2 pl-5 rounded-md ${isActive ? "bg-white" : "bg-[#222222]"} hover:bg-white group`} onClick={() => { handleLinkClick(link.path); toggleNavbar();}}>
                                        <span className={`${isActive ? "text-black" : "text-white"} group-hover:text-black`}>{link.name}</span>
                                    </Link>
                                )})
                            }
                        </div>
                    </div>
                </div>
                {/* Desktop Nav */}
                <div className="absolute bottom-0 w-full h-[55px] flex gap-[5px] pt-[6px] px-[5px] pb-[5px]">
                    <div className="bg-[#222222] rounded-md h-full flex justify-center items-center cursor-pointer transition-all duration-500 hover:bg-white">
                        <Link href="/" className="flex justify-center items-center h-24 rounded-md transition-all duration-500 hover:text-white border-1 p-4" onClick={() => {router.push('/');}}>
                            <Image src="/favicon.ico" alt="logo" width={32} height={32} priority={true}/>
                        </Link>
                    </div>
                    {/* Mobile Nav */}
                    <div className="nav-home flex-1 bg-[#222222] rounded-md w-full md:hidden flex justify-center items-center cursor-pointer transition-all duration-500 px-[20px] hover:bg-gray-700" onClick={toggleNavbar}>
                        <div className="gap-[10px] flex justify-center items-center flex-1 w-full rounded-md transition-all duration-500">
                            {toggle ?
                                <p className="text-white tracking-wide text-lg">Close</p>
                                :
                                <p className="text-white tracking-wide text-lg">Menu</p>
                            }
                            {toggle ?
                                <RiCloseLine className="hamburger relative text-white text-xl"/>
                            :
                                <HiOutlineMenuAlt2 className="hamburger relative text-white text-xl"/>
                            }
                        </div>
                    </div>
                    <div className="nav-items flex-1 h-full flex justify-center items-center gap-[5px] text-white">
                        {links.slice(1).map(link => {
                            const isActive = link.path === currentPath;
                            return (
                                <Link href={link.path} key={link.path} className={`md:flex hidden justify-center items-center flex-1 h-full ${isActive ? "bg-white" : "bg-[#222222]"} hover:bg-white rounded-md transition-all duration-500 cursor-pointer text-white group`} onClick={() => handleLinkClick(link.path)}>
                                    <span className={`text-lg tracking-wide ${isActive ? "text-black" : "text-white"} group-hover:text-black`}>{link.name}</span>
                                </Link>
                            )
                        })}
                        <p className="bg-white text-black md:flex-grow-0 flex-grow flex items-center justify-center py-[7px] px-[10px] rounded-md text-lg tracking-wide uppercase">{today}</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
}