const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Organizations = require('../models/organization');

const organizationRouter = express.Router();

organizationRouter.use(bodyParser.json());


organizationRouter.route('/')


    .get((req, res, next) => {

        Organizations.find({})
            .populate('employees.organization')
            .then((organizations) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organizations);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
    // post will carry information in the body of the message in the form of json data
    .post((req, res, next) => {
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
        //res.end('Will send you the details of the organization: ' + req.params.organizationId);
        // parameter retreive with req.params.organizationId the name match in the end and the parameter to retreive the information correctly
        Organizations.findById(req.params.organizationId)
            .populate('employees.organization')
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
        // wirte to add a line to the reply message
        // res.write('Updating the organization: ' + req.params.organizationId + '\n');
        // res.end('Will update the organization: ' + req.body.name +
        //     ' with details: ' + req.body.description);
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
            .populate('employees.organization')
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
                    req.body.organization = req.user._id;
                    organization.employees.push(req.body);
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .populate('employees.organization')
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

    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Organizations/'
            + req.params.organizationId + '/employees');
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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


organizationRouter.route('/:organizationId/employees/:commentId')
    .get((req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .populate('employees.organization')
            .then((organization) => {
                if (organization != null && organization.employees.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organization.employees.id(req.params.commentId));
                }
                // organization doesn't exist
                else if (organization == null) {
                    err = new Error('organization ' + req.params.organizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                // comment doesn't exist
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Organizations/' + req.params.organizationId
            + '/employees/' + req.params.commentId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (!(req.user._id.equals(organization.employees.id(req.params.commentId).organization))) {
                    console.log(req.user._id);
                    console.log(organization.employees.id(req.params.commentId).organization);
                    console.log(organization.employees);
                    err = new Error('Operation not organizationized!');
                    err.status = 404;
                    return next(err);
                }
                if (organization != null && organization.employees.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        organization.employees.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        organization.employees.id(req.params.commentId).comment = req.body.comment;
                    }
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .populate('employees.organization')
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
                // comment doesn't exist
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, (req, res, next) => {

        Organizations.findById(req.params.organizationId)
            .then((organization) => {
                if (!(req.user._id.equals(organization.employees.id(req.params.commentId).organization))) {
                    console.log(req.user._id);
                    console.log(organization.employees.id(req.params.commentId).organization);
                    console.log(organization.employees);
                    err = new Error('Operation not organizationized!');
                    err.status = 404;
                    return next(err);
                }
                if (organization != null && organization.employees.id(req.params.commentId) != null) {
                    organization.employees.id(req.params.commentId).remove();
                    // after modifying the organization save it
                    organization.save()
                        .then((organization) => {
                            Organizations.findById(organization._id)
                                .populate('employees.organization')
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
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = organizationRouter; // export organizationRouter to use in index


