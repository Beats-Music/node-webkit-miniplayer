/**
 * Object for requesting the Beats Music Developer API
 *
 * Uses superagent to make the HTTP requests.
 * 
 */

window.clientApp.api = {
    baseUrl: config.baseApiUrl,
    beatsAPI: function(url, cb) {
        this.req = request.get(this.baseUrl + url)
        .set('Authorization', 'Bearer ' + window.accessToken)
        .set('Accept', 'application/json')
        .query({client_id: config.clientKey});

        this.req.end(function(res){
            if (res.ok) {
                cb(res.body);
            } 
            else {
                console.log('API Error ' + res.text);
            }
        });
    },   
    search: function(query, cb){
        if(!this.searchActive){
            this.searchActive = true;
        }
        else 
        {
            this.req.abort();
        }

        this.beatsAPI('search/federated?q=' + query, cb);       
    },
    audio: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID + '/audio?acquire=1', cb);
    },
    album: function(albumID, cb){
        this.beatsAPI('albums/' + albumID + '/tracks', cb);
    },
    image: function(type, ID, size, cb){
        return this.baseUrl + type + 's/' + ID + '/images/default?size=' + size + '&client_id=' + config.clientKey;
    },
    playlist: function(playlistID, cb){
        this.beatsAPI('playlists/' + playlistID, cb);
    },
    playlistTracks: function(playlistID, cb){
        this.beatsAPI('playlists/' + playlistID + '/tracks', cb);
    },
    track: function(trackID, cb){
        this.beatsAPI('tracks/' + trackID, cb);
    }
}