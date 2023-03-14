const About = {
	name: 'Miner Banner',
	version: '1.1.0',
	author: 'Firok',
	isDev: true,
	banners: [
		{
			rid: '32627',
			title: '老马啊老马',
			subtitle: '没有薯条的码头, 毫无意义'
		},
	],
}

function htmlEncode(s)
{
	let ret = ''
	for (let char of s)
	{
		const code = char.codePointAt(0)
		ret += code > 127 ? '&#' + code + ';' : char
	}
	return ret
}
function colorEncode(raw)
{
	if(raw == null) return null

	const len = raw.length
	let indexStart
	if(len === 3 || len === 6) indexStart = 0
	else if(len === 4 || len === 7) indexStart = 1
	else return null

	if(indexStart === 1 && raw.charAt(0) !== '#') return null

	for(let index = indexStart; index < len; index++)
	{
		const char = raw.charAt(index)
		if((char >= '0' && char <= '9') ||
			(char >= 'a' && char <= 'z') ||
			(char >= 'A' && char <= 'Z')
		) continue
		return null
	}

	return indexStart === 1 ? raw : '#' + raw
}

function fontEncode(raw)
{
	if(raw == null) return null

	for(let char of raw)
	{
		if(char === ' ' || char === '-' || char === '_' || char === ',' ||
			(char >= 'a' && char <= 'z') ||
			(char >= 'A' && char <= 'Z') ||
			(char >= '0' && char <= '9')
		) continue
		return null
	}

	return raw
}

function resolveIndex()
{
	const banner = About.banners[0]
	return new Response(
		`<html lang="zh">
<head>
    <title>Miner Banner</title>
    <meta charset="UTF-8">
    <style>
        @font-face {
            font-family: Monocraft;
            src: url("https://cdn.jsdelivr.net/npm/@south-paw/typeface-minecraft@1.0.0/files/minecraft.woff")
        }
        .title { font-family: Monocraft, Microsoft Yahei, 黑体 }
        body { background-color: #C6C6C6; padding: 12px 0; font-family: Microsoft Yahei, 黑体 }
        table { font-size: 24px }
        tr > td:first-child { text-align: right; font-weight: bold }
        td { padding: 0 4px }
        input { height: 32px; width: 100%; min-width: 48px }
        input[type=text] { padding: 8px }
        .small { font-size: 60% }
        .right { text-align: right }
        .top { vertical-align: top }
        .space { height: 16px }
        button
        {
            cursor: grab;
            width: 90px;
            height: 36px;
            margin-right: 12px;
            line-height: 36px;
            outline: 2px black solid;
            border-top: 2px #aaa solid;
            border-left: 2px #aaa solid;
            border-right: 2px #535353 solid;
            border-bottom: 2px #535353 solid;
            background-color: #6f6f6f;
            color: white;
        }
        button:hover
        {
            border-top: 2px #bdc6ff solid;
            border-left: 2px #bdc6ff solid;
            border-right: 2px #5b659c solid;
            border-bottom: 2px #5b659c solid;
            background-color: #7b85bd;
        }
    </style>
</head>

<body>

<div style="text-align: center">
    <table style="margin: auto">
        <tr>
            <td colspan="3">
                <div class="title right">${About.name}</div>
                <div class="title small right">v ${About.version}</div>
                <div class="title small right">by ${About.author}</div>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td>图标资源 ID</td>
            <td><input type="number" step="1" min="1" id="in-rid" value="${banner.rid}"></td>
            <td><button id="btn-check" style="width: 36px; height: 24px; line-height: 12px; padding: 0">🔍</button></td>
        </tr>
        <tr>
            <td>标题</td>
            <td><input type="text" id="in-t" value="${banner.title}"/></td>
            <td><input type="color" id="in-tc" value="#fafa00"></td>
        </tr>
        <tr>
            <td class="small">标题字体</td>
            <td><input type="text" id="in-tf" value="Microsoft Yahei"></td>
        </tr>
        <tr>
            <td>副标题</td>
            <td><input type="text" id="in-st" value="${banner.subtitle}"></td>
            <td><input type="color" id="in-stc" value="#fefefe"></td>
        </tr>
        <tr>
            <td class="small">副标题字体</td>
            <td><input type="text" id="in-stf" value="Microsoft Yahei"></td>
        </tr>

        <tr>
            <td></td>
            <td class="small"></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: right">
                <div class="space"></div>
                <button id="btn-gen">生成!</button>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center">
                <img id="out-img" src="${About.isDev ? 'http://localhost:8787' : 'https://miner-banner.firok.workers.dev'}/svg?rid=${banner.rid}&t=${banner.title}&st=${banner.subtitle}" alt="image"/>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <hr>
            </td>
        </tr>
        <tr>
            <td class="small top">图片</td>
            <td class="small" colspan="2">
                * 图片生成需要一点点时间<br>
                * 请右键或长按保存生成的图片
            </td>
        </tr>
        <tr>
            <td class="small top">图标资源 ID</td>
            <td class="small" colspan="2">
                * 使用 <a href="https://www.mcmod.cn" target="_blank">mcmod.cn</a> 站内资料 ID<br>
                * 设为 0 则不包含图标
            </td>
        </tr>
        <tr>
            <td class="small top">字体</td>
            <td class="small" colspan="2">
                * 字体列表使用逗号分隔<br>
                * 字体名称只支持英文/数字/下划线/空格<br>
                * 不同用户设备支持显示的字体可能不同
            </td>
        </tr>
        <tr>
            <td class="small top">关于</td>
            <td class="small">
                基于 Cloudflare Worker,<br>
                动态生成 SVG 格式 Minecraft 成就横幅图片<br>
                查看源码或 API 请访问 <a href="https://github.com/FirokOtaku/MinerBanner" target="_blank">GitHub</a>
            </td>
        </tr>
    </table>
</div>

<script>
    const $ = id => document.getElementById(id)
    const inRid = $('in-rid'), inT = $('in-t'), inSt = $('in-st'), inTc = $('in-tc'), inStc = $('in-stc'), inTf = $('in-tf'), inStf = $('in-stf')
    const btnGen = $('btn-gen'), btnCheck = $('btn-check'), outImg = $('out-img')
    btnGen.onclick = () => {
        const params = {}

        const rid = inRid.value
        if(rid !== '' && parseInt(rid) > 0) params['rid'] = rid

        const t = inT.value.trim()
        if(t !== '')
        {
            params['t'] = t
            const tc = inTc.value.toLowerCase(), tf = inTf.value.trim()
            if(tc !== '#fafa00') params['tc'] = tc
            if(tf !== '') params['tf'] = tf
        }
        const st = inSt.value.trim()
        if(st !== '')
        {
            params['st']= st
            const stc = inStc.value.toLowerCase(), stf = inStf.value.trim()
            if(stc !== '#fefefe') params['stc'] = stc
            if(stf !== '') params['stf'] = stf
        }
        let url = '${About.isDev ? 'http://localhost:8787/svg?' : 'https://miner-banner.firok.workers.dev/svg?'}'
        for(const key in params)
		{
            url += '&' + key + '=' + encodeURIComponent(params[key])
		}
        outImg.src = url
    }
    btnCheck.onclick = () => {
        const url = 'https://www.mcmod.cn/item/' + inRid.value.trim() + '.html'
        window.open(url)
    }
</script>
</body>
</html>`,
		{
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
				'Cache-Control': 'public, max-age=30',
			},
			status: 200,
		}
	)
}
async function getImage(rid)
{
	const rGroup = parseInt('' + (parseInt(rid) / 10000))
	const res = await fetch(`https://i.mcmod.cn/item/icon/128x128/${rGroup}/${rid}.png?v=9`, { method: 'get' })
	const resBlob = await res.blob()
	const resBuffer = await resBlob.arrayBuffer()
	const resString = String.fromCharCode(...new Uint8Array(resBuffer))
	return btoa(resString)
}
async function resolveSvg(request, url, env)
{
	const params = url.searchParams
	const rid = params.get('rid')
	const title = params.get('t')
	const subtitle = params.get('st')

	let partImage
	if(rid != null)
	{
		let resB64
		if(env.mcmodTextures && env.mcmodTextures.get && env.mcmodTextures.put)
		{
			const cacheKey = 'item-' + rid
			const cache = await env.mcmodTextures.get(cacheKey, { type: "text" })
			if(cache === null)
			{
				try
				{
					resB64 = await getImage(rid)
					await env.mcmodTextures.put(cacheKey, resB64, {expirationTtl: 3600 * 24})
				}
				catch (ignored) { }
			}
			else resB64 = cache
		}
		else resB64 = await getImage(rid)

		partImage = `<image xlink:href="data:image/png;base64,${resB64}" x="16" y="16" width="32" height="32"/>`
	}
	else partImage = ''

	let partTitle
	if(title != null)
	{
		const colorTitle = colorEncode(params.get('tc')) ?? '#fafa00'
		const fontTitle = fontEncode(params.get('tf')) ?? 'Microsoft Yahei, Minecraft'
		partTitle = `<text fill="${colorTitle}" font-size="16" font-family="${fontTitle}" x="60" y="26">${htmlEncode(title)}</text>`
	}
	else
	{
		partTitle = ''
	}

	let partSubtitle
	if(subtitle != null)
	{
		const colorSubtitle = colorEncode(params.get('stc')) ?? '#fefefe'
		const fontSubtitle = fontEncode(params.get('stf')) ?? 'Microsoft Yahei, Minecraft'
		partSubtitle = `<text fill="${colorSubtitle}" font-size="16" font-family="${fontSubtitle}" x="60" y="48" >${htmlEncode(subtitle)}</text>`
	}
	else
	{
		partSubtitle = ''
	}

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<svg width="320" height="64" viewBox="0 0 320 64" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns="http://www.w3.org/2000/svg">
    <title>${title}</title>
    
    <style>text { user-select: none } image { image-rendering: optimizeSpeed; image-rendering: pixelated; }</style>
    <defs>
        <g id="h">
            <image width="305" height="8" x="7.5" y="0" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAQAAACSE13KAAAAHklEQVQI1wXBAQEAMAjAIFwTM71/ Fg/moqcRYa/zASLlA4A/5vbyAAAAAElFTkSuQmCC "/>
        </g>
        <g id="v">
            <image width="8" height="49" x="0" y="7.5" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAQAAABJCSfIAAAAGUlEQVQI12Nk+M/AEMzAzPCXgZHh HMM/BgAgNwQhtB+BKwAAAABJRU5ErkJggg== "/>
        </g>
        <g id="c">
            <image width="8" height="8" x="0" y="0" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA LiMAAC4jAXilP3YAAABVSURBVAjXTcoxCsJAFADR97NrhCQg2Hghu3j/o6yyIfwUInG6GSbSSST1 zxXlDJdMq2r4hWp3t4vEmOHpplm+R+gePkZvcc3Ny6SZDDa1S7Nm0aXiAF3bFjJ6qKvmAAAAAElF TkSuQmCC "/>
        </g>
    </defs>
    <rect fill="#212121" width="305" height="49" x="7.5" y="7.5"/>
	<use xlink:href="#h"/>
	<use xlink:href="#h" x="0" y="-64" transform="scale(1,-1)"/>

	<use xlink:href="#v"/>
	<use xlink:href="#v" x="-320" y="0" transform="scale(-1,1)"/>

	<use xlink:href="#c"/>
	<use xlink:href="#c" x="0" y="-64" transform="scale(1,-1)"/>
	<use xlink:href="#c" x="-320" y="-64" transform="scale(-1)"/>
	<use xlink:href="#c" x="-320" y="0" transform="scale(-1,1)"/>

    ${partImage}
    ${partTitle}
    ${partSubtitle}
</svg>
`,
		{
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=3600',
			},
			status: 200,
		}
	)
}

export default
{
	async fetch(request, env, ctx)
	{
		const url = new URL(request.url)

		if(url.pathname === '/svg')
		{
			return await resolveSvg(request, url, env)
		}
		else if(url.pathname === '/favicon.ico')
		{
			return new Response(null, { status: 404 })
		}
		else
		{
			return resolveIndex()
		}

	},
}
