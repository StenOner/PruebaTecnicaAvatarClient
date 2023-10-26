'use client'

import Link from 'next/link'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import { FilmIcon, ClockIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
  const pathname = usePathname()

  const compareCurrentPath = (path: string) => path === pathname

  const PCView = (
    <div className='hidden mt-1 md:flex w-full justify-center space-x-6'>
      <Link
        href='/'
        className={`${compareCurrentPath('/') ? 'text-gray-400 ' : ''}header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200`}>
        <FilmIcon className='h-6' />
        <span className='span'>Movies</span>
      </Link>
      <Link
        href='/my-list'
        className={`${compareCurrentPath('/my-list') ? 'text-gray-400 ' : ''}header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200`}>
        <ListBulletIcon className='h-6' />
        <span className='span'>My List</span>
      </Link>
      <Link
        href='/watch-later'
        className={`${compareCurrentPath('/watch-later') ? 'text-gray-400 ' : ''}header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200`}>
        <ClockIcon className='h-6' />
        <span className='span'>Watch Later</span>
      </Link>
    </div>
  )
  const PhoneView = (
    <div className='flex mt-1 space-x-8 md:hidden w-full justify-center'>
      <Link
        href='/'
        className={`${compareCurrentPath('/') ? 'text-gray-400 ' : ''}header-link group hover:text-gray-400 transition-all duration-200`}>
        <span className='span'>
          <FilmIcon className='h-6' />
          </span>
      </Link>
      <Link
        href='/my-list'
        className={`${compareCurrentPath('/my-list') ? 'text-gray-400 ' : ''}header-link group hover:text-gray-400 transition-all duration-200`}>
        <span className='span'>
          <ListBulletIcon className='h-6' />
        </span>
      </Link>
      <Link
        href='/watch-later'
        className={`${compareCurrentPath('/watch-later') ? 'text-gray-400 ' : ''}header-link group hover:text-gray-400 transition-all duration-200`}>
        <span className='span'>
          <ClockIcon className='h-6' />
        </span>
      </Link>
    </div>
  )
  
  return (
    <nav className='flex sticky bg-[#040714] bg-opacity-80 top-0 z-[1000] items-center px-10 md:px-12 h-16 text-white'>
      {PCView}
      {PhoneView}
    </nav>
  )
}

export default Header
