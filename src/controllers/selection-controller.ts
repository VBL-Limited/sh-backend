import Selection from '../models/selection-model'
import { Request, Response } from "express";
export const create = async (req:Request, res:Response) => {
    try {
        const {
            offreId,
            candidatId,
            date_limite,
            email,
            heure_fin,
            interview_audio,
            interview_video,
            test
        } = req.body;

        const newSelection = new Selection({ ...req.body} );
        const saveSelection = await newSelection.save();
        return res.status(201).json(saveSelection);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const  getAll = async (req:Request, res:Response) => {
    try {
        const allSelections = await Selection.find();
        return res.status(200).json(allSelections);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const getOne = async (req:Request, res:Response) => {
    try {
        const selection = await Selection.findOne({ _id: req.params.id });
        if(!selection) return res.status(404).json("Cette selection n'existe pas !");

        return res.status(200).json(selection);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const update = async (req:Request, res:Response) => {
    try {
        const {
            offreId,
            candidatId,
            date_limite,
            email,
            heure_fin,
            interview_audio,
            interview_video,
            test
        } = req.body;

        const updateSelection = await Selection.findOneAndUpdate({ _id: req.params.id }, { ... req.body }, { new: true});
        if(!updateSelection) return res.status(400).json("Erreur lors de la mise à jour de la selection!");

        return res.status(201).json(updateSelection);
    } catch (error) {
        return res.status(400).json({ error });
    }
};


export const remove = async (req:Request, res:Response) => {
    try {        

        const removeSelection = await Selection.findOneAndRemove({ _id: req.params.id });
        if(!removeSelection) return res.status(404).json("Cette selection n'existe pas!");

        return res.status(200).json(removeSelection);
    } catch (error) {
        return res.status(400).json({ error });
    }
}