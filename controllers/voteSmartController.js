const axios = require("axios");
const db = require("../models");
const FEDURL = "http://api.votesmart.org/Candidates.getByOfficeState";
const APIKEY = "?key=35ff1dd44bb6c16ee2db8a35998a8f21";
const DISTRICTURL = "http://api.votesmart.org/District.getByZip";
const CANDIDATEURL = "http://api.votesmart.org/Candidates.getByDistrict";

// Defining methods for the voteSmart controller
module.exports = {
    presidentialCandidates: (req, res) => {
        axios
            .get(FEDURL + APIKEY + "&officeId=1&o=JSON")
            .then(results => {
                res.json(results.data.candidateList);
            })
            .catch(err => {
                res.json(err);
            });
    },
    senateCandidates: (req, res) => {
        axios
            .get(FEDURL + APIKEY + "&officeId=6&stateId=TN&o=JSON")
            .then(results => {
                res.json(results.data.candidateList);
            })
            .catch(err => {
                res.json(err);
            });
    },
    districtByZip: (req, res) => {
        const zip = req.params.zip;
        console.log(zip);
        axios
            .get(DISTRICTURL + APIKEY + "&zip5=" + zip + "&o=JSON")
            .then(results => {
                res.json(results.data.districtList.district[0].districtId);
            })
            .catch(err => {
                res.json(err);
            });
    },
    houseCandidatesByDistrict: (req, res) => {
        const distId = req.params.distId;
        axios
            .get(CANDIDATEURL + APIKEY + "&districtId=" + distId + "&o=JSON")
            .then(results => {
                console.log(results);
                res.json(results.data.candidateList);
            })
            .catch(err => {
                res.json(err);
            });
    },
    savePlan: (req, res) => {
        console.log(req.body);
        db.Plan.create(req.body)
            .then(({ _id }) =>
                db.User.findOneAndUpdate({}, { $push: { plan: _id } }, { new: true })
            )
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },
    getPlan: (req, res) => {
        console.log(req.query);
        db.User.findOne({}).then(
            db.Plan.find({})
                .then(dbModel => res.json(dbModel))
        ).catch(err => res.status(422).json(err));
        
    },
    saveCandidates: (req, res) => {
        console.log(req.body);
        console.log(req.params.id);
        db.Candidate.create(req.body)
            .then(({ _id }) =>
                db.User.findByIdAndUpdate(req.params.id, { $push: { candidates: _id } }, { new: true })
            )
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },
    getSavedCandidates: (req, res) => {
        console.log(req.params.id)
        db.User.findById(req.params.id)
            .populate("candidates")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
        
    },
    deleteCandidate: (req, res) => {
        db.Candidate.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
