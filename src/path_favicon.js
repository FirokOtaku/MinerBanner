
function resolveFavicon()
{
    const iconB64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAy0lEQVRYw2NgGAUjHTCiC8xv8f1PSwtPXXjGwMDAwDB9zVlGBgYGBqaBDgEWXBILVh5kYGBgYEgItyfKoKap+xgYGBgY5ESYUfQRMmfwhsCjN39RfFaX7YTXp+j6YD6H8XEBptFcMGjTAK7cAOPDAHoawKV+6OUCWGrHlTvQfYwrtY/mgqGXC2AupBcYfCFw48G7kRUCjORqTPLVQckt959/ZWBgYGDYf+Y+45AKAbIdICUqxCAlKjT008CoA0YdwEKuxqOXHg+PEAAANCxWEHETqxkAAAAASUVORK5CYII='
    const iconBytes = atob(iconB64)
    const arrayBuffer = new ArrayBuffer(iconBytes.length)
    const intArray = new Uint8Array(arrayBuffer)
    for (let i = 0; i < iconBytes.length; i++)
        intArray[i] = iconBytes.charCodeAt(i)
    const iconBlob = new Blob([intArray], {type: 'image/png'})
    return new Response(iconBlob, {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}

export default resolveFavicon
