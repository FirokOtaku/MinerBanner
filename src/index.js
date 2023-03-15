import resolveIndex from './path_index'
import resolveFavicon from './path_favicon'
import resolveSvgAchievement from './path_svg_achievement'

export default
{
	async fetch(request, env, ctx)
	{
		const url = new URL(request.url)

		switch (url.pathname)
		{
			case '/svg_achievement':
			case '/svg_achievement/':
				return await resolveSvgAchievement(request, url, env)
			case '/favicon.ico':
			case '/favicon.ico/':
				return resolveFavicon()
			default:
				return resolveIndex(env)
		}
	},
}
