Handlebars.registerHelper("getBeatsImage", function(imageType, assettID, size){
    return window.clientApp.api.image(imageType, assettID, size);
});

Handlebars.registerHelper("trackNum", function(arrayIndex){
    return arrayIndex + 1;
});

Handlebars.registerHelper("capitalize", function(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
});
        
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
