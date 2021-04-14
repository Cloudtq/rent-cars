let geolocation = null

export function Selflocation(params) {
    if (!geolocation) {
        geolocation = new AMap.Geolocation({
            showMarker: false,
            enableHighAccuracy: true,
            timeout: 10000,
            showButton: false,
            zoomToAccuracy: true,
            markerOptions: {
                content: ' ',
            },
        })
    }

    params.map.addControl(geolocation)

    geolocation.getCurrentPosition()
    if (params.complete && typeof params.complete === 'function') {
        AMap.event.addListener(geolocation, 'complete', params.complete)
    }

    if (params.error && typeof params.error === 'function') {
        AMap.event.addListener(geolocation, 'error', params.error)

    }

}