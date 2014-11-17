String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.contains = function(fragment) {
    return this.search(fragment) != -1;
}

window.Banda = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Utils: {},
  Instances: {}
};

$(function() {
  Banda.Utils.initializePage();
});
