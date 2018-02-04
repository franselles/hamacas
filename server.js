var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var HAMACAS_COLLECTION = "hamacas";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// CORS on ExpressJS
// Allow CORS with localhost in Chrome

app.all("/api/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return next();
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious'
// process.env.MONGODB_URI
// 'mongodb://localhost/eplayas'

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

 app.get('/', function(request, response) {
  response.send('Hamacas!!!');
 });


// HAMACAS API ROUTES BELOW

/*  "/api/hamacas"
 *    GET: finds all hamacas
 *    POST: creates a new hamacas
 */

app.get("/api/hamacas", function(req, res) {
  db.collection(HAMACAS_COLLECTION).find({}).sort({ "fecha": 1, "sector": 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get hamacas.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/hamacas", function(req, res) {
  var newHamaca = req.body;
  newHamaca.createfecha = new Date();

/*   if (!req.body.nombre) {
    handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
  } */

  db.collection(HAMACAS_COLLECTION).insertOne(newHamaca, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new hamacas.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/hamacas/:id"
 *    GET: find hamacas by id
 *    PUT: upfecha hamacas by id
 *    DELETE: deletes hamacas by id
 */

app.get("/api/hamacas/edita/:id", function(req, res) {
  db.collection(HAMACAS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get hamacas");
    } else {
      res.status(200).json(doc);
    }
  });
});


app.get("/api/hamacas/lista/ultimos", function(req, res) {
  db.collection(HAMACAS_COLLECTION).aggregate(
    [
      {
        $sort: {"fecha": 1}
      },
      {
        $group: {
          _id: "$sector",
          lastFecha: { $last: "$fecha" },
          lastHamacas: { $last: "$hamacas" }, 
          lastSombrillas: { $last: "$sombrillas" },
          lastObservacion: { $last: "$observacion"},          
          lastId: { $last: "$_id"}           
      }},
      {
        $sort: {"_id": 1}
      }    
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del dia.");
        } else {
          res.status(200).json(docs);
        }
    });
});

app.get("/api/hamacas/lista/ultimos/fecha/:fecha", function(req, res) {
  db.collection(HAMACAS_COLLECTION).aggregate(
    [
      {
        $match: {
          fecha: req.params.fecha
        }
      },
      {
        $sort: {"fecha": 1}
      },
      {
        $group: {
          _id: "$sector",
          lastFecha: { $last: "$fecha" },
          lastHamacas: { $last: "$hamacas" }, 
          lastSombrillas: { $last: "$sombrillas" },
          lastObservacion: { $last: "$observacion"},
          lastId: { $last: "$_id"}           
      }},
      {
        $sort: {"_id": 1}
      }    
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del dia.");
        } else {
          res.status(200).json(docs);
        }
    });
});

app.get("/api/hamacas/activos/conductores", function(req, res) {
  db.collection(HAMACAS_COLLECTION).find({"activo": true, "conductor": true}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get hamacas.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/hamacas/:id", function(req, res) {
  db.collection(ESTADISTICAS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get hamacas");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/hamacas/:id", function(req, res) {
  var upfechaDoc = req.body;
  delete upfechaDoc._id;

  db.collection(HAMACAS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, upfechaDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to upfecha hamacas");
    } else {
      upfechaDoc._id = req.params.id;
      res.status(200).json(upfechaDoc);
    }
  });
});

app.delete("/api/hamacas/:id", function(req, res) {
  db.collection(HAMACAS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete hamacas");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});




