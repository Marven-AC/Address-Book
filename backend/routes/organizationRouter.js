const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Organizations = require('../models/organization');

const organizationRouter = express.Router();

organizationRouter.use(bodyParser.json());


organizationRouter.route('/')
    

    .get((req, res, next) => {

        Organizations.find({})
            .then((organizations) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organizations);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
    // post will carry information in the body of the message in the form of json data
    .post((req, res, next) => {
        console.log("post");
        Organizations.create(req.body)
            .then((organization) => {
                console.log('organization created', organization);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    // doesn't make sense to update all the organizations
    .put((req, res, next) => {
        res.statusCode = 403; // 403 opperation not supported
        res.end('PUT operation not supported on /Organizations');
    })

    .delete((req, res, next) => {
        //res.end('Deleting all the Organizations!');
        Organizations.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


organizationRouter.route('/:organizationId')

    .get((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    // doesn't make sense to do a post on a specific organizationId
    .post((req, res, next) => {
        res.statusCode = 403; // 403 opperation not supported
        res.end('POST operation not supported on /Organizations/' + req.params.organizationId);
    })

    .put((req, res, next) => {
        console.log(req.body);
        Organizations.findByIdAndUpdate(req.params.organizationId, {
            $set: req.body
        }, { new: true }) // new : true will return the updated organization
            .then((organization) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        //res.end('Deleting organizatione: ' + req.params.organizationId);
        Organizations.findByIdAndRemove(req.params.organizationId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// handle employees
organizationRouter.route('/:organizationId/employees')
    .get((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organization.employees);
                }
                else {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null) {
                    organization.employees.push(req.body);
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .then((organization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(organization);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Organizations/'
            + req.params.organizationId + '/employees');
    })

    .delete((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null) {
                    for (var i = (organization.employees.length - 1); i >= 0; i--) {
                        organization.employees.id(organization.employees[i]._id).remove();
                    }
                    // after modifying the organization save it
                    organization.save()
                        .then((organization) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(organization);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


organizationRouter.route('/:organizationId/employees/:employeeId')
    .get((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null && organization.employees.id(req.params.employeeId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organization.employees.id(req.params.employeeId));
                }
                // organization doesn't exist
                else if (organization == null) {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                // employee doesn't exist
                else {
                    err = new Error('Employee ' + req.params.employeeId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Organizations/' + req.params.organizationId
            + '/employees/' + req.params.employeeId);
    })

    .put((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null && organization.employees.id(req.params.employeeId) != null) {
                    if (req.body.first_name) {
                        organization.employees.id(req.params.employeeId).first_name = req.body.first_name;
                    }
                    if (req.body.last_name) {
                        organization.employees.id(req.params.employeeId).last_name = req.body.last_name;
                    }
                    if (req.body.address) {
                        organization.employees.id(req.params.employeeId).address = req.body.address;
                    }
                    if (req.body.number) {
                        organization.employees.id(req.params.employeeId).number = req.body.number;
                    }
                    if (req.body.email) {
                        organization.employees.id(req.params.employeeId).email = req.body.email;
                    }
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .then((organization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(organization);
                                })
                        }, (err) => next(err));
                }
                // organization doesn't exist
                else if (organization == null) {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                // employee doesn't exist
                else {
                    err = new Error('Employee ' + req.params.employeeId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {

        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (organization != null && organization.employees.id(req.params.employeeId) != null) {
                    organization.employees.id(req.params.employeeId).remove();
                    // after modifying the organization save it
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .then((organization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(organization);
                                })
                        }, (err) => next(err));
                }
                else if (organization == null) {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Employee ' + req.params.employeeId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = organizationRouter; // export organizationRouter to use in index


