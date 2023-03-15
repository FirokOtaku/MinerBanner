import {CommonBanners, DatetimeBanners} from "./banners";

function resolveIndex(env)
{
    return new Response(
        `<html lang="zh">
<head>
    <title>Miner Banner</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
    <style>
        @font-face { font-family: Monocraft; src: url("https://cdn.jsdelivr.net/npm/@south-paw/typeface-minecraft@1.0.0/files/minecraft.woff") }
        .title { font-family: Monocraft, Microsoft Yahei, 黑体 }
        body { background-color: #C6C6C6; padding: 12px 0; font-family: Microsoft Yahei, 黑体 }
        table { font-size: 20px }
        tr > td:first-child { text-align: right; font-weight: bold }
        td { padding: 2px 4px }
        input, textarea
        {
            height: 32px;
            width: 100%;
            background-color: #a09172;
            color: white;
            font-weight: bold;
            caret-color: yellow;
            border-top: 2px #e0ca9f solid;
            border-left: 2px #e0ca9f solid;
            border-right: 2px #544c3b solid;
            border-bottom: 2px #544c3b solid;
            box-shadow: 1px 1px 1px white, -1px -1px 1px #373737;
            border-radius: 0;
        }
        input[type=text],input[type=number] { padding: 8px }
        input[type=color] { width: 42px }
        .small { font-size: 65% }
        .right { text-align: right !important; }
        .center { text-align: center !important; }
        .top { vertical-align: top }
        .space { height: 16px }
        button
        {
            cursor: grab;
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
        #out-img
        {
            width: 320px;
            height: 64px;
            border: 1px solid silver;
        }
    </style>
</head>

<body>
<div style="text-align: center">
    <table style="margin: auto">
        <tr>
            <td colspan="3">
                <div class="title right">${env.Name}</div>
                <div class="title small right">v ${env.RunningVersion}</div>
                <div class="title small right">by ${env.Author}</div>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td>图标 ID</td>
            <td><input type="number" step="1" min="1" id="in-rid"/></td>
            <td><button id="btn-check" style="width: 40px; height: 28px; line-height: 12px">🔍</button></td>
        </tr>
        <tr>
            <td>标题</td>
            <td><input type="text" id="in-t"/></td>
            <td><input type="color" id="in-tc"/></td>
        </tr>
        <tr>
            <td class="small">标题字体</td>
            <td><input type="text" id="in-tf"/></td>
        </tr>
        <tr>
            <td>副标题</td>
            <td><input type="text" id="in-st"/></td>
            <td><input type="color" id="in-stc"/></td>
        </tr>
        <tr>
            <td class="small">副标题字体</td>
            <td><input type="text" id="in-stf"/></td>
        </tr>

        <tr>
            <td></td>
            <td class="small"></td>
        </tr>
        <tr>
            <td colspan="2" class="right">
                <button id="btn-gen" style="width: 90px; height: 36px; padding: 0">生成!</button>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td colspan="3" class="center">
                <img id="out-img" src="#" alt="image"/>
                <div class="space"></div>
            </td>
        </tr>
        <tr>
            <td class="small">显式 URL</td>
            <td class="center">
                <input id="out-href-explicit" readonly/>
            </td>
            <td><button id="btn-copy-explicit" style="width: 40px; height: 28px; line-height: 12px">📋</button></td>
        </tr>
        <!--<tr>
            <td class="small">隐式 URL</td>
            <td class="center">
                <input id="out-href-implicit" readonly value=""></input>
            </td>
            <td><button id="btn-copy-implicit" style="width: 40px; height: 28px; line-height: 12px">📋</button></td>
        </tr>-->
        <tr>
            <td colspan="3">
                <hr>
            </td>
        </tr>
        <tr>
            <td class="small top">图片</td>
            <td class="small" colspan="2">
                * 图片生成和加载需要一点点时间<br>
                * 请右键或长按保存生成的图片<br>
                * 生成的图片为 SVG 格式 <br>
                <i>如需生成 PNG 格式图片,<br>请使用 mcmod.cn 提供的 <a href="https://www.mcmod.cn/tools/achievements/" target="_blank">成就生成器</a></i>
            </td>
        </tr>
        <tr>
            <td class="small top">图标 ID</td>
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
            <td class="small" colspan="2">
                基于 Cloudflare Worker,<br>
                动态生成 SVG 格式 Minecraft 成就横幅图片<br>
                材质贴图直接取自 mcmod.cn<br>
                <i>没有特殊声明的模组, 一般默认禁止商业使用其资源</i><br>
                查看源码或 API 请访问 <a href="https://github.com/FirokOtaku/MinerBanner" target="_blank">GitHub</a>
            </td>
        </tr>
    </table>
</div>
<script>
    function genBanner(now)
    {
        const day = now.getUTCDay(), date = now.getUTCDate(), mon = now.getUTCMonth() + 1, hour = now.getHours()
        const DatetimeBanners = JSON.parse(decodeURIComponent(escape(atob('${DatetimeBanners}'))))
        const CommonBanners = JSON.parse(decodeURIComponent(escape(atob('${CommonBanners}'))))
        for(let DB of DatetimeBanners)
        {
            if(DB.day === day && Math.random() > DB.per) return DB
            if(DB.hour === hour && Math.random() > DB.per) return DB
            if(DB.date === date && DB.mon === mon && Math.random() > DB.per) return DB
        }
        return CommonBanners[parseInt('' + (Math.random() * CommonBanners.length))]
    }
    const banner = genBanner(new Date())
    const $ = id => document.getElementById(id)
    const inRid = $('in-rid'), inT = $('in-t'), inSt = $('in-st'), inTc = $('in-tc'), inStc = $('in-stc'), inTf = $('in-tf'), inStf = $('in-stf')
    const btnGen = $('btn-gen'), btnCheck = $('btn-check'), outImg = $('out-img')
    const btnCopyExplicit = $('btn-copy-explicit'), outHrefExplicit = $('out-href-explicit')
    const btnCopyImplicit = $('btn-copy-implicit'), outHrefImplicit = $('out-href-implicit')
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
        let url = '${env.BaseUrl}' + '/svg_achievement?'
        for(const key in params)
        {
            url += '&' + key + '=' + encodeURIComponent(params[key])
        }
        outImg.src = url
        outImg.alt = t
        outHrefExplicit.value = url
    }
    btnCheck.onclick = () => window.open('https://www.mcmod.cn/item/' + inRid.value.trim() + '.html')
    let tsCopy = 0
    function resetBtnCopyExplicit() { if(btnCopyExplicit.innerText !== '📋' && new Date().getTime() - tsCopy >= 2000) btnCopyExplicit.innerText = '📋' }
    btnCopyExplicit.onclick = () => {
        window.navigator.clipboard.writeText(outHrefExplicit.value)
        .then(() => {
            tsCopy = new Date().getTime()
            btnCopyExplicit.innerText = '✔'
            setTimeout(resetBtnCopyExplicit, 2050)
        })
        .catch(() => {
            tsCopy = new Date().getTime()
            btnCopyExplicit.innerText = '❌'
            setTimeout(resetBtnCopyExplicit, 2050)
        })
    }
    inRid.value = banner?.rid ?? '32627'
    inT.value = banner?.t ?? '老马啊老马'
    inTc.value = banner?.tc ?? '#fafa00'
    inTf.value = banner?.tf ?? 'Microsoft Yahei'
    inSt.value = banner?.st ?? '没有薯条的码头, 毫无意义'
    inStc.value = banner?.stc ?? '#fefefe'
    inStf.value = banner?.stf ?? 'Microsoft Yahei'
    btnGen.click()
</script>
</body>
</html>`,
        {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=60',
            },
            status: 200,
        }
    )
}

export default resolveIndex
