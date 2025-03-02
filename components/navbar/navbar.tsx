import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import { FishIcon, ScanTextIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <>
      <div className="animate-in fade-in w-full border-b border-slate-200">
        <nav className="container px-6 md:px-8 py-4">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <FishIcon className="w-8 h-8 mr-2 inline" />{" "}
                <span className="text-xl font-semibold tracking-tighter text-slate-800 mr-6">
                  HyperCart
                </span>
              </div>
            </Link>
            <div className="hidden md:flex justify-between grow">
              <div>
                <Link
                  href="products"
                  className={buttonVariants({ variant: "link" })}
                >
                  Products
                </Link>
                <Link
                  href="orders"
                  className={buttonVariants({ variant: "link" })}
                >
                  Orders
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="addProduct"
                  className={buttonVariants({ variant: "orange" })}
                >
                  Add Product
                </Link>
                <NavbarUserLinks />
              </div>
            </div>
            <div className="grow md:hidden flex justify-end">
              <NavbarMobile />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
