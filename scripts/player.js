window.clientApp.player = {

    init: function(type, ID){
        this.tracklistTmpl = Handlebars.compile(window.clientApp.templates.tracklist);
        this.musicActive = Handlebars.compile(window.clientApp.templates.musicActive);

        this.render(type, ID);
    },
    backToSearch: function(){
        var that = this;

        this.$menu = $('.app--menu--icon--container');

        this.$menu.click(function(){

            that.cache = '';
            that.cache = $('.artwork').parent().html() + $('.player').parent().html();

            //TODO: Clean up event binding
            console.log(that.cache);

            window.clientApp.search.player = true;
            window.clientApp.search.init();

            //TODO: Clean up event binding
            window.clientApp.search.backToPlayer();

            window.clientApp.$appContainer.append(
                that.musicActive({meta: that.active})
            );

            window.clientApp.$appContainer.append(
                that.tracklistTmpl({ tracks: that.getTracklist() })
            );
        });        
    },
    backFromSearch: function(){
        window.clientApp.$appContainer.html(
            this.cache
        );
        //TODO: Clean up event binding
        this.backToSearch();
    },
    render: function(type, ID){
        this.artwork = Handlebars.compile(window.clientApp.templates.artwork);
        this.player = Handlebars.compile(window.clientApp.templates.player);

        window.clientApp.$appContainer.html(
            this.artwork({type: type, id: ID})
        );

        this.getPlayerContent(type, ID);
        this.backToSearch();
    },
    renderPlayer: function(data){
        window.clientApp.$appContainer.append(
            this.player(data)
        )
    },
    getPlayerContent: function(type, ID){
        var that = this;

        switch(type){
            case 'album':
                window.clientApp.api.album(ID, function(res){
                    that.trackList = res.data;

                    that.active = {
                        type: 'album',
                        year: res.data[0].release_date,
                        numTracks: res.info.total,
                        // duration: res.data.duration,
                        owner: (res.data[0]) ? res.data[0].refs.artist_display_name : '',
                        title: (res.data[0]) ? res.data[0].refs.album.display : '',
                        id: (function() { 
                            if(res.data.refs && res.data.refs.artists && res.data.refs.artists[0]){
                                return res.data.refs.artists[0].id
                            }
                            else {
                                return '--'
                            }
                        }()),
                        image: 'artist'
                    }

                    that.getTrack(that.trackList[0].id, function(res){

                        var core = res;

                        window.clientApp.api.audio(that.trackList[0].id, function(res){

                            that.renderPlayer({
                                artist: core.data.artist_display_name,
                                title: core.data.title,
                                server_url: encodeURIComponent(res.data.location),
                                url: encodeURIComponent(res.data.resource)
                            });

                        });
                    });
                });

                break;

            case 'playlist':
                window.clientApp.api.playlistTracks(ID, function(res){

                    that.trackList = res.data;

                    window.clientApp.api.playlist(ID, function(res){

                        that.active = {
                            type: 'playlist',
                            year: res.data.created_at,
                            numTracks: res.data.total_tracks,
                            duration: res.data.duration,
                            owner: res.data.user_display_name,
                            title: res.data.name,
                            subscribers: res.data.total_subscribers,
                            id: res.data.id,
                            image: 'playlist'
                        }

                        that.getTrack(that.trackList[0].id, function(res){

                            var core = res;

                            window.clientApp.api.audio(that.trackList[0].id, function(res){

                                that.renderPlayer({
                                    artist: core.data.artist_display_name,
                                    title: core.data.title,
                                    server_url: encodeURIComponent(res.data.location),
                                    url: encodeURIComponent(res.data.resource)
                                });

                            });
                        });
                    });
                });                

                break;

            case 'track':
                that.getTrack(ID, function(res){

                    var core = res;
                    that.tracklist = [
                        {
                            display: core.data.title    
                        }
                    ];

                    that.active = {
                        type: 'track',
                        year: core.data.release_date,
                        duration: core.data.duration,
                        owner: core.data.artist_display_name,
                        title: core.data.title,
                        id: (function() { 
                            if(core.data.refs && core.data.refs.artists && core.data.refs.artists[0]){
                                return core.data.refs.artists[0].id
                            }
                            else {
                                return '--'
                            }
                        }()),
                        image: 'artist'
                    }

                    window.clientApp.api.audio(ID, function(res){

                        that.renderPlayer({
                            artist: core.data.artist_display_name,
                            title: core.data.title,
                            server_url: encodeURIComponent(res.data.location),
                            url: encodeURIComponent(res.data.resource)
                        });

                    });
                });

                break;

            default:
        }
    },
    getTrack: function(ID,cb){
        window.clientApp.api.track(ID, cb);
    },
    getAudio: function(){

    },
    next: function(){

    },
    previous: function(){

    },
    getTracklist: function(){
        return this.trackList;
    }
}