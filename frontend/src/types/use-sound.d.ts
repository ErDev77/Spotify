declare module 'use-sound' {
	interface Options {
		volume?: number
		playbackRate?: number
		loop?: boolean
		soundEnabled?: boolean
		interrupt?: boolean
		onload?: () => void
		onplay?: () => void
		onend?: () => void
		onpause?: () => void
		onstop?: () => void
		onerror?: (error: Error) => void
		format?: string | string[]
		html5?: boolean
		preload?: boolean
	}

	type PlayFunction = (options?: Options) => void

	export default function useSound(
		src: string | string[],
		options?: Options
	): [PlayFunction, { pause: () => void; stop: () => void; sound: any }]
}
