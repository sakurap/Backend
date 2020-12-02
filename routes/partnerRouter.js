const express = require("express");
const partnerRouter = express.Router();
const Partner = require('../models/partner');

partnerRouter.route("/")
  .get((req, res, next) => {
    Partner.find()
    .then(partners => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partners);
    })
    .catch(err => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
      console.log('Partner Created ', partner);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `Updating the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    Partner.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
    .catch(err => next(err));
  });

partnerRouter.route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .post((req, res) => {
    res.end(
      `POST operation not supported on /partner/ ${req.params.partnerId}`
    );
  })
  .put((req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, {
      $set: req.body
    }, { new: true })
    .then(partner => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = partnerRouter;
