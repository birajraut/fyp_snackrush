import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import placeholder from '../../assets/restaurant.png';


const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/"; 
}
const RestaurantHeader = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div>logo</div>
        <div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <MenuButton className='inline-flex  justify-center gap-x-1.5 rounded-full w-10 h-10 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'>
                <img src={placeholder} alt='i age' className='w-full h-full object-cover' />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
            >
              <div className='py-1'>
                <MenuItem>
                  <button
                    type='button'
                    onClick={handleLogout}
                    className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default RestaurantHeader;
