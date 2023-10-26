import Link from 'next/link'
import { ListBulletIcon, EyeIcon } from '@heroicons/react/24/solid'
import { FilmIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
    const PCView = (
        <div className='hidden mt-1 md:flex w-full justify-center space-x-6'>
            <Link href='/' className='header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200'>
                <FilmIcon className='h-6' />
                <span className='span'>Movies</span>
            </Link>
            <Link href='/my-list' className='header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200'>
                <ListBulletIcon className='h-6' />
                <span className='span'>My List</span>
            </Link>
            <Link href='/to-watch' className='header-link group flex flex-row space-x-2 hover:text-gray-400 transition-all duration-200'>
                <EyeIcon className='h-6' />
                <span className='span'>To Watch</span>
            </Link>
        </div>
    )
    const PhoneView = (
        <div className='flex mt-1 space-x-8 md:hidden w-full justify-center'>
            <Link href='/' className='header-link group hover:text-gray-400 transition-all duration-200'>
                <span className='span'>
                    <FilmIcon className='h-6' />
                </span>
            </Link>
            <Link href='/my-list' className='header-link group hover:text-gray-400 transition-all duration-200'>
                <span className='span'>
                    <ListBulletIcon className='h-6' />
                </span>
            </Link>
            <Link href='/to-watch' className='header-link group hover:text-gray-400 transition-all duration-200'>
                <span className='span'>
                    <EyeIcon className='h-6' />
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
