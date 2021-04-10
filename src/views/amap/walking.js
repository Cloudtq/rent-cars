let walking = null

export function Walking(params) {
    if (!walking) {
        walking = new AMap.Walking({
            map: params.map,
            hideMarkers: true,
        })
    }

    walking.search(params.position_start, params.position_end, (status, result) => {
        if (status === 'complete') {
            if (params.complete && typeof params.complete == 'function') {
                params.complete(result)
            }
        } else {
            console.log('error');
        }
    })
}