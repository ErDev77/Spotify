import Header from "@/components/Header";

const Songs = () => {
    return (
			<div
				className='
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        '
			>
				<Header>
					<div className='mt-20'>
						<div
							className='
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-x-5
                    '
						>
							<div
								className='
                        relative
                        h-32
                        w-32
                        lg:h-44
                        lg:w-44
                        '
							>
							</div>
							<div
								className='
                        flex
                        flex-col
                        gap-y-2
                        mt-4
                        md:mt-0
                        '
							>
								<h1
									className='
                            text-white
                            text-4xl
                            sm:text-5xl
                            lg:text-7xl
                            font-bold
                            '
								>
									Songs
								</h1>
							</div>
						</div>
					</div>
				</Header>
			</div>
		)
}

export default Songs;