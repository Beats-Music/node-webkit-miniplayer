window.clientApp.api = {

    baseUrl: config.baseApiUrl,
    beatsAPI: function(url, token, cb) {
        console.log(this.baseUrl + url);

        var req = request.get(this.baseUrl + url)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json');

        req.end(function(res){
            if (res.ok) {
                cb(res.body);
            } 
            else {
                alert('API Error ' + res.text);
            }
        });
    },   
    search: function(query, cb){
        this.beatsAPI('search/federated?q=' + query, config.clientKey, cb);
    },
    audio: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID + '/audio?acquire=1', window.accessToken, cb);
    },
    album: function(albumID, cb){
        this.beatsAPI('albums/' + albumID, config.clientKey, cb);
    },
    image: function(type, ID, size, cb){
        return this.baseUrl + type + 's/' + ID + '/images/default?size=' + size;
    },
    playlist: function(playlistID, cb){
        this.beatsAPI('playlists/' + playlistID, config.clientKey, cb);
    },
    track: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID, config.clientKey, cb);
    }
}