import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })

	const {
		data: { session },
		error,
	} = await supabase.auth.getSession()

	if (error) {
		console.error('Error in middleware:', error)
		return new Response('Internal Server Error', { status: 500 })
	}

	if (!session) {
		return NextResponse.redirect('/login')
	}

	req.nextUrl.searchParams.set('user_id', session.user.id)

	return res
}

export default createMiddleware({
	locales: ['en', 'fr', 'ru'],

	defaultLocale: 'en',
})

export const config = {
	matcher: ['/', '/(fr|ru|en)/:path*'],
}
