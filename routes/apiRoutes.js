const db = require("../models");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      dbWorkout.forEach((workout) => {
        var total = 0;
        workout.exercises.forEach((e) => {
          total += e.duration;
        });
        workout.totalDuration = total;
      });

      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log("ALL WORKOUTS");
      console.log(dbWorkout);

      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

// const db = require("../models");

// module.exports = function (app) {
//   app.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   app.get("/api/workouts/range", ({}, res) => {
//     db.Workout.find({})
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   app.post("/api/workouts/", (req, res) => {
//     db.Workout.create(req.body)
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   app.put("/api/workouts/:id", (req, res) => {
//     db.Workout.findByIdAndUpdate(
//       { _id: req.params.id },
//       { exercises: req.body }
//     )
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
// };
