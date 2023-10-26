import { SpinnerCircular } from 'spinners-react'

const SpinnerLoading: React.FC = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
        <SpinnerCircular />
    </div>
  )
}

export default SpinnerLoading