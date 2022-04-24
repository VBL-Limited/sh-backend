import Offre from '../models/offre-model'
import { Request, Response } from "express";

export const create = async (req:Request, res:Response) => {
    try {
        const {
            nom_organisation,
            poste,
            lieu_affectation,
            date_publication,
            date_limite,
            details_offre,
            email,
            mobile
        } = req.body;

        const newOffre = new Offre({ ...req.body} );
        const saveOffre = await newOffre.save();
        return res.status(201).json(saveOffre);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const getAll = async ({req, res, next}:any) => {
    try {
        // const allOffres = await Offre.find();
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;
        const results:any = {};
    
        try {
            results.results = await Offre.find()
                .sort(1)
                .limit(limit)
                .skip(skipIndex)
                .exec();
            res.paginatedResults = results;
            
            
        return res.status(200).json(res.paginatedResults);

        } catch (e) {
            res.status(500).json({ message: "Erreur survenue" });
        }
    } catch (error) {
        return res.status(404).json({ error });
    }
};

export const getOne = async (req:Request, res:Response) => {
    try {
        const offre = await Offre.findOne({_id: req.params.id});
        if(!offre) return res.status(404).json("Cet offre n'existe pas !");

        return res.status(200).json(offre);
    } catch (error) {
        return res.status(400).json({ error });
    }
};


export const getByTag = async (req:Request, res:Response) => {
    try {
        const offre = await Offre.findOne({tag: req.params.tag});
        if(!offre) return res.status(404).json("Cet offre n'existe pas, ou ce tag est invalide !");

        return res.status(200).json(offre);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const getByTitle = async (req:Request, res:Response) => {
    try {
        const offre = await Offre.findOne({title: req.params.title});
        if(!offre) return res.status(404).json("Cet offre n'existe pas, ou ce titre est invalide !");

        return res.status(200).json(offre);
    } catch (error) {
        return res.status(400).json({ error });
    }
};
export const update = async (req:Request, res:Response) => {
    try {
        const {
            nom_organisation,
            poste,
            lieu_affectation,
            date_publication,
            date_limite,
            details_offre,
            email,
            mobile
        } = req.body;

        const updateOffre = await Offre.findOneAndUpdate({ _id: req.params.id }, { ... req.body }, { new: true});
        if(!updateOffre) return res.status(400).json("Erreur lors de la mise à jour de l'offre!");

        return res.status(201).json(updateOffre);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const remove = async (req:Request, res:Response) => {
    try {        

        const removeOffre = await Offre.findOneAndRemove({ _id: req.params.id });
        if(!removeOffre) return res.status(404).json("Cet offre n'existe pas!");

        return res.status(200).json(removeOffre);
    } catch (error) {
        return res.status(400).json({ error });
    }
}
