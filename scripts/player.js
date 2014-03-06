window.clientApp.player = {

    init: function(type, ID){
        this.tracklistTmpl = Handlebars.compile(window.clientApp.templates.tracklist);
        this.musicActive = Handlebars.compile(window.clientApp.templates.musicActive);
        this.container = window.clientApp.$appContainer;

        this.render(type, ID);
    },
    backToSearch: function(){
        var that = this;

        this.$menu = $('.app--menu--icon--container');

        this.$menu.click(function(){

            //TODO: Preserve player and not destroy
            // use hiding instead of remove, append
            that.cache = '';
            that.cache = $('.artwork').parent().html() + $('.player').parent().html();

            //TODO: Clean up event binding
            console.log(that.cache);

            window.clientApp.search.player = true;
            window.clientApp.search.init();

            //TODO: Clean up event binding
            window.clientApp.search.backToPlayer();

            that.container.append(
                that.musicActive({meta: that.active})
            );

            that.container.append(
                that.tracklistTmpl({ tracks: that.tracklist })
            );
        });        
    },
    backFromSearch: function(){
        this.container.html(
            this.cache
        );

        //TODO: Clean up event binding
        this.backToSearch();
    },
    render: function(type, ID){
        this.artwork = Handlebars.compile(window.clientApp.templates.artwork);
        this.player = Handlebars.compile(window.clientApp.templates.player);

        this.container.html(
            this.artwork({type: type, id: ID})
        );

        this.getPlayerContent(type, ID);
        this.backToSearch();
    },
    renderPlayer: function(data){
        if(this.container.find('iframe')){
            this.container.find('iframe').remove();
        }

        this.container.append(
            this.player(data)
        )
    },
    getPlayerContent: function(type, ID){
        var that = this;
        var api = window.clientApp.api;

        switch(type){
            case 'album':
                api.album(ID, function(res){
                    that.tracklist = res.data;
                    that.tracklist.position = 0;

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

                    api.track(that.tracklist[0].id, function(res){

                        var core = res;

                        api.audio(that.tracklist[0].id, function(res){

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
                api.playlistTracks(ID, function(res){
                    that.tracklist = res.data;
                    that.tracklist.position = 0;

                    api.playlist(ID, function(res){

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

                        that.getTrack(that.tracklist[0].id, function(res){

                            var core = res;

                            api.audio(that.tracklist[0].id, function(res){

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
                api.track(ID, function(res){

                    var core = res;
                    that.tracklist = [
                        {
                            display: core.data.title    
                        }
                    ];
                    that.tracklist.position = 0;

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

                    api.audio(ID, function(res){

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
                break;
        }
    },
    getAudio: function(trackID){
        var that = this;

        window.clientApp.api.track(trackID, function(res){
            var core = res;

            window.clientApp.api.audio(trackID, function(res){
                that.renderPlayer({
                    artist: core.data.artist_display_name,
                    title: core.data.title,
                    server_url: encodeURIComponent(res.data.location),
                    url: encodeURIComponent(res.data.resource)
                });
            });
        });
        
    },
    next: function(){
        if(this.tracklist && this.tracklist.length > 1 && this.tracklist.position < this.tracklist.length){
            //TODO: Fix going one past
            
            this.tracklist.position += 1;
            this.getAudio(this.tracklist[this.tracklist.position].id);
        }

        console.log("POSITION:", this.tracklist.position);
    },
    previous: function(){
        if(this.tracklist && this.tracklist.length > 1 && this.tracklist.position > 0){
            this.tracklist.position -= 1;
            this.getAudio(this.tracklist[this.tracklist.position].id);  
        }

        console.log("POSITION:", this.tracklist.position);        
    }
}