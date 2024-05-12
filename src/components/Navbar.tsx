import {NavLink} from "react-router-dom";
import {FC} from "react";

interface NavbarProps {
    firstName: string;
}

const Navbar: FC<NavbarProps> = ({firstName}) => {
        return (
    <div className={'flex justify-between my-2'}>
        <div className='flex gap-3 text-2xl'>
            <NavLink to='/'>
                Usual
            </NavLink>
            <NavLink to='/coder'>
                Coder
            </NavLink>
        </div>
        <div className='text-2xl'>
            {firstName}
        </div>
    </div>
);
}
;

export default Navbar;