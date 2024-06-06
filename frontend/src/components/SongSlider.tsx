import React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'

interface SongSliderProps {
	currentTime: number
	duration: number
	onChange: (value: number) => void
}

const SongSlider: React.FC<SongSliderProps> = ({
	currentTime,
	duration,
	onChange,
}) => {
	const handleChange = (newValue: number[]) => {
		onChange(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='flex w-full max-w-md flex-col gap-2'
			defaultValue={[currentTime]}
			value={[currentTime]}
			onValueChange={handleChange}
			min={0}
			max={duration}
			step={0.1}
			aria-label='Song Progress'
		>
			<RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px] cursor-pointer'>
				<RadixSlider.Range className='absolute bg-white rounded-full h-full' />
			</RadixSlider.Track>
			{/* <RadixSlider.Thumb className='w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow-md' /> */}
		</RadixSlider.Root>
	)
}

export default SongSlider
