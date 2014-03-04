window.clientApp.search = {

    init: function(){
        var that = this;

        window.clientApp.$appContainer.html(
            Handlebars.compile(window.clientApp.templates.search)
        );

        this.$resultsDiv = $('.search-results--wrapper');
        this.$input = $('#search-music');

        this.$input.focus(function(){
            that.$input.addClass('colorize');
        });

        this.$input.keyup(function(e){

            
            that.federatedSearch(that.$input.val());
        });
    },
    federatedSearch: function(query){
        var that = this;

        window.clientApp.api.search(query, function(res){
            console.log(res.data);

            var results = Handlebars.compile(window.clientApp.templates.searchResult);
            that.$resultsDiv.html(results(res.data));

            that.searchResultsPlay();
        });
    },
    searchResultsPlay: function(){
        this.$resultsDiv.find('ul li').click(function(){
            
            var type = $(this).attr('data-type');
            var id = $(this).attr('data-id');

            window.clientApp.player.init(type, id);
        }); 
    },
    backToPlayer: function(){
        //TODO: Clean up event binding
        this.$playButton = $('.icon-play');

        if(this.player === true){
            this.$playButton.show();

            this.$playButton.click(function(){
                window.clientApp.player.backFromSearch();
            });
        }
    }

}