window.clientApp.init = function(){

    console.log(" -- Beats Music App Started --");

    window.clientApp.$appContainer = $('.app');

    // Render main search template on start
    window.clientApp.search.init();
}