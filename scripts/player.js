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
                    that.trackList = res.data.refs.tracks;

                    that.active = {
                        type: 'album',
                        year: res.data.release_date,
                        numTracks: res.data.total_tracks,
                        duration: res.data.duration,
                        owner: res.data.artist_display_name,
                        title: res.data.title,
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

                        that.renderPlayer({
                            artist: res.data.artist_display_name,
                            title: res.data.title
                        });

                    });
                });

                break;

            case 'playlist':
                window.clientApp.api.playlist(ID, function(res){
                    that.trackList = res.data.refs.tracks;

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

                        that.renderPlayer({
                            artist: res.data.artist_display_name,
                            title: res.data.title
                        });

                    });
                });

                break;

            case 'track':
                that.getTrack(ID, function(res){
                    that.tracklist = [
                        {
                            display: res.data.title    
                        }
                    ];

                    that.active = {
                        type: 'track',
                        year: res.data.release_date,
                        duration: res.data.duration,
                        owner: res.data.artist_display_name,
                        title: res.data.title,
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

                    that.renderPlayer({
                        artist: res.data.artist_display_name,
                        title: res.data.title
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
    play: function(){

    },
    pause: function(){

    },
    next: function(){

    },
    previous: function(){

    },
    stop: function(){

    },
    getTracklist: function(){
        return this.trackList;
    }
}