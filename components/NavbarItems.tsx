import React from "react";

interface NavbarItemProps{
   lable: string 
}

const NavbarItems: React.FC<NavbarItemProps> = ({lable}) => {
    return(
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {lable}
        </div>
    )
}

export default NavbarItems;