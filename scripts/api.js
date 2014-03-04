window.clientApp.api = {
    baseUrl: config.baseApiUrl,
    beatsAPI: function(url, cb) {
        var req = request.get(this.baseUrl + url)
        .set('Authorization', 'Bearer ' + window.accessToken)
        .set('Accept', 'application/json')
        .query({client_id: config.clientKey});

        req.end(function(res){
            if (res.ok) {
                cb(res.body);
            } 
            else {
                console.log('API Error ' + res.text);
            }
        });

        console.log(this.baseUrl + url);
    },   
    search: function(query, cb){
        this.beatsAPI('search/federated?q=' + query, cb);
    },
    audio: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID + '/audio?acquire=1', cb);
    },
    album: function(albumID, cb){
        this.beatsAPI('albums/' + albumID, cb);
    },
    image: function(type, ID, size, cb){
        return config.mainApi + type + 's/' + ID + '/images/default?size=' + size;
    },
    playlist: function(playlistID, cb){
        this.beatsAPI('playlists/' + playlistID, cb);
    },
    track: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID, cb);
    }
}