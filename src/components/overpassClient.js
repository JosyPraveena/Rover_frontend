const OverpassFrontend = require("overpass-frontend");
// you may specify an OSM file as url, e.g. 'test/data.osm.bz2'
const overpassFrontend = new OverpassFrontend(
  "//overpass-api.de/api/interpreter"
);

const overpassQuery = query => {
  overpassFrontend.BBoxQuery(
    query,
    { minlat: 48.19, maxlat: 48.2, minlon: 16.33, maxlon: 16.34 },
    {
      properties: OverpassFrontend.ALL
    },
    function(err, result) {
      return "* " + result.tags.name + " (" + result.id + ")";
    },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
};

export default overpassQuery;